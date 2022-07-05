import { Image, StyleSheet, TextInput, View, ScrollView } from "react-native";
import React from "react";
import * as ImagePicker from "expo-image-picker";
import { colors } from "../Styles/Colors";
import { useDispatch } from "react-redux";
import { addLocation, addLocationDb } from "../Features/Locations";
import { Button, Div, Text } from "react-native-magnus";

const SaveLocationScreen = ({ navigation, route }) => {
  const [title, setTitle] = React.useState("");
  const [picture, setPicture] = React.useState("");

  const params = route.params;

  const dispatch = useDispatch();

  const handlePickLibrary = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setPicture(result.uri);
    }
  };

  const getPermission = async () => {
    const { status } = await ImagePicker.getCameraPermissionsAsync();

    if (status !== "granted") {
      return false;
    }
    return true;
  };

  const handleTakePicture = async () => {
    const isVerified = getPermission();
    if (!isVerified) {
      return;
    }

    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    setPicture(image.uri);
  };

  const handleConfirm = async () => {
    let id = Date.now();
    dispatch(addLocation({ title, picture, id, address: params?.address }));
    dispatch(addLocationDb({ title, picture, id, address: params?.address }));
    setTitle("");
    setPicture("");
    navigation.navigate("Locations");
  };

  const handleLocation = () => {
    navigation.navigate("Get-location");
  };

  const handleSetLocation = () => {
    navigation.navigate("Set-location");
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.buttonText}>Nueva dirección</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Ingrese título"
        />
        {picture ? (
          <Image source={{ uri: picture }} style={styles.image} />
        ) : null}
        <Div
          alignItems="center"
          justifyContent="center"
          borderBottomColor="#4299e1"
          borderBottomWidth={2}
          borderTopWidth={2}
          borderTopColor="#4299e1"
          mt="xl"
        >
          <Button
            bg="blue500"
            block
            fontWeight="bold"
            fontSize="xl"
            mt="xl"
            mb="lg"
            py="lg"
            rounded="circle"
            onPress={handleTakePicture}
            fontFamily="NunitoBlack"
          >
            Tomar una foto
          </Button>
          <Text fontFamily="NunitoBlack" fontSize={20}>
            o
          </Text>
          <Button
            bg="blue500"
            block
            fontWeight="bold"
            fontSize="xl"
            mt="lg"
            mb="xl"
            py="lg"
            rounded="circle"
            onPress={handlePickLibrary}
            fontFamily="NunitoBlack"
          >
            Seleccionar de la galería
          </Button>
        </Div>
        <Div
          alignItems="center"
          justifyContent="center"
          borderBottomColor="#4299e1"
          borderBottomWidth={2}
        >
          <Button
            bg="blue500"
            block
            fontWeight="bold"
            fontSize="xl"
            mt="xl"
            mb="lg"
            py="lg"
            rounded="circle"
            onPress={handleLocation}
            fontFamily="NunitoBlack"
          >
            Obtener mi ubicación
          </Button>
          <Text fontFamily="NunitoBlack" fontSize={20}>
            o
          </Text>
          <Button
            bg="blue500"
            block
            fontWeight="bold"
            fontSize="xl"
            mt="lg"
            mb="xl"
            py="lg"
            rounded="circle"
            onPress={handleSetLocation}
            fontFamily="NunitoBlack"
          >
            Definir la ubicación
          </Button>
        </Div>
        <Button
          bg="blue500"
          block
          fontWeight="bold"
          fontSize="xl"
          mx="xl"
          mt="2xl"
          mb="2xl"
          py="lg"
          rounded="circle"
          onPress={handleConfirm}
          fontFamily="NunitoBlack"
          disabled={!picture || !title}
        >
          Confirmar
        </Button>
      </View>
    </ScrollView>
  );
};

export default SaveLocationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    padding: 10,
    paddingBottom: 50,
  },
  image: {
    width: "90%",
    height: 200,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: colors.primario,
  },
  input: {
    borderBottomWidth: 2,
    fontSize: 24,
    height: 40,
    margin: 8,
    padding: 8,
  },
  button: {
    backgroundColor: colors.secundario,
    borderColor: colors.primario,
    borderRadius: 5,
    borderWidth: 2,
    margin: 5,
    padding: 5,
  },
  buttonText: {
    fontFamily: "NunitoBlack",
    fontSize: 25,
  },
});
