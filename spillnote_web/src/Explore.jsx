import React, { useEffect, useState } from "react";
import "./App.css"; // Import your CSS file with gallery styles
import Nav from "./Components/Nav";
import fetchNotes from "./firebase";
import { useAuth } from "./firebase";

const Gallery = () => {
  //const [notes, setNotes] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortBy, setSortBy] = useState("default"); // 'default' or 'recentlyAdded'
  const [searchQuery, setSearchQuery] = useState("");
  const [editIndex, setEditIndex] = useState(null); // Track the index of the item being edited
  const [editedValue, setEditedValue] = useState(""); // Local state for the edited value

  // const authUser = "yellow";
  // const userEmail = authUser ? authUser : "bob@gmail.com";

  const [galleryItems, setGalleryItems] = useState([
    { id: 1, value: "Item 1" },
    { id: 2, value: "Item 2" },
    { id: 3, value: "Item 3" },
  ]);
  const styles = {
    container: {
      display: "flex",
    },
    navContainer: {
      width: "20%",
      position: "sticky",
      top: 0,
      padding: "20px",
      backgroundColor: "#f5f5f5",
    },
    contentContainer: {
      width: "80%",
      overflowY: "auto",
      padding: "20px",
    },
    galleryInput: {
      width: "100%",
      marginBottom: "10px",
      padding: "8px",
    },
    galleryContainer: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
      gap: "16px",
    },
    galleryItem: {
      border: "1px solid #ddd",
      borderRadius: "8px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      margin: "8px",
    },
    galleryItemButtons: {
      marginTop: "8px",
      display: "flex",
      gap: "8px",
    },
  };
  const addGalleryItem = () => {
    const newItem = `Item ${galleryItems.length + 1}`;
    setGalleryItems([...galleryItems, { id: Date.now(), value: newItem }]);
  };

  const removeGalleryItem = (index) => {
    const updatedItems = [...galleryItems];
    updatedItems.splice(index, 1);
    setGalleryItems(updatedItems);
  };

  const sortGalleryItems = () => {
    const sortedItems = [...galleryItems];
    if (sortBy === "recentlyAdded") {
      sortedItems.sort((a, b) =>
        sortOrder === "asc" ? a.id - b.id : b.id - a.id
      );
    } else {
      sortedItems.sort((a, b) =>
        sortOrder === "asc"
          ? a.value.localeCompare(b.value)
          : b.value.localeCompare(a.value)
      );
    }
    setGalleryItems(sortedItems);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleEdit = (index, value) => {
    setEditIndex(index);
    setEditedValue(value);
  };

  const handleSave = (index) => {
    setGalleryItems((prevItems) =>
      prevItems.map((item, i) =>
        i === index ? { ...item, value: editedValue } : item
      )
    );
    setEditIndex(null);
  };

  const handleCancel = () => {
    setEditIndex(null);
  };

  const handleInputChange = (e) => {
    setEditedValue(e.target.value);
  };

  // useEffect(() => {
  //   const getNotes = async () => {
  //     try {
  //       const notesData = await fetchNotes(authUser);
  //       setNotes(notesData);
  //     } catch (error) {
  //       console.error("Error getting notes:", error);
  //     }
  //   };

  //   getNotes();
  // }, [authUser]);

  const filteredItems = galleryItems.filter((item) =>
    item.value.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <div style={styles.navContainer}></div>
      <div style={styles.contentContainer}>
        <div>
          <input
            type="text"
            placeholder="&#x1F50E;&#xFE0E;"
            value={searchQuery}
            onChange={handleSearch}
            style={{ ...styles.galleryInput, textAlign: "right" }}
          />
        </div>
        <div style={styles.galleryContainer} className="gallery-container">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              style={styles.galleryItem}
              className="gallery-item"
            >
              <p>{item.value}</p>
            </div>
          ))}
        </div>
        <div>
          <label>
            Sort by:
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="default">Default</option>
              <option value="recentlyAdded">Recently Added</option>
            </select>
          </label>
        </div>
        <button onClick={addGalleryItem}>Add Gallery Item</button>
        <button onClick={sortGalleryItems}>Sort Gallery</button>
      </div>
    </div>
  );
};
export default Gallery;
