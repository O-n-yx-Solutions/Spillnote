import React, { useRef, useState, useEffect } from "react";
import { View, StyleSheet, PanResponder } from "react-native";
import Svg, { Path } from "react-native-svg";

const DrawingScreen = ({ navigation }) => {
  const [path, setPath] = useState("");
  const pathRef = useRef("");

  useEffect(() => {
    pathRef.current = path;
  }, [path]);

  const handlePanResponderMove = (event, gestureState) => {
    const { moveX, moveY } = gestureState;
    const newPath = `${pathRef.current} L${moveX} ${moveY}`;
    pathRef.current = newPath;
    setPath(newPath);
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: handlePanResponderMove,
  });

  return (
    <View style={styles.container}>
      <Svg height="100%" width="100%">
        <Path d={path} stroke="#000000" strokeWidth={4} fill="none" />
      </Svg>
      <View
        {...panResponder.panHandlers}
        style={StyleSheet.absoluteFillObject}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default DrawingScreen;
