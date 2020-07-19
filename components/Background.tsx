import React from "react";
import {
  View,
  Animated,
  Dimensions,
  StyleSheet,
  ImageBackground
} from "react-native";

const { width, height } = Dimensions.get("screen");

const styles = StyleSheet.create({
  bgContainer: {
    position: "absolute",
    height,
    width
  },

  bg: {
    position: "absolute",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "flex-start"
  },

  logoContainer: {
    width: "100%",
    marginTop: 40,
    alignItems: "center"
  },

  logo: {
    width: "60%",
    height: 70
  }
});

const BackgroundImage = Animated.createAnimatedComponent(ImageBackground);

interface Props {
  opacity: any;
  zIndex: number;
  image: File;
  key: number;
  logo: File;
  logoScale: any;
}

const Background: React.FC<Props> = ({
  opacity,
  zIndex,
  image,
  logo,
  logoScale
}) => {
  return (
    <BackgroundImage
      style={[
        styles.bg,
        {
          zIndex,
          opacity
        }
      ]}
      resizeMode="cover"
      source={image}
    >
      <View style={styles.logoContainer}>
        <Animated.Image
          style={[
            styles.logo,
            {
              transform: [{ scale: logoScale }]
            }
          ]}
          resizeMode="contain"
          source={logo}
        />
      </View>
    </BackgroundImage>
  );
};
export default Background;
