import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OrderScreen from "../../../Screens/OrderScreen";
import { useDispatch } from "react-redux";
import { login, logout } from "../../../Features/Auth";
import { Ionicons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();

const OrdersStack = () => {
  const dispatch = useDispatch();
  return (
    <Stack.Navigator
      initialRouteName=""
      screenOptions={{
        headerStyle: {
          backgroundColor: "#4299e1",
        },
        headerTintColor: "white",
        headerTitleStyle: {
          fontFamily: "NunitoBlack",
          fontSize: 26,
        },
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        name="Cart"
        component={OrderScreen}
        options={{
          title: "Ordenes",
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
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

export default OrdersStack;

const styles = StyleSheet.create({});
