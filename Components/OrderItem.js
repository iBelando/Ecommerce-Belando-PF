import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../Styles/Colors";

const formatDay = (time) => {
  const date = new Date(time);
  return date.toLocaleDateString();
};

const OrderItem = ({ item }) => {
  return (
    <View style={styles.order}>
      <View>
        <Text style={styles.date}>
          Fecha de la Orden: {formatDay(item.date)}
        </Text>
        <Text style={styles.total}>Total: ${item.total.toFixed(2)}</Text>
      </View>
    </View>
  );
};

export default OrderItem;

const styles = StyleSheet.create({
  order: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    margin: 10,
    borderColor: colors.secundario,
    borderWidth: 1,
    borderRadius: 6,
  },
  date: {
    fontSize: 18,
    fontFamily: "NunitoBlack",
  },
  total: {
    fontSize: 18,
    fontFamily: "NunitoBlackItalic",
    paddingTop: 10,
  },
});
