import {
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
  useWindowDimensions,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
import Searcher from "../Components/Searcher";
import { MaterialIcons } from "@expo/vector-icons";
import ListIndex from "../Components/List/ListIndex";
import { colors } from "../Styles/Colors";
import { useDispatch, useSelector } from "react-redux";
import { setProductSelected } from "../Features/Products";
import { Text, Div } from "react-native-magnus";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const ProductsScreen = ({
  category = { id: 1, name: "Ropa" },
  navigation,
  route,
}) => {
  const { width, height } = useWindowDimensions();
  const [input, setInput] = useState("");
  const [productsFiltered, setProductsFiltered] = useState([]);
  const { products } = useSelector((state) => state.products.value);
  const { categoryId } = route.params;
  const { productsByCategory } = useSelector((state) => state.products.value);
  const dispatch = useDispatch();

  const handleErase = () => {
    setInput("");
  };

  useEffect(() => {
    if (productsByCategory.length !== 0) {
      if (input === "") {
        setProductsFiltered(productsByCategory);
      } else {
        const productosFiltrados = productsByCategory.filter((product) =>
          product.description.toLowerCase().includes(input.toLowerCase())
        );
        setProductsFiltered(productosFiltrados);
      }
    } else {
    }
  }, [input, productsByCategory]);

  const handleDetailProduct = (product) => {
    dispatch(setProductSelected(product.id));
    navigation.navigate("Details", {
      productId: product.id,
      productTitle: product.description,
    });
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Searcher
            additionalStyles={{
              backgroundColor: "#4299e1",
            }}
          >
            <TextInput
              value={input}
              onChangeText={setInput}
              keyboardType="default"
              style={styles.input}
              placeholder="Ingrese producto a buscar.."
              placeholderTextColor="white"
            />

            <TouchableOpacity onPress={handleErase}>
              <MaterialIcons
                name="backspace"
                size={36}
                color="white"
                style={{ margin: 8 }}
              />
            </TouchableOpacity>
          </Searcher>
          <View
            style={{
              ...styles.listContainer,
              height: height < 534 ? "75%" : "77%",
            }}
          >
            {productsFiltered.length !== 0 ? (
              <ListIndex
                data={productsFiltered}
                itemType={"Producto"}
                onPress={handleDetailProduct}
              />
            ) : (
              <Div
                alignItems="center"
                justifyContent="center"
                marginTop={"60%"}
              >
                <Text fontFamily="NunitoBlack" fontSize={20}>
                  El criterio de búsqueda no coincide
                </Text>
                <Text fontFamily="NunitoBlack" fontSize={20}>
                  con ningún producto disponible.
                </Text>
              </Div>
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

export default ProductsScreen;

const styles = {
  container: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    width: "100%",
  },
  input: {
    flex: 1,
    width: "50%",
    padding: 10,
    marginVertical: 10,
    backgroundColor: "transparent",
    borderRadius: 10,
    height: 50,
    borderWidth: 1,
    borderColor: "white",
    color: "white",
  },
  listContainer: {
    marginTop: 8,
  },
  buttonBack: {
    backgroundColor: colors.terciario,
    padding: 3,
    borderRadius: 5,
  },
};
