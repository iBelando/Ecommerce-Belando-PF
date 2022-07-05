import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { colors } from "../Styles/Colors";

const Input = ({ label, password = false, onChange, value, error = null }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{label}</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChange}
        secureTextEntry={password}
        value={value}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    padding: 6,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  input: {
    color: colors.secundario,
    backgroundColor: colors.terciario,
    borderBottomWidth: 2,
    borderBottomColor: colors.secundario,
    padding: 6,
    width: "100%",
    fontFamily: "FjallaOneRegular",
    fontSize: 18,
  },
  text: {
    fontFamily: "FjallaOneRegular",
    fontSize: 18,
    marginBottom: 6,
    color: "white",
  },
  error: {
    fontFamily: "NunitoRegular",
    fontSize: 14,
    marginBottom: 4,
    color: colors.redError,
  },
});
