import {
  useWindowDimensions,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../Features/Cart";
import { colors } from "../Styles/Colors";
import { Button, Snackbar } from "react-native-magnus";

const DetailScreen = ({ route, navigation }) => {
  const { productSelected } = useSelector((state) => state.products.value);
  const dispatch = useDispatch();
  const handleAdd = (id) => {
    setIsLoading(true);
    dispatch(addItem({ id: id }));
    setIsLoading(false);
    if (!snackbarRef.current) return;

    snackbarRef.current.show("Producto agregado al carrito!", {
      duration: 2000,
    });
  };

  const { width, height } = useWindowDimensions();
  const [orientation, setOrientation] = useState("vertical");
  const [isLoading, setIsLoading] = useState(false);
  const snackbarRef = React.createRef();

  useEffect(() => {
    setOrientation(height > width ? "vertical" : "horizontal");
  }, [height, width]);

  return (
    productSelected && (
      <>
        <View
          style={
            orientation === "vertical"
              ? styles.containerVertical
              : styles.containerHorizontal
          }
        >
          <Image
            source={{ uri: productSelected?.image }}
            style={
              orientation === "vertical"
                ? styles.imageVertical
                : styles.imageHorizontal
            }
          />
          <View
            style={{
              paddingHorizontal: 20,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingTop: 20,
            }}
          >
            <Text style={styles.textPrice}>$ {productSelected?.price}</Text>
            <Button
              bg="blue500"
              w={250}
              fontWeight="bold"
              fontSize="xl"
              py="lg"
              rounded="circle"
              onPress={() => handleAdd(productSelected.id)}
              fontFamily="NunitoBlack"
              loading={isLoading}
            >
              Add to Cart
            </Button>
          </View>
        </View>
        <View style={{ paddingTop: 220 }}>
          <Snackbar ref={snackbarRef} bg="green700" color="white"></Snackbar>
        </View>
      </>
    )
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  containerVertical: {
    flexDirection: "column",
  },
  containerHorizontal: {
    flex: 1,
    flexDirection: "row",
  },
  imageVertical: {
    width: 0.94 * Dimensions.get("window").width,
    height: 0.94 * Dimensions.get("window").width,
    resizeMode: "cover",
    margin: 0.03 * Dimensions.get("window").width,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "black",
  },
  imageHorizontal: {
    width: 0.95 * Dimensions.get("window").width,
    height: 0.75 * Dimensions.get("window").width,
    resizeMode: "cover",
    marginTop: 0.01 * Dimensions.get("window").height,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "black",
    marginHorizontal: 0.05 * Dimensions.get("window").width,
  },
  textPrice: {
    fontSize: 30,
    fontFamily: "NunitoBlackItalic",
  },
  boton: {
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: colors.terciario,
    padding: 10,
    margin: 8,
    borderColor: colors.secundario,
    borderWidth: 2,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  textBoton: {
    fontSize: 15,
    fontFamily: "NunitoRegular",
  },
});
