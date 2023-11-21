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

const IconScrollable = ({items, onSelect}) => {
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

// const IconColor = ({}) => {}

const TagItems = Array.from({ length: 20 }, (_, i) => `Item ${i + 1}`); 
const Images = [
    { id: 1, imageUrl: "image1.svg", url: "/" },
    { id: 2, imageUrl: "image2.svg", url: "/" },
    { id: 3, imageUrl: "image3.svg", url: "/" },
    { id: 4, imageUrl: "image3.svg", url: "/" },
    { id: 5, imageUrl: "image3.svg", url: "/" },
    { id: 6, imageUrl: "image3.svg", url: "/" },
    { id: 7, imageUrl: "image3.svg", url: "/" },
    { id: 8, imageUrl: "image3.svg", url: "/" },
    { id: 9, imageUrl: "image3.svg", url: "/" },
    { id: 10, imageUrl: "image3.svg", url: "/" },
]


// const ImageSelector = () => {
//   const folderPath = "your/image/folder";
//   const images = getImagesFromFolder(folderPath);

//   const [selectedImage, setSelectedImage] = useState(images[0]);

//   const handleImageChange = (event) => {
//     const selectedImagePath = event.target.value;
//     const selectedImageObject = images.find((image) => image.path === selectedImagePath);
//     setSelectedImage(selectedImageObject);
//   };
// };

/***********************/

const Popout = ({ onClose, onSelectTag, onSubmit, onSelectImg }) => {
  const [nameEntry, setNameEntry] = useState("");

  const handleSelectTag = (tag) => {
    onSelectTag(tag);
  };

  const handleSelectImg = (img) => {
    onSelectImg(img);
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
          <IconScrollable items={Images} onSelect={handleSelectImg} />{/*  what how does this work?   */}
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
            {/* <select id="imageDropdown" onChange={handleImageChange} value={selectedImage.path}>
              {images.map((image, index) => (
              <option key={index} value={image.path}>
                {image.alt}
              </option>
              ))}
            </select>
            <div>
              <h3>Selected Image:</h3>
              <img src={selectedImage.path} alt={selectedImage.alt} />
            </div> */}
            {/* ======== */}

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
  const [selectedTag, setSelectedTag] = useState("");//reference for selecting things and getting output
  // const [selectedColor, setSelectedColor] = useState("");
  const [selectIcon, setSelectedIcon] = useState("");

  const togglePopout = () => {
    setPopoutOpen(!isPopoutOpen);
  };

  const handleSelectTag = (tag) => {
    setSelectedTag(tag);
  };

  const handleSelectImg = (img) => {
    setSelectedIcon(img)
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
    // getImagesFromFolder("./public/tagIcons");
  };

  return (
    <div>
      {isPopoutOpen ? (
        <Popout
          onClose={() => setPopoutOpen(false)}
          onSelectTag={handleSelectTag}
          onSelectImg={handleSelectImg}
          onSubmit={handleSubmit}
        />
      ) : (
        <button onClick={togglePopout}>Add Tag</button>
      )}
    </div>
  );
};

export default PopoutHandler;
