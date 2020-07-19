import React from "react";
import { Animated, StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("screen");

interface ItemProps {
  background: File;
  itemImage: File;
  logo: File;
}

interface Props {
  animation: any;
  items: Array<ItemProps>;
}

const styles = StyleSheet.create({
  itemContainer: {
    width,
    height,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 50
  },

  item: {
    width: "70%",
    height: "55%"
  }
});

const Items: React.FC<Props> = ({ animation, items }) => {
  return (
    <>
      {items.map(({ itemImage }, index: number) => {
        const inputRange =
          index === 0
            ? [-width, 0, width]
            : [width * (index - 1), width * index, width * (index + 1)];

        const animatedRotation = animation.interpolate({
          inputRange,
          outputRange: ["-40deg", "0deg", "40deg"],
          extrapolate: "clamp"
        });

        return (
          <Animated.View
            key={`${index}`}
            style={[
              styles.itemContainer,
              {
                transform: [
                  {
                    rotate: animatedRotation
                  }
                ]
              }
            ]}
          >
            <Animated.Image
              source={itemImage}
              resizeMode="contain"
              style={styles.item}
            />
          </Animated.View>
        );
      })}
    </>
  );
};
export default Items;
