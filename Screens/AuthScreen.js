import { TouchableOpacity, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signUp, login } from "../Features/Auth";
import loginValidationSchema from "../Utils/ValidationYup";
import { Formik } from "formik";
import {
  Text,
  Button,
  Div,
  Input,
  Snackbar,
  SnackbarRef,
} from "react-native-magnus";

const LoginScreen = () => {
  const [registroVista, setRegistroVista] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [snackbarBg, setSnackbarBg] = useState("red700");
  const dispatch = useDispatch();
  const snackbarRef = React.createRef();

  const handleSubmit = async (values) => {
    if (registroVista) {
      if (values.password === values.confirmPassword) {
        dispatch(signUp({ email: values.email, password: values.password }));
      } else {
        setConfirmPasswordError("Los passwords deben coincidir");
      }
    } else {
      const { payload } = await dispatch(
        login({ email: values.email, password: values.password })
      );

      if (payload?.error?.message === "EMAIL_NOT_FOUND") {
        if (!snackbarRef.current) return;

        setSnackbarBg("red700");

        snackbarRef.current.show("Email incorrecto!", {
          duration: 2000,
        });
        return;
      }

      if (payload?.error?.message === "INVALID_PASSWORD") {
        if (!snackbarRef.current) return;

        setSnackbarBg("red700");

        snackbarRef.current.show("Contraseña incorrecta!", {
          duration: 2000,
        });
        return;
      }

      if (payload?.error?.message === "TOO_MANY_ATTEMPTS_TRY_LATER") {
        if (!snackbarRef.current) return;

        setSnackbarBg("yellow700");

        snackbarRef.current.show(
          "Demasiados intentos! Intenta nuevamente más tarde.",
          {
            duration: 2000,
          }
        );
        return;
      }

      if (!snackbarRef.current) return;

      snackbarRef.current.show("Oops, an error occurred!", {
        duration: 2000,
      });
    }
  };

  return (
    <Div flex={1} justifyContent="center" alignItems="center">
      <Div style={styles.content}>
        <Text
          fontFamily="NunitoBlack"
          fontSize="6xl"
          textAlign="center"
          mb="xl"
        >
          {registroVista ? "Registro" : "Login"}
        </Text>
        <Formik
          onSubmit={handleSubmit}
          initialValues={{ email: "", password: "", confirmPassword: "" }}
          validationSchema={loginValidationSchema}
          validateOnChange={false}
          validateOnBlur={false}
        >
          {({
            handleChange,
            errors,
            handleSubmit,
            values,
            handleBlur,
            isSubmitting,
            touched,
          }) => (
            <>
              <Input
                placeholder="Email"
                onChangeText={handleChange("email")}
                value={values.email}
                onBlur={handleBlur("email")}
                mt="md"
                mb="md"
                focusBorderColor="blue500"
                p={10}
                autoCapitalize="none"
                fontFamily="NunitoRegular"
              />
              {errors ? (
                <Text color="red500" fontSize="md">
                  {touched.email && errors.email}
                </Text>
              ) : null}
              <Input
                placeholder="Password"
                onChangeText={handleChange("password")}
                value={values.password}
                onBlur={handleBlur("password")}
                mt="md"
                mb="md"
                secureTextEntry
                focusBorderColor="blue500"
                p={10}
                autoCapitalize="none"
                fontFamily="NunitoRegular"
              />
              {errors ? (
                <Text color="red500" fontSize="md">
                  {touched.password && errors.password}
                </Text>
              ) : null}
              {registroVista && (
                <Input
                  placeholder="Confirm password"
                  onChange={handleChange("confirmPassword")}
                  value={values.confirmPassword}
                  onBlur={handleBlur("confirmPassword")}
                  error={confirmPasswordError}
                  mt="md"
                  mb="md"
                  secureTextEntry
                  focusBorderColor="blue500"
                  p={10}
                  autoCapitalize="none"
                  fontFamily="NunitoRegular"
                />
              )}
              {registroVista ? (
                <Button
                  bg="blue500"
                  block
                  fontWeight="bold"
                  fontSize="xl"
                  mx="xl"
                  mt="xl"
                  mb="xl"
                  py="lg"
                  rounded="circle"
                  onPress={handleSubmit}
                  loading={isSubmitting}
                  fontFamily="NunitoBlack"
                >
                  Sign Up
                </Button>
              ) : (
                <Button
                  bg="blue500"
                  block
                  fontWeight="bold"
                  fontSize="xl"
                  mx="xl"
                  mt="xl"
                  mb="xl"
                  py="lg"
                  rounded="circle"
                  onPress={handleSubmit}
                  loading={isSubmitting}
                  fontFamily="NunitoBlack"
                >
                  Log In
                </Button>
              )}
              <View style={styles.textContainer}>
                {registroVista ? (
                  <Div justifyContent="center" alignItems="center">
                    <TouchableOpacity onPress={() => setRegistroVista(false)}>
                      <Text fontFamily="NunitoRegular">
                        ¿Ya tienes cuenta?{" "}
                        <Text style={styles.link}>Login</Text>
                      </Text>
                    </TouchableOpacity>
                  </Div>
                ) : (
                  <Div justifyContent="center" alignItems="center">
                    <TouchableOpacity onPress={() => setRegistroVista(true)}>
                      <Text fontFamily="NunitoRegular">
                        ¿No tienes cuenta?{" "}
                        <Text style={styles.link}>¡Crea una!</Text>
                      </Text>
                    </TouchableOpacity>
                  </Div>
                )}
              </View>
            </>
          )}
        </Formik>
      </Div>
      <Snackbar ref={snackbarRef} bg={snackbarBg} color="white"></Snackbar>
    </Div>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  content: {
    padding: 20,
    justifyContent: "center",
    borderRadius: 10,
  },
});
