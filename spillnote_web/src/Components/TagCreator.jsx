import React, { useState } from "react";

const TagsScrollable = ({ items, onSelect }) => {
  const styles = {
    scrollableContainer: {
      overflowY: "scroll",
      height: "200px",
      border: "1px solid #ccc",
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
            style={styles.listItem}
            onClick={() => onSelect(item)}
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
            <button type="submit">Submit</button>
          </form>
        </section>
      </div>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

const YourComponent = () => {
  const [isPopoutOpen, setPopoutOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState("");

  const togglePopout = () => {
    setPopoutOpen(!isPopoutOpen);
  };

  const handleSelectTag = (tag) => {
    setSelectedTag(tag);
  };

  const handleSubmit = (nameEntry) => {
    console.log("Tag Created:", selectedTag, nameEntry);
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

export default YourComponent;
