import "./Small.css"; // Import your CSS file with gallery styles
import "./Large.css";
import React, { useEffect, useState } from "react";
import Nav from "./Components/Nav";
import { fetchNotes, db } from "./util";
import { useAuth } from "./firebase";

const Gallery = () => {
  const authUser = "bob@gmail.com";
  const userEmail = authUser ? authUser : "bob@gmail.com";
  const [galleryItems, setGalleryItems] = useState([]);
  const getAndSetNotes = async () => {
    try {
      const fetchedNotes = await fetchNotes(userEmail); // Assuming fetchNotes returns a Promise
      setGalleryItems(fetchedNotes);
      console.log("Notes fetched:", fetchedNotes);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  // Call the function to fetch and set notes (you can call it based on some user interaction or other events)
  // For simplicity, calling it when the component renders
  useEffect(() => {
    getAndSetNotes();
  }, []);

  const [sortOrder, setSortOrder] = useState("asc");
  const [sortBy, setSortBy] = useState("default"); // 'default' or 'recentlyAdded'
  const [searchQuery, setSearchQuery] = useState("");
  const [editIndex, setEditIndex] = useState(null); // Track the index of the item being edited
  const [editedValue, setEditedValue] = useState(""); // Local state for the edited value

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
          ? a.email.localeCompare(b.email)
          : b.email.localeCompare(a.email)
      );
    }
    setGalleryItems(sortedItems);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.email);
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
    setEditedValue(e.target.email);
  };

  const filteredItems = galleryItems.filter((item) =>
    item.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
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

  return (
    <div style={styles.container}>
      <div style={styles.navContainer}>
        <Nav />
      </div>

      <div style={styles.contentContainer}>
        <input
          type="text"
          placeholder="Search Gallery"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
      <div style={styles.galleryContainer} className="gallery-container">
        <div className="gallery">
          {filteredItems.map((item, index) => (
            <div key={item.id} className="gallery-item">
              {editIndex === index ? (
                <div>
                  <input
                    type="text"
                    value={editedValue}
                    onChange={handleInputChange}
                  />
                  <button onClick={() => handleSave(index)}>Save</button>
                  <button onClick={handleCancel}>Cancel</button>
                </div>
              ) : (
                <>
                  <div>{item.email}</div>
                  <button onClick={() => handleEdit(index, item.email)}>
                    Edit
                  </button>
                  <button onClick={() => removeGalleryItem(index)}>
                    Remove
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
      <div>
        <label>
          Sort by:
          <select value={sortBy} onChange={(e) => setSortBy(e.target.email)}>
            <option value="default">Default</option>
            <option value="recentlyAdded">Recently Added</option>
          </select>
        </label>
      </div>
      <button onClick={addGalleryItem}>Add Gallery Item</button>
      <button onClick={sortGalleryItems}>Sort Gallery</button>
    </div>
  );
};

export default Gallery;
