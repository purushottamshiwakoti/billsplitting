import { View, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { Appbar } from "react-native-paper";
import useAuthStore from "../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { Avatar, Button, Card, Text } from "react-native-paper";
import useCartStore from "../hooks/useAddtoCart";

const RestaurantDetail = ({ route }) => {
  const { cartItems } = useCartStore();
  console.log({ cartItems });
  const { id } = route.params;
  console.log(id);
  const { fullName, logout } = useAuthStore();
  const navigation = useNavigation();
  const [restaurants, setRestaurants] = useState([]);
  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    const fetchRestaurants = async () => {
      const response = await axios.get(
        `https://splitbill-eight.vercel.app/api/menu/${id}`
      );
      const { restaurant } = response.data;
      setRestaurants(restaurant);
    };
    fetchRestaurants();
  }, []);
  return (
    <ScrollView>
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
          }}
        />

        <Appbar.Content title={`Welcome ${fullName}`} />
        <Appbar.Action
          icon="cart"
          color="red"
          onPress={() => {
            navigation.navigate("Cart");
          }}
        />
        <Appbar.Action
          icon="logout"
          color="red"
          onPress={() => {
            logout();
            navigation.navigate("Login");
            alert("Successfully logged out");
          }}
        />
      </Appbar.Header>
      <View style={{ margin: 30 }}>
        {restaurants.map((item) => (
          <Card key={item.id} style={{ marginBottom: 10 }}>
            <Card.Title />

            <Card.Cover source={{ uri: item.image }} />
            <Card.Content>
              <View style={{ marginTop: 10 }}>
                <Text variant="titleLarge">{item.name}</Text>
                <Text variant="bodyMedium">Price: Rs.{item.price}</Text>
              </View>
            </Card.Content>
            <Card.Actions>
              <Button
                onPress={() => {
                  addToCart(item); // Add the 'item' to the cart when the button is pressed
                  alert("Item added to cart");
                }}
              >
                Add to Cart
              </Button>
            </Card.Actions>
          </Card>
        ))}
      </View>
    </ScrollView>
  );
};

export default RestaurantDetail;
