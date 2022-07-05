import { FlatList, StyleSheet, View } from "react-native";
import React from "react";
import PlaceItem from "../Components/PlaceItems";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getLocations, removeLocationDb } from "../Features/Locations";
import { Div, Text } from "react-native-magnus";

const renderItem = ({ item }) => {
  return (
    <PlaceItem
      onSelect={() => {}}
      title={item.title}
      image={item.picture}
      address={item.address}
      id={item.id}
    />
  );
};

const LocationsScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLocations());
  }, []);

  const { locations } = useSelector((state) => state.locations.value);

  return (
    <>
      {locations.length > 0 ? (
        <View style={{ flex: 1 }}>
          <FlatList
            data={locations}
            renderItem={renderItem}
            keyExtractor={(location) => location.id}
          />
        </View>
      ) : (
        <Div alignItems="center" justifyContent="center" marginTop={"80%"}>
          <Text fontFamily="NunitoBlack" fontSize={20}>
            Actualmente no cuentas
          </Text>
          <Text fontFamily="NunitoBlack" fontSize={20}>
            con ninguna dirección.
          </Text>
        </Div>
      )}
    </>
  );
};

export default LocationsScreen;

const styles = StyleSheet.create({});
