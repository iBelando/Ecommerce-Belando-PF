import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CategoriesScreen from "../../../Screens/CategoriesScreen";
import ProductsScreen from "../../../Screens/ProductsScreen";
import DetailScreen from "../../../Screens/DetailScreen";
import { colors } from "../../../Styles/Colors";
import { useDispatch } from "react-redux";
import { login, logout } from "../../../Features/Auth";
import { Ionicons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();

function ShopNavigator() {
  const dispatch = useDispatch();
  return (
    <Stack.Navigator
      initialRouteName="Categories"
      screenOptions={{
        headerStyle: { backgroundColor: "#4299e1" },
        headerTintColor: "white",
        headerTitleStyle: {
          fontFamily: "NunitoBlack",
          fontSize: 26,
        },
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          title: "Categorías",
          headerLeft: () => {
            return (
              <TouchableOpacity onPress={() => dispatch(logout(login.state))}>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ color: "white", fontSize: 20 }}>Salir </Text>
                  <Ionicons name="exit-outline" size={24} color="white" />
                </View>
              </TouchableOpacity>
            );
          },
        }}
      />
      <Stack.Screen
        name="Products"
        component={ProductsScreen}
        options={({ route }) => ({
          title: route.params.categoryTitle,
        })}
      />
      <Stack.Screen
        name="Details"
        component={DetailScreen}
        options={({ route }) => ({
          title: route.params.productTitle,
        })}
      />
    </Stack.Navigator>
  );
}

export default ShopNavigator;

const styles = StyleSheet.create({
  icon: {
    padding: 10,
  },
});
