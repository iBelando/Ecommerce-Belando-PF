import {
  useWindowDimensions,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import CategoryItem from "./CategoryItem";
import ProductItem from "./ProductItem";

const ListIndex = ({ itemType = "category", data, onPress }) => {
  const { width, height } = useWindowDimensions();

  const fnRender = ({ item }) => {
    return (
      <>
        {itemType === "category" ? (
          <CategoryItem category={item} onPress={onPress} />
        ) : (
          <ProductItem product={item} onPress={onPress} />
        )}
      </>
    );
  };
  return (
    <FlatList
      numColumns={1}
      data={data}
      renderItem={fnRender}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ paddingBottom: 50 }}
    />
  );
};

export default ListIndex;

const styles = StyleSheet.create({});
