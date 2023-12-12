import React, { useState, useEffect } from "react";
import { Text, View, ScrollView, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { fetchNotes } from "../util.js";
import HTML from "react-native-render-html";
import { useAuth, getCurrentUser } from "../firebase.js";

const GalleryApp = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [currentUser, setCurrentUser] = useState();

  const getAndSetNotes = async () => {
    try {
      const user = await getCurrentUser();
      console.log(user.email);
      setCurrentUser(user);
      const fetchedNotes = await fetchNotes(user.email);
      setGalleryItems(fetchedNotes);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  useEffect(() => {
    getAndSetNotes();
  }, []);

  return (
    <View style={styles.container}>
      <View>
        {currentUser ? (
          <Text>Logged in as {currentUser.email}</Text>
        ) : (
          <Text>Not logged in.</Text>
        )}
      </View>
      <ScrollView style={styles.gallery}>
        {galleryItems.map((item) => (
          <TouchableOpacity key={item.id} style={styles.button}>
            <View key={item.id} style={styles.galleryItem}>
              <HTML
                source={{
                  html: `
                               <h2>${item.Title}</h2>
                               <p>${item.content}</p>
                              `,
                }}
                contentWidth={Dimensions.get("window").width}
              />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 80,
  },
  gallery: {
    flex: 1,
  },
  galleryItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
    padding: 10,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#aaaaaa",
    margin: 5,
    padding: 10,
  },
});

export default GalleryApp;
