import React, { useEffect, useState } from "react";
import Nav from "./Components/Nav";
import { fetchNotes, db } from "./util";
import { useAuth } from "./firebase";

const RichTextComponent = ({ richTextString }) => {
  return <div dangerouslySetInnerHTML={{ __html: richTextString }} />;
};

const Gallery = () => {
  const authUser = "bob@gmail.com";
  const userEmail = authUser ? authUser : "bob@gmail.com";
  const [galleryItems, setGalleryItems] = useState([]);

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

  const filteredItems = galleryItems;

  return (
    <div>
      <div>
        <Nav />
      </div>

      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        {filteredItems.map((item, index) => (
          <div key={item.id} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px", borderRadius: "8px" }}>
            <h2>{item.Title}</h2>
            <RichTextComponent richTextString={item.content} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;