import {
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React from "react";
import { useDispatch } from "react-redux";
import { colors } from "../Styles/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { removeLocation, removeLocationDb } from "../Features/Locations";

const PlaceItem = ({ onSelect, title, image, address, id }) => {
  const dispatch = useDispatch();

  const onRemove = (id) => {
    dispatch(removeLocationDb({ id }));
    dispatch(removeLocation({ id }));
  };

  return (
    <TouchableOpacity onPress={onSelect} style={styles.placeItem}>
      <Image style={styles.image} source={{ uri: image }} />
      <View style={styles.info}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.address}>{address}</Text>
      </View>
      <TouchableOpacity onPress={() => onRemove(id)}>
        <MaterialCommunityIcons
          name="select-remove"
          size={55}
          color="#4299e1"
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default PlaceItem;

const styles = StyleSheet.create({
  placeItem: {
    borderBottomColor: "#4299e1",
    borderBottomWidth: 1,
    paddingVertical: 16,
    paddingHorizontal: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: colors.secundario,
  },
  info: {
    marginLeft: 25,
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    fontFamily: "NunitoRegular",
  },
  title: {
    fontSize: 24,
    marginBottom: 6,
    fontFamily: "NunitoBlack",
  },
  address: {
    color: "#777",
    fontSize: 16,
  },
});
