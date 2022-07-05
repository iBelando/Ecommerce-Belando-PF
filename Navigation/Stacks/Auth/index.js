import { StyleSheet } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthScreen from "../../../Screens/AuthScreen";

import { colors } from "../../../Styles/Colors";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName=""
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.secundario,
        },
        headerTintColor: "white",
        headerTitleStyle: {
          fontFamily: "FjallaOneRegular",
          fontSize: 28,
        },
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        name="auth"
        component={AuthScreen}
        options={{
          title: "Auth",
          headerTransparent: true,
          headerShown: false,
        }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

export default AuthStack;

const styles = StyleSheet.create({});
