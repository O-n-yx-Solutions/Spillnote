import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";

const Nav = () => {
  return (
    <View style={styles.navbar}>
      <View style={styles.header}>
        <Image source={require("../assets/Logo.svg")} style={styles.logo} />
        <Text style={styles.title}>Spillnote</Text>
        <TouchableOpacity style={styles.addTagButton}>
          <Text>Add Tag</Text>
        </TouchableOpacity>
        <Text style={styles.settingsWheel}>⚙️</Text>
      </View>

      <View style={styles.statics}>
        <FlatList
          data={["Recent", "Favorites"]}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <View style={styles.staticItem}>
              <Text>{item}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    paddingTop: 20,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  logo: {
    width: 40,
    height: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  addTagButton: {
    padding: 10,
  },
  settingsWheel: {
    fontSize: 24,
  },
  listItem: {
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  sectionTitle: {
    padding: 10,
  },
  expandedSection: {
    backgroundColor: "lightgray",
  },
  childListItem: {
    padding: 10,
    backgroundColor: "lightgray",
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  statics: {
    marginTop: 10,
    borderTopWidth: 1,
    borderColor: "#ccc",
  },
  staticItem: {
    padding: 10,
  },
});

export default Nav;
