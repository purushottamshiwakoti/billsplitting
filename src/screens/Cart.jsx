import { ScrollView, View } from "react-native";
import React, { useState } from "react";
import { Appbar, TextInput } from "react-native-paper";
import useAuthStore from "../hooks/useAuth";
import useCartStore from "../hooks/useAddtoCart";
import { useNavigation } from "@react-navigation/native";
import { Avatar, Button, Card, Text } from "react-native-paper";

const Cart = () => {
  const { fullName, logout } = useAuthStore();
  const { cartItems, clearCart } = useCartStore();
  const navigation = useNavigation();

  const [value, setValue] = useState(0);
  const [text, setText] = React.useState("");
  const price = cartItems.map((item) => parseInt(item.price));
  const initialValue = 0;
  const sumWithInitial = price.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    initialValue
  );

  const handleClearCart = () => {
    alert("Successfully placed order");
    clearCart();
    navigation.navigate("Home");
  };

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
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "red", fontWeight: "500", marginBottom: 10 }}>
            Total Items In Cart {cartItems.length}
          </Text>
        </View>
        {cartItems.length > 0 && (
          <View>
            {cartItems &&
              cartItems.map((item) => (
                <Card key={item.id} style={{ marginBottom: 10 }}>
                  <Card.Title />

                  <Card.Cover source={{ uri: item.image }} />
                  <Card.Content>
                    <View style={{ marginTop: 10 }}>
                      <Text variant="titleLarge">{item.name}</Text>
                      <Text variant="bodyMedium">Price: Rs.{item.price}</Text>
                    </View>
                  </Card.Content>
                </Card>
              ))}
            <View>
              <Text style={{ fontSize: 20, color: "red" }}>
                Select Bill Split Type
              </Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginTop: 10,
                  marginBottom: 10,
                }}
              >
                <Button
                  mode={value == "single" ? "contained" : "outlined"}
                  onPress={() => setValue("single")}
                >
                  Single
                </Button>
                <Button
                  mode={value == "group" ? "contained" : "outlined"}
                  style={{ marginLeft: 10 }}
                  onPress={() => setValue("group")}
                >
                  Group
                </Button>
              </View>
            </View>
            {value == "group" && (
              <View>
                <TextInput
                  label="Total people in group"
                  mode="outlined"
                  style={{ marginBottom: 10 }}
                  value={text}
                  onChangeText={(text) => setText(text)}
                />
              </View>
            )}
            <View>
              {value == "single" ? (
                <Text style={{ margin: 10, color: "red" }}>
                  Total Bill is Rs.{sumWithInitial}
                </Text>
              ) : (
                value == "group" &&
                text && (
                  <Text style={{ margin: 10, color: "red" }}>
                    Total Bill is Rs.{sumWithInitial} and bill spliting will be
                    Rs.
                    {sumWithInitial / text} per person
                  </Text>
                )
              )}
            </View>
            <Button
              mode="contained"
              disabled={value.length == 0}
              onPress={handleClearCart}
            >
              Place Order
            </Button>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default Cart;
