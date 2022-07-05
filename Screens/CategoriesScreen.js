import {
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TextInput,
  View,
} from "react-native";
import { Text } from "react-native-magnus";
import React, { useState, useEffect } from "react";
import Header from "../Components/Header";
import Searcher from "../Components/Searcher";
import { colors } from "../Styles/Colors";
import { CATEGORIES } from "../Data/Categories";
import ListIndex from "../Components/List/ListIndex";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import Categories, { selectCategory } from "../Features/Categories";
import { setProductsByCategory } from "../Features/Products";
import { login, logout } from "../Features/Auth";
import { Div } from "react-native-magnus";

const CategoriesScreen = ({ navigation }) => {
  const [input, setInput] = useState("");
  const [categoriesFilter, setCategoriesFilter] = useState([]);

  const { categories } = useSelector((state) => state.categories.value);
  const dispatch = useDispatch();

  const onHandleLogout = () => {
    dispatch(logout(login.state));
  };
  const handleErase = () => {
    setInput("");
  };

  useEffect(() => {
    if (categories.length !== 0) {
      if (input === "") {
        setCategoriesFilter(categories);
      } else {
        const categoriasFiltradas = categories.filter((category) =>
          category.name.toLowerCase().includes(input.toLowerCase())
        );
        setCategoriesFilter(categoriasFiltradas);
      }
    } else {
    }
  }, [input]);

  const handleSelectedCategory = (category) => {
    dispatch(setProductsByCategory(category.id));
    dispatch(selectCategory(category.id));
    navigation.push("Products", {
      categoryId: category.id,
      categoryTitle: category.name,
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
              placeholder="Ingrese categoría a buscar.."
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
          <View style={styles.listContainer}>
            {categoriesFilter.length !== 0 ? (
              <ListIndex
                data={categoriesFilter}
                onPress={handleSelectedCategory}
              />
            ) : (
              <Div
                alignItems="center"
                justifyContent="center"
                marginTop={"60%"}
              >
                <Text fontFamily="NunitoBlack" fontSize={20}>
                  El criterio de búsqueda
                </Text>
                <Text fontFamily="NunitoBlack" fontSize={20}>
                  no coincide con ninguna categoría.
                </Text>
              </Div>
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

export default CategoriesScreen;

const styles = {
  container: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    width: "100%",
    height: "100%",
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
    flex: 1,
  },
  logout: {
    marginBottom: 15,
    padding: 5,
    backgroundColor: colors.secundario,
    borderRadius: 5,
    borderWidth: 1,
  },
  logoutText: {
    fontSize: 20,
  },
};
