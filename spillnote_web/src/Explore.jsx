import React, { useEffect, useState } from "react";
import Nav from "./Components/Nav";
import { fetchNotes, db } from "./util";
import { editDbText } from "./util";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const RichTextComponent = ({ richTextString }) => {
  return <div dangerouslySetInnerHTML={{ __html: richTextString }} />;
};

const Gallery = () => {
  const authUser = "bob@gmail.com";
  const userEmail = authUser ? authUser : "bob@gmail.com";
  const [galleryItems, setGalleryItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [quillContent, setQuillContent] = useState("");

  const getAndSetNotes = async () => {
    try {
      const fetchedNotes = await fetchNotes(userEmail);
      setGalleryItems(fetchedNotes);
      console.log("Notes fetched:", fetchedNotes);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  useEffect(() => {
    getAndSetNotes();
  }, []);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setQuillContent(item.content);
  };

  const handleSave = () => {
    // Implement your save logic here
    console.log("Saving changes:", quillContent);
    
    // Update the item in your state or database
    const updatedItems = galleryItems.map((item) =>
    item.id === selectedItem.id ? { ...item, content: quillContent } : item
    );
    setGalleryItems(updatedItems);
    editDbText(selectedItem.id, quillContent);
    setSelectedItem(null);
  };

  return (
    <div style={{ display: "flex" }}>
      <div>
        <Nav />
      </div>

      <div style={{ flex: 1, padding: "10%", maxWidth: "50%" }}>
        {galleryItems.map((item, index) => (
          <div
            key={item.id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              margin: "10px",
              borderRadius: "8px",
              cursor: "pointer",
            }}
            onClick={() => handleItemClick(item)}
          >
            <h2>{item.Title}</h2>
            <RichTextComponent richTextString={item.content} />
          </div>
        ))}
      </div>

      {selectedItem && (
        <div>
          <ReactQuill
            theme="snow"
            value={quillContent}
            onChange={setQuillContent}
            style={{ minHeight: "300px" }}
          />
          <button onClick={handleSave}>Save Changes</button>
        </div>
      )}
    </div>
  );
};

export default Gallery;
