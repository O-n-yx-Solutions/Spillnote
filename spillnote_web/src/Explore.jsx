import React, { useEffect, useState } from "react";
import Nav from "./Components/Nav";
import { fetchNotes, fetchTags, db, removeNote } from "./util";
import { editDbText, editNoteTags } from "./util";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useAuth } from "./firebase";

const RichTextComponent = ({ richTextString }) => {
  return <div dangerouslySetInnerHTML={{ __html: richTextString }} />;
};

const Gallery = () => {
  const currentUser = useAuth();
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    // Check if currentUser is available before accessing its properties
    if (currentUser && currentUser.email) {
      setUserEmail(currentUser.email);

      // Call getAndSetNotes only if userEmail is set
      //getAndSetNotes();
    }
  }, [currentUser]);

  // Log the updated email when it changes
  useEffect(() => {
    //console.log(userEmail);
    // You may choose to call getAndSetNotes here again if needed
    getAndSetNotes();
    getAndSetTags();
  }, [userEmail]);
  //const userEmail = "bob@gmail.com";
  const [galleryItems, setGalleryItems] = useState([]);
  const [galleryTags, setGalleryTags] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedTag, setSelectedTag] = useState(null);
  const [quillContent, setQuillContent] = useState("");
  const [searchInput, setSearchInput] = useState("");

  var modules = {
    toolbar: [
      [{ size: ["small", false, "large", "huge"] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
        { align: [] },
      ],
      [
        {
          color: [
            "#000000",
            "#e60000",
            "#ff9900",
            "#ffff00",
            "#008a00",
            "#0066cc",
            "#9933ff",
            "#ffffff",
            "#facccc",
            "#ffebcc",
            "#ffffcc",
            "#cce8cc",
            "#cce0f5",
            "#ebd6ff",
            "#bbbbbb",
            "#f06666",
            "#ffc266",
            "#ffff66",
            "#66b966",
            "#66a3e0",
            "#c285ff",
            "#888888",
            "#a10000",
            "#b26b00",
            "#b2b200",
            "#006100",
            "#0047b2",
            "#6b24b2",
            "#444444",
            "#5c0000",
            "#663d00",
            "#666600",
            "#003700",
            "#002966",
            "#3d1466",
            "custom-color",
          ],
        },
      ],
    ],
  };

  var formats = [
    "header",
    "height",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "color",
    "bullet",
    "indent",
    "link",
    "image",
    "align",
    "size",
  ];

  const getAndSetNotes = async () => {
    try {
      const fetchedNotes = await fetchNotes(userEmail);
      //console.log("Hello", userEmail);
      setGalleryItems(fetchedNotes);
      //console.log("Notes fetched:", fetchedNotes);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };
  const getAndSetTags = async () => {
    try {
      const fetchedTags = await fetchTags(userEmail);
      setGalleryTags(fetchedTags);
      //console.log("Notes fetched:", fetchedNotes);
    } catch (error) {
      console.error("Error fetching tags:", error);
    }
  };
  const handleItemClick = (item) => {
    setSelectedItem(item);
    setQuillContent(item.content);
  };

  const handleDelete = (itemId, event) => {
    event.stopPropagation();
    const updatedItems = galleryItems.filter((item) => item.id !== itemId);
    setGalleryItems(updatedItems);
    removeNote(itemId);
  };

  const handleSave = () => {
    console.log("Saving changes:", quillContent);

    const updatedItems = galleryItems.map((item) =>
      item.id === selectedItem.id ? { ...item, content: quillContent } : item
    );
    setGalleryItems(updatedItems);
    editDbText(selectedItem.id, quillContent);
    editNoteTags(selectedTag.id, true);
    setSelectedItem(null);
    setSelectedTag(null);
  };

  // Function to filter items based on search input
  const filteredItems = galleryItems.filter(
    (item) =>
      item.Title.toLowerCase().includes(searchInput.toLowerCase()) ||
      item.content.toLowerCase().includes(searchInput.toLowerCase())
  );


  
  const quillToolbarStyles = {
    ".ql-toolbar svg": {
      stroke: "#fff",
    },
    ".ql-snow.ql-toolbar button svg": {
      stroke: "#fff",
    },
    ".ql-snow .ql-stroke": {
      stroke: "#fff",
    },
    ".ql-snow .ql-picker": {
      color: "#fff",
    },
  };
 

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(8, 1fr)"}}>
      <Nav style={{gridColumn: "1"}}/>
      <div
        style={{
          gridColumn: "2/6",
          padding: "1em",
          margin: "1em"
        }}
      >
        <input
          type="text"
          placeholder="&#x1F50E;&#xFE0E; Search"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />

        <h1>Explore</h1>
        <div
          style={{
            width: "100%",
            paddingLeft: "20px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "20px",
            maxHeight: "80vh",
            overflowY: "auto",
            overflowX: "hidden",
            
          }}
        >
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              style={{
                boxSizing: "border-box",
                border: "1px solid #ccc",
                padding: "0",
                margin: "0",
                borderRadius: "8px",
                cursor: "pointer",
                height: "200px",
                width: "100%",
              }}
              onClick={() => handleItemClick(item)}
            >
              <h2>{item.Title}</h2>
              <RichTextComponent richTextString={item.content} />
              <button onClick={(event) => handleDelete(item.id, event)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
  <div style={{ display: "grid", gridColumn: "6/9"}}>
  {/* <h1>Edit</h1> */}
  {selectedItem && (
      <div style={{ 
          display: "grid",
          gridTemplateColumns: "repeat(autoFill, 1fr)",
          gridTemplateRows: "repeat(8, 1fr)", 
          width:'100%', 
          marginRight: "20px" 
        }}>
        {galleryTags.map((item) => (
          <div
            key={item.id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              margin: "10px",
              borderRadius: "8px",
              cursor: "pointer",
              height: "30px",
              width: "30px",
              justifySelf: "center",
              gridRow: "1",
              gap: "0"
              
            }}
            onClick={() => setSelectedTag(item)}
          >
            <h2 style={{margin: 0, fontSize: "0.5em", padding: 0}}>{item.name}</h2>
            <svg style={{xmlns: "http://www.w3.org/2000/svg", width: '20px', height: '20px'}}>
              <image className='icon' href={item.iconpath} alt="icon" style={{width: '20px', height: '20px', filter: "invert(1)"}} />
            </svg>
          </div>
        ))}
      <div style={{ gridColumn: "1/5", gridRow: "2/9",width:'100%', alignItems: "center", justifyContent: "center" }}>
          <ReactQuill
          theme="snow"
          modules={modules}
          formats={formats}
          value={quillContent}
          onChange={setQuillContent}
          style={{minHeight: "300px", height: "90%", width: "100%"}} />
      </div>
      <button style={{ zIndex: 9999,cursor: 'pointer', justifySelf: "center", gridColumn: "1/5", gridRow: "8" }} onClick={handleSave}>Save Changes</button>

    </div>
  )}
</div>
<style>
        {Object.entries(quillToolbarStyles).map(
          ([selector, rules]) =>
            `${selector} { ${Object.entries(rules)
              .map(([property, value]) => `${property}: ${value};`)
              .join(" ")} }`
        )}
      </style>
    </div>
  );
};


export default Gallery;
