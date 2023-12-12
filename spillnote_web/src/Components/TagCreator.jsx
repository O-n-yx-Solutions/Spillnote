import React, { useState } from "react";
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

  const styles = {
    scrollableContainer: {
      height: "fit-content",
    },
    listItem: {
      padding: "8px",
      borderBottom: "1px solid #eee",
    },
    icon: {
      padding: "8px",
      borderBottom: "1px solid #eee",
      width: "20px",
      height: "20px",
    },
  };
  // const usertag = "0854oFj8R4PuW0iDbDaQ"; // change this to return the current user

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(
      "Tag Created:",
      currentUser.email,
      selectedTag,
      nameEntry,
      tagColor,
      selectedIcon
    );
    PushTag(currentUser.email, selectedTag, nameEntry, tagColor, selectedIcon);

    //onSubmit(usertag, selectedTag, nameEntry, tagColor, selectedIcon.imageUrl); // Pass selectedIcon to onSubmit
  };

  return (
    <div className="popout-container">
      <div className="popout-content" style={styles.scrollableContainer}>
        <section id="ParentSelector">
          <h2>Set Parent</h2>
          <ul
            style={
              {
                /*listStyle: "none", margin: "0.5em"*/
              }
            }
          >
            {TagItems.map((tag) => (
              <li
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
                onClick={() => setSelectedTag(tag.id)}
                onMouseEnter={() => setHoveredItem(tag.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                {tag.id}
              </li>
            ))}
          </ul>

          <div className="icon-selector">
            {Images.map((image) => (
              <svg
                key={image.id}
                style={{
                  ...styles.icon,
                  backgroundColor:
                    selectedIcon === image.id
                      ? "white"
                      : hoveredItem === image.id
                      ? "lightgray"
                      : "#ffffff",
                }}
                viewBox="0 0 20 20" // Adjust the viewBox as needed
                xmlns="http://www.w3.org/2000/svg"
                alt={`Icon ${image.id}`}
                className={selectedIcon === image.id ? "selected" : ""}
                onClick={() => setSelectedIcon(image.id)}
                onMouseEnter={() => setHoveredItem(image.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <image xlinkHref={image.imageUrl} width="20" height="20" />
              </svg>
            ))}
          </div>
          <label htmlFor="tagColor">Tag Color:</label>
          <input
            type="color"
            id="tagColor"
            value={tagColor}
            onChange={(e) => setTagColor(e.target.value)}
          />
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
      <button id="close_btn" onClick={onClose}>
        Close
      </button>
    </div>
  );
};

const PopoutHandler = () => {
  const currentUser = useAuth();
  const [isPopoutOpen, setPopoutOpen] = useState(false);

  const togglePopout = () => {
    setPopoutOpen(!isPopoutOpen);
  };


  const handleSubmit = (nameEntry, selectedTag, tagColor, selectedIcon) => {
    console.log(
      "Tag Created:",
      selectedTag,
      nameEntry,
      tagColor,
      selectedIcon,
      currentUser.email
    );
    // Modify PushTag to handle the selected icon
    PushTag(usertag, selectedTag, nameEntry, tagColor, selectedIcon.imageUrl);
    setPopoutOpen(false);
  };

  return (
    <div>
      {isPopoutOpen ? (
        <Popout onClose={() => setPopoutOpen(false)} onSubmit={handleSubmit} />
      ) : (
        <button onClick={togglePopout}>Add Tag</button>
      )}
    </div>
  );
};

export default PopoutHandler;
