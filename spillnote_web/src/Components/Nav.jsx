import React, { useState } from "react";
import PopoutHandler from "./TagCreator";
const navigationData = [
  {
    id: 1,
    title: "Root Tag 1",
    children: [
      { id: 11, title: "Tag A", argumetns: { Tag: "TagA" } },
      { id: 12, title: "Tag B", argumetns: { Tag: "TagB" } },
      { id: 13, title: "Tag C", argumetns: { Tag: "TagC" } },
    ],
  },
  {
    id: 2,
    title: "Section 2",
    children: [
      { id: 21, title: "Tag A", argumetns: { Tag: "TagA" } },
      { id: 22, title: "Tag B", argumetns: { Tag: "TagA" } },
    ],
  },
];
//this will be converted to dynamically load tags based off how tag system is built.

const Nav = () => {
  const [expanded, setExpanded] = useState({});

  const toggleExpand = (id) => {
    setExpanded((prevState) => ({ ...prevState, [id]: !prevState[id] }));
  };

  return (
    <div className="navbar">
      <div className="header">
        <img src="/Logo.svg" alt="Logo" />
        <div className="title">Spillnote</div>
        <PopoutHandler />
        <div className="settings-wheel">⚙️</div>
      </div>

      <ul className="dynamic-list">
        {navigationData.map((section) => (
          <li key={section.id}>
            <div
              className={`section-title ${
                expanded[section.id] ? "expanded" : ""
              }`}
              onClick={() => toggleExpand(section.id)}
            >
              {section.title}
            </div>
            {expanded[section.id] && (
              <ul className="child-list">
                {section.children.map((child) => (
                  <li key={child.id}>{child.title}</li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
      <div className="statics">
        <ul>
          <li>Recent</li>
          <li>Favorites</li>
        </ul>
      </div>
    </div>
  );
};

export default Nav;
