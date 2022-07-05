import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LocationsScreen from "../../../Screens/LocationsScreen";
import { Ionicons } from "@expo/vector-icons";
import SaveLocationScreen from "../../../Screens/SaveLocationScreen";
import GetLocationScreen from "../../../Screens/GetLocationScreen";
import SetLocationScreen from "../../../Screens/SetLocationScreen";
import { useDispatch } from "react-redux";
import { login, logout } from "../../../Features/Auth";

const Stack = createNativeStackNavigator();

const LocationStack = () => {
  const dispatch = useDispatch();
  return (
    <Stack.Navigator
      initialRouteName=""
      screenOptions={{
        headerStyle: {
          backgroundColor: "#4299e1",
        },
        headerTintColor: "white",
        headerTitleStyle: {
          fontFamily: "NunitoBlack",
          fontSize: 26,
        },
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        name="Locations"
        component={LocationsScreen}
        options={({ navigation }) => ({
          title: "Direcciones",
          headerLeft: () => {
            return (
              <TouchableOpacity onPress={() => dispatch(logout(login.state))}>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ color: "white", fontSize: 20 }}>Salir </Text>
                  <Ionicons name="exit-outline" size={24} color="white" />
                </View>
              </TouchableOpacity>
            );
          },
          headerRight: () => {
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate("Save-location")}
              >
                <Ionicons name="add-circle" size={24} color="white" />
              </TouchableOpacity>
            );
          },
        })}
      ></Stack.Screen>

      <Stack.Screen
        name="Save-location"
        component={SaveLocationScreen}
        options={{
          title: "Guardar dirección",
        }}
      />

      <Stack.Screen
        name="Get-location"
        component={GetLocationScreen}
        options={{
          title: "Obtener ubicación",
        }}
      />

      <Stack.Screen
        name="Set-location"
        component={SetLocationScreen}
        options={{
          title: "Definir ubicación",
        }}
      />
    </Stack.Navigator>
  );
};

export default LocationStack;

const styles = StyleSheet.create({});
