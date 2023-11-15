import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View, StyleSheet } from "react-native";
import Nav from "./Components/Nav";
// Explore imports
import Explore from "./Components/Explore";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Explore/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
