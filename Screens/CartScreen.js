import { FlatList, StyleSheet, View } from "react-native";
import React, { useState, useEffect } from "react";
import CartItem from "../Components/CartItem";
import { colors } from "../Styles/Colors";
import { useDispatch, useSelector } from "react-redux";
import { confirmPurchase, removeItem, clear } from "../Features/Cart";
import { Button, Snackbar, Text } from "react-native-magnus";

const CartScreen = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart.value);
  const { user } = useSelector((state) => state.auth.value);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const snackbarRef = React.createRef();

  const handleDeleteItem = (id) => {
    dispatch(removeItem({ id }));
    if (!snackbarRef.current) return;

    snackbarRef.current.show("Se removió el producto correctamente!", {
      duration: 2000,
    });
  };

  const renderItem = (data) => {
    return <CartItem item={data.item} onDelete={handleDeleteItem} />;
  };

  const handleConfirm = () => {
    setIsLoading(true);

    dispatch(
      confirmPurchase({ items: cart, total: totalPrice, userId: user.id })
    );

    dispatch(clear());
    setTotalPrice(0);

    if (!snackbarRef.current) return;

    snackbarRef.current.show("La compra ha sido realizada exitosamente!", {
      duration: 2000,
    });

    setIsLoading(false);
  };

  const calculateTotalPrice = (cart) => {
    cart.forEach((item) => {
      setTotalPrice(item.price * item.quantity);
    });
  };

  useEffect(() => {
    if (cart.length === 0) {
      setTotalPrice(0);
    }

    calculateTotalPrice(cart);
  }, [cart]);

  return (
    <View style={styles.container}>
      <View style={styles.list}>
        <FlatList
          data={cart}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      </View>
      <View
        style={{
          paddingHorizontal: 20,
          paddingBottom: 20,
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
          paddingTop: 20,
        }}
      >
        <Text style={styles.textPrice}>Total: $ {totalPrice.toFixed(2)}</Text>
      </View>
      <View style={styles.footer}>
        <Button
          bg="blue500"
          block
          fontWeight="bold"
          fontSize="xl"
          mt="xl"
          mb="xl"
          py="lg"
          rounded="circle"
          fontFamily="NunitoBlack"
          onPress={handleConfirm}
          loading={isLoading}
          disabled={cart.length === 0}
        >
          Finalizar Compra
        </Button>
        <View
          style={{
            bottom: "-50%",
            right: "0%",
            left: "42%",
            marginLeft: -150,
            position: "absolute",
          }}
        >
          <Snackbar ref={snackbarRef} bg="green700" color="white"></Snackbar>
        </View>
      </View>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "white",
    paddingBottom: 120,
  },
  list: {
    flex: 1,
  },
  footer: {
    padding: 12,
    borderTopColor: colors.primario,
    borderTopWidth: 1,
  },
  confirm: {
    backgroundColor: colors.secundario,
    borderRadius: 10,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  total: {
    flexDirection: "row",
  },
  text: {
    fontSize: 18,
    fontFamily: "NunitoBlack",
    padding: 1,
  },
  textPrice: {
    fontSize: 25,
    fontFamily: "NunitoBlackItalic",
  },
});
