import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { fetchNotes } from "../util.js";
import HTML from "react-native-render-html";

const GalleryApp = () => {
  const [galleryItems, setGalleryItems] = useState([]);

  const getAndSetNotes = async () => {
    const authUser = "john@gmail.com";
    const userEmail = authUser ? authUser : "john@gmail.com";
    try {
      const fetchedNotes = await fetchNotes(userEmail);
      setGalleryItems(fetchedNotes);
      // console.log('Notes fetched:', fetchedNotes);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  useEffect(() => {
    getAndSetNotes();
  }, []);

  return (
    <View style={styles.container}>
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
                contentWidth={Dimensions.get("window").width} // Adjust the content width as needed
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
