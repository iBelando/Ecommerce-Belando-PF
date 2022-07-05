import React from "react";
import { useWindowDimensions } from "react-native";
import { Div, Text, Button, Image } from "react-native-magnus";
import Svg, { Rect } from "react-native-svg";

const ProductItem = ({ product, onPress }) => {
  const { width, height } = useWindowDimensions();

  return (
    <Div p="2xl" py="lg" bg="gray200">
      <Div m="md" row alignItems="center" justifyContent="center">
        <Button
          bg="blue500"
          rounded="xl"
          py="2xl"
          px="2xl"
          onPress={() => onPress(product)}
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
              source={{
                uri: product.image,
              }}
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
                  {product.description}
                </Text>
              </Div>
            </Div>
          </Div>
        </Button>
      </Div>
    </Div>
  );
};

export default ProductItem;

const styles = {
  image: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "black",
  },
  text: {
    alignItems: "center",
    fontSize: 20,
    textAlign: "center",
    marginBottom: 35,
    fontFamily: "NunitoBlackItalic",
  },
};
