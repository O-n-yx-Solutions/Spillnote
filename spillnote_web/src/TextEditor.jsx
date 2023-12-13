import React, { useState } from "react";
import "quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import Nav from "./Components/Nav";
import "./Small.css";
import { handleNew } from "./util";
import { useAuth } from "./firebase";
import Creator from "./Components/Create";
import { useNavigate } from "react-router-dom"

const TextEditor = () => {
  const [editorContent, setEditorContent] = useState("");
  const [quillContent, setQuillContent] = useState("");
  const [qTitle, setQTitle] = useState(""); 

  const handleTitleChange = (event) => {
    const titleValue = event.target.value;
    setQTitle(titleValue);
  };

  const currentUser = useAuth();
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
    "[data-placeholder]":
    {
      color: "#fff",
      stroke: '#fff',
    }
  };

  const navigate = useNavigate();

  const handleSubmit = () => {
    
    console.log("Content submitted:", editorContent);
    
    handleNew(currentUser.email,qTitle, quillContent )
    navigate("/");
    
  };
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(8, 1fr)", gridTemplateRows: "repeat(10, 1fr)"}}>
      <Nav style={{}}/>
      <h1 style={{ textAlign: "center", padding: "1em", gridColumn: "2/9", gridRow: "1/4"}}>Create New Note</h1>
     <input type="text" onChange={handleTitleChange} placeholder="Title" style={{gridColumn: "4/7", gridRow: "3"}}/>
      <div style={{ display: "block",  justifyContent: "center", padding: "1em", gridColumn: "3/8", gridRow: "4/11"}}>
        <ReactQuill 
          id="reactquill"
          theme="snow"
          modules={modules}
          formats={formats}
          placeholder="write your content ..."
          onChange={setQuillContent}
          style={{ height: "90%" }}
        ></ReactQuill>
        <button onClick={handleSubmit} style={{position: "relative", zIndex: 11, justifySelf:"center"}}>Submit</button>
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

export default TextEditor;
