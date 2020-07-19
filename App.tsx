import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  ImageBackground,
  Dimensions,
  Animated,
  View
} from "react-native";

import { Items, Background } from "./components";

import sliderItems from "./sliderItems";

const { width, height } = Dimensions.get("screen");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative"
  },

  itemContainer: {
    width,
    height,
    justifyContent: "center",
    alignItems: "center"
  },

  item: {
    width: "70%",
    height: "55%"
  },

  bgContainer: {
    position: "absolute",
    height,
    width
  }
});

const BackgroundImage = Animated.createAnimatedComponent(ImageBackground);

const scrollAnimation = new Animated.Value(0);

const App: React.FC = () => {
  const opacityOne = scrollAnimation.interpolate({
    inputRange: [0, width],
    outputRange: [1, 0]
  });
  return (
    <View style={styles.container}>
      <Animated.View style={styles.bgContainer}>
        {sliderItems.map(({ background, logo }, index) => {
          const inputRange = [width * index, width * (index + 1)];

          const opacity = scrollAnimation.interpolate({
            inputRange,
            outputRange: [1, 0],
            extrapolate: "clamp"
          });

          const scaleInputRange = [
            width * (index - 1),
            width * index,
            width * (index + 1)
          ];
          const scaleOutputRange = [0, 1, 0];

          const logoScale = scrollAnimation.interpolate({
            inputRange: scaleInputRange,
            outputRange: scaleOutputRange,
            extrapolate: "clamp"
          });

          return (
            <Background
              logo={logo}
              key={Number(`${index}`)}
              image={background}
              opacity={opacity}
              logoScale={logoScale}
              zIndex={sliderItems.length - index}
            />
          );
        })}
      </Animated.View>

      <Animated.ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollAnimation } } }],
          { useNativeDriver: false }
        )}
      >
        <Items animation={scrollAnimation} items={sliderItems} />
      </Animated.ScrollView>
    </View>
  );
};

export default App;
