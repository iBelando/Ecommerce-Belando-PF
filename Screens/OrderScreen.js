import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useEffect } from "react";
import OrderItem from "../Components/OrderItem";
import ORDERS from "../Data/orders";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../Features/orders";

const renderItem = ({ item }) => <OrderItem item={item} />;

const OrderScreen = () => {
  const { orders } = useSelector((state) => state.orders.value);
  const { user } = useSelector((state) => state.auth.value);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrders(user.id));
  }, [orders]);

  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 80,
  },
});
