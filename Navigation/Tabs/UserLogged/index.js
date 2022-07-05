import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../../../Styles/Colors";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import ShopNavigator from "../../Stacks/Shop";
import CartStack from "../../Stacks/Cart";
import { Entypo } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import OrdersStack from "../../Stacks/Orders";
import LocationStack from "../../Stacks/Locations";

const BottomTabs = createBottomTabNavigator();

const TabNavigatorLogged = () => {
  return (
    <BottomTabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: "#4299e1",
        tabBarInactiveTintColor: "black",
      }}
    >
      <BottomTabs.Screen
        name="ShopTab"
        component={ShopNavigator}
        options={{
          tabBarIcon: ({ color }) => {
            return (
              <View style={styles.item}>
                <Fontisto name="shopping-store" color={color} size={20} />
                <Text style={{ color: color }}>Shop</Text>
              </View>
            );
          },
        }}
      />
      <BottomTabs.Screen
        name="CartTab"
        component={CartStack}
        options={{
          tabBarIcon: ({ color }) => {
            return (
              <View style={styles.item}>
                <Entypo name="shopping-cart" size={20} color={color} />
                <Text style={{ color: color }}>Cart</Text>
              </View>
            );
          },
        }}
      />
      <BottomTabs.Screen
        name="OrdersTab"
        component={OrdersStack}
        options={{
          tabBarIcon: ({ color }) => {
            return (
              <View style={styles.item}>
                <MaterialCommunityIcons
                  name="order-bool-descending-variant"
                  size={24}
                  color={color}
                />
                <Text style={{ color: color }}>Ordenes</Text>
              </View>
            );
          },
        }}
      />
      <BottomTabs.Screen
        name="LocationTab"
        component={LocationStack}
        options={{
          tabBarIcon: ({ color }) => {
            return (
              <View style={styles.item}>
                <MaterialCommunityIcons
                  name="map-marker-radius"
                  size={24}
                  color={color}
                />
                <Text style={{ color: color }}>Direcciones</Text>
              </View>
            );
          },
        }}
      />
    </BottomTabs.Navigator>
  );
};

export default TabNavigatorLogged;

const styles = StyleSheet.create({
  tabBar: {
    shadowColor: colors.shadowTab,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 0.25,
    elevation: 5,
    position: "absolute",
    bottom: 5,
    marginHorizontal: 5,
    borderRadius: 10,
    height: 55,
  },
  item: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
