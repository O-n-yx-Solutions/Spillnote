import { StyleSheet, Text, View } from 'react-native';
import RegisterPage from './Components/regPageMobile';
import LoginPage from './Components/loginPageMobile';
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import Nav from "./Components/Nav";

export default function App() {
  return (
    <View style={styles.container}>
      <LoginPage />
      <StatusBar style="auto" />
      //<Nav />
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
