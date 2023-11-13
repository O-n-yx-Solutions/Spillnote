import React, { useState } from "react";
import PushTag from "./scripts/PushTag";

const TagsScrollable = ({ items, onSelect }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);

  const handleItemSelect = (item) => {
    setSelectedItem(item);
    onSelect(item);
  };

  const styles = {
    scrollableContainer: {
      overflowY: "scroll",
      height: "200px",
    },
    listItem: {
      padding: "8px",
      borderBottom: "1px solid #eee",
    },
  };

  return (
    <div style={styles.scrollableContainer}>
      <ul style={{ listStyle: "none", padding: "0" }}>
        {items.map((item, index) => (
          <li
            key={index}
            style={{
              ...styles.listItem,
              backgroundColor:
                selectedItem === item
                  ? "lightblue"
                  : hoveredItem === item
                  ? "lightgray"
                  : "#242424",
            }}
            onClick={() => handleItemSelect(item)}
            onMouseEnter={() => setHoveredItem(item)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

const TagItems = Array.from({ length: 20 }, (_, i) => `Item ${i + 1}`);

const Popout = ({ onClose, onSelectTag, onSubmit }) => {
  const [nameEntry, setNameEntry] = useState("");

  const handleSelectTag = (tag) => {
    onSelectTag(tag);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // send tag data to separate collection tied to user in database
    onSubmit(nameEntry);
  };

  return (
    <div className="popout-container">
      <div className="popout-content">
        <section id="ParentSelector">
          <h2>Set Parent</h2>
          <TagsScrollable items={TagItems} onSelect={handleSelectTag} />
        </section>
        <section id="NameCreator">
          <h2>Name</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="NameEntry"
              id="NameEntry"
              value={nameEntry}
              onChange={(e) => setNameEntry(e.target.value)}
            />
            {/* ZANE PUT YOUR ICON SELECTOR HTML HERE */}
            <button type="submit">Submit</button>
          </form>
        </section>
      </div>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

const PopoutHandler = () => {
  const [isPopoutOpen, setPopoutOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState("");

  const togglePopout = () => {
    setPopoutOpen(!isPopoutOpen);
  };

  const handleSelectTag = (tag) => {
    setSelectedTag(tag);
  };

  const usertag = "0854oFj8R4PuW0iDbDaQ"; //change this to return current user
  const iconColor = "";
  const iconPath = "";
  const handleSubmit = (nameEntry) => {
    // ZANE, send the icon color after nameEntry, and the icon path after that
    //AFTER ELI ADDS THE METHOD TO CHECK WHAT THE CURRENT USER IS, PASS THAT IN AS WELL
    console.log("Tag Created:", selectedTag, nameEntry, iconColor, iconPath);
    PushTag(usertag, selectedTag, nameEntry, iconColor, iconPath);
    setPopoutOpen(false);
  };

  return (
    <div>
      {isPopoutOpen ? (
        <Popout
          onClose={() => setPopoutOpen(false)}
          onSelectTag={handleSelectTag}
          onSubmit={handleSubmit}
        />
      ) : (
        <button onClick={togglePopout}>Add Tag</button>
      )}
    </div>
  );
};

export default PopoutHandler;
