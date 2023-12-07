import React from "react";
import {
  Text,
  Image,
  StyleSheet,
  View,
  Button,
  TouchableOpacity,
} from "react-native";

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <Text style={styles.text}>Spillnote</Text>
      <Image source={require("../assets/icon128.png")} style={styles.image} />
      <Button onPress={() => navigation.navigate(`Explore`)} title="Explore" />
      <Button title="Login" onPress={() => navigation.navigate(`LoginPage`)} />
      <Button
        title="Register"
        onPress={() => navigation.navigate(`RegisterPage`)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 50,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "cover", // You can use "cover", "contain", "stretch", etc.
  },
});

export default HomeScreen;
