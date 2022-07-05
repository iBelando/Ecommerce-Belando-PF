import { Dimensions, useWindowDimensions, StyleSheet } from "react-native";
import { Div, Button, Image, Text } from "react-native-magnus";
import Svg, { Rect } from "react-native-svg";
import React from "react";
import { colors } from "../../Styles/Colors";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const CategoryItem = ({ category, onPress }) => {
  const { width, height } = useWindowDimensions();

  return (
    <Div p="2xl" py="lg" bg="gray200">
      <Div m="md" row alignItems="center" justifyContent="center">
        <Button
          bg="blue500"
          rounded="xl"
          py="2xl"
          px="2xl"
          onPress={() => onPress(category)}
        >
          <Div position="absolute" top={0} left={0} h={700} w={700} zIndex={1}>
            <Svg viewBox="0 0 375 283" fill="none" opacity={0.1}>
              <Rect
                x={159.52}
                y={175}
                width={152}
                height={152}
                rx={8}
                transform="rotate(-45 159.52 175)"
                fill="#fff"
              />
              <Rect
                y={107.48}
                width={152}
                height={152}
                rx={8}
                transform="rotate(-45 0 107.48)"
                fill="#fff"
              />
            </Svg>
          </Div>
          <Div alignItems="center" zIndex={2}>
            <Image
              h={250}
              w={250}
              resizeMode="contain"
              source={{ uri: category.image }}
            />
            <Div>
              <Div row alignItems="center">
                <Text
                  color="white"
                  fontSize="4xl"
                  mt="xl"
                  fontWeight="bold"
                  fontFamily="NunitoBlack"
                >
                  {category.name}
                </Text>
              </Div>
            </Div>
          </Div>
        </Button>
      </Div>
    </Div>
  );
};

export default CategoryItem;

const styles = {
  container: {
    width: 3000,
    height: windowWidth * 0.44,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    padding: 8,
    backgroundColor: colors.terciario,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  text: {
    fontSize: 17,
    fontFamily: "RubikGlitch",
  },
};
