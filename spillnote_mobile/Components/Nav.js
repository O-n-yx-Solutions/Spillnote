import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
} from "react-native";
import PushTag from "./scripts/PushTag";
import { useAuth } from "../firebase";
const TagItems = Array.from({ length: 20 }, (_, i) => ({
  id: `tag_${i + 1}`,
  name: `Item ${i + 1}`,
}));
const Images = [
  { id: 1, imageUrl: "/tagIcons/image1.svg", url: "/" },
  { id: 2, imageUrl: "/tagIcons/image2.svg", url: "/" },
  { id: 3, imageUrl: "/tagIcons/image3.svg", url: "/" },
  { id: 4, imageUrl: "/tagIcons/image4.svg", url: "/" },
  { id: 5, imageUrl: "/tagIcons/image5.svg", url: "/" },
  { id: 6, imageUrl: "/tagIcons/image6.svg", url: "/" },
  { id: 7, imageUrl: "/tagIcons/image7.svg", url: "/" },
  { id: 8, imageUrl: "/tagIcons/image8.svg", url: "/" },
  { id: 9, imageUrl: "/tagIcons/image9.svg", url: "/" },
  { id: 10, imageUrl: "/tagIcons/image10.svg", url: "/" },
];

const Popout = ({ onClose, onSubmit }) => {
  const [nameEntry, setNameEntry] = useState("");
  const [selectedTag, setSelectedTag] = useState(null);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [tagColor, setTagColor] = useState("#000000"); // Default color is black
  const [hoveredItem, setHoveredItem] = useState(null);
  const currentUser = useAuth();

  // const Nav = () => {
  //   return (
  //     <View style={styles.navbar}>
  //       <View style={styles.header}>
  //         <Image source={require("../assets/Logo.svg")} style={styles.logo} />
  //         <Text style={styles.title}>Spillnote</Text>
  //         <TouchableOpacity style={styles.addTagButton}>
  //           <Text>Add Tag</Text>
  //         </TouchableOpacity>
  //         <Text style={styles.settingsWheel}>⚙️</Text>
  //       </View>

  //       <View style={styles.statics}>
  //         <FlatList
  //           data={["Recent", "Favorites"]}
  //           keyExtractor={(item) => item}
  //           renderItem={({ item }) => (
  //             <View style={styles.staticItem}>
  //               <Text>{item}</Text>
  //             </View>
  //           )}
  //         />
  //       </View>
  //     </View>
  //   );
  // };

  // const styles = StyleSheet.create({
  //   navbar: {
  //     flex: 1,
  //   },
  //   header: {
  //     flexDirection: "row",
  //     alignItems: "center",
  //     padding: 10,
  //     paddingTop: 20,
  //     borderBottomWidth: 1,
  //     borderColor: "#ccc",
  //   },
  //   logo: {
  //     width: 40,
  //     height: 40,
  //   },
  //   title: {
  //     fontSize: 24,
  //     fontWeight: "bold",
  //   },
  //   addTagButton: {
  //     padding: 10,
  //   },
  //   settingsWheel: {
  //     fontSize: 24,
  //   },
  //   listItem: {
  //     borderBottomWidth: 1,
  //     borderColor: "#ccc",
  //   },
  //   sectionTitle: {
  //     padding: 10,
  //   },
  //   expandedSection: {
  //     backgroundColor: "lightgray",
  //   },
  //   childListItem: {
  //     padding: 10,
  //     backgroundColor: "lightgray",
  //     borderBottomWidth: 1,
  //     borderColor: "#ccc",
  //   },
  //   statics: {
  //     marginTop: 10,
  //     borderTopWidth: 1,
  //     borderColor: "#ccc",
  //   },
  //   staticItem: {
  //     padding: 10,
  //   },
  // });

  // export default Nav;

  const styles = {
    listItem: {
      padding: 8,
      borderBottomWidth: 1,
      borderBottomColor: "#eee",
    },
    icon: {
      padding: 8,
      borderBottomWidth: 1,
      borderBottomColor: "#eee",
      width: 20,
      height: 20,
    },
    scrollableContainer: {
      height: 200,
    },
  };

  const usertag = "0854oFj8R4PuW0iDbDaQ"; // change this to return the current user

  const handleSubmit = () => {
    console.log(
      "Tag Created:",
      currentUser.email,
      selectedTag,
      nameEntry,
      tagColor,
      selectedIcon
    );
    PushTag(usertag, selectedTag, nameEntry, tagColor, selectedIcon);

    // onSubmit(usertag, selectedTag, nameEntry, tagColor, selectedIcon.imageUrl);
    onClose();
  };

  return (
    <View style={{ height: "100%" }}>
      <ScrollView style={styles.scrollableContainer}>
        <View>
          <Text>Set Parent</Text>
          {TagItems.map((tag) => (
            <TouchableOpacity
              key={tag.id}
              style={{
                ...styles.listItem,
                backgroundColor:
                  selectedTag === tag.id
                    ? "lightblue"
                    : hoveredItem === tag.id
                    ? "lightgray"
                    : "#242424",
              }}
              onPress={() => setSelectedTag(tag.id)}
              onMouseEnter={() => setHoveredItem(tag.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <Text>{tag.id}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ flexDirection: "row" }}>
          {Images.map((image) => (
            <TouchableOpacity
              key={image.id}
              style={{
                ...styles.icon,
                backgroundColor:
                  selectedIcon === image.id
                    ? "lightblue"
                    : hoveredItem === image.id
                    ? "lightgray"
                    : "#242424",
              }}
              onPress={() => setSelectedIcon(image.id)}
              onMouseEnter={() => setHoveredItem(image.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              {/* Adjust the Image component based on your actual image handling */}
              <Image
                source={{ uri: image.imageUrl }}
                style={{ width: 20, height: 20 }}
              />
            </TouchableOpacity>
          ))}
        </View>

        <View>
          <Text>Tag Color:</Text>
          <TextInput
            style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
            onChangeText={(text) => setTagColor(text)}
            value={tagColor}
          />
        </View>
      </ScrollView>

      <View>
        <Text>Name</Text>
        <TextInput
          style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
          onChangeText={(text) => setNameEntry(text)}
          value={nameEntry}
        />
        <TouchableOpacity onPress={handleSubmit}>
          <Text>Submit</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={onClose}>
        <Text>Close</Text>
      </TouchableOpacity>
    </View>
  );
};

const PopoutHandler = () => {
  const [isPopoutOpen, setPopoutOpen] = useState(false);

  const togglePopout = () => {
    setPopoutOpen(!isPopoutOpen);
  };

  const usertag = "0854oFj8R4PuW0iDbDaQ"; // change this to return the current user

  const handleSubmit = (nameEntry, selectedTag, tagColor, selectedIcon) => {
    console.log(
      "Tag Created:",
      selectedTag,
      nameEntry,
      tagColor,
      selectedIcon,
      usertag
    );
    PushTag(usertag, selectedTag, nameEntry, tagColor, selectedIcon.imageUrl);
    setPopoutOpen(false);
  };

  return (
    <View>
      {isPopoutOpen ? (
        <Popout onClose={() => setPopoutOpen(false)} onSubmit={handleSubmit} />
      ) : (
        <TouchableOpacity onPress={togglePopout}>
          <Text>Add Tag</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default PopoutHandler;
