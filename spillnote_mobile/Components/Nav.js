import React from "react";
import { Image, StyleSheet, View, TouchableOpacity, Text } from "react-native";

const HomeScreen = ({ navigation }) => {
  const handleNavigation = (screen) => {
    navigation.navigate(screen);
  };
  

  return (
    <View style={styles.container}>
      <Image source={require("../assets/icon128.png")} style={styles.image} />
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#3f4966" }]}
        onPress={() => handleNavigation("Explore")}
      >
        <Text style={styles.buttonText}>Explore</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#3f4966" }]}
        onPress={() => handleNavigation("LoginPage")}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#3f4966" }]}
        onPress={() => handleNavigation("RegisterPage")}
      >
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#3f4966" }]}
        onPress={() => handleNavigation("Create")}
      >
        <Text style={styles.buttonText}>Create</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#3f4966" }]}
        onPress={() => handleNavigation("SettingsMobile")}
      >
        <Text style={styles.buttonText}>Account</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3f4966",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    textAlign: "center",
  },
  text: {
    fontSize: 50,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "cover",
  },
});

export default HomeScreen;
