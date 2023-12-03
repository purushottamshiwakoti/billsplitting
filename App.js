// In App.js in a new project

import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/screens/Home";
import Login from "./src/screens/Login";
import Register from "./src/screens/Register";
import useAuthStore from "./src/hooks/useAuth";
import RestaurantDetail from "./src/screens/RestaurantDetail";
import Cart from "./src/screens/Cart";

const Stack = createNativeStackNavigator();

function App() {
  const { id } = useAuthStore();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!id ? (
          <Stack.Group>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </Stack.Group>
        ) : (
          <Stack.Group>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Cart" component={Cart} />
            <Stack.Screen
              name="RestaurantDetail"
              component={RestaurantDetail}
            />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
