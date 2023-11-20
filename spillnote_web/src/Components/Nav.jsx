import React, { useState } from "react";
import YourComponent from "./TagCreator";
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
        <img src="../public/Logo.svg" alt="Logo" />
        <div className="title">Spillnote</div>
        <YourComponent />
        <div className="settings-wheel">⚙️</div>
        <div id="img-title">
          <img src="../public/Logo.svg" alt="Logo" />
          <div className="title">Spillnote</div>
        </div>
        <div id="account">
          <div className="settings-wheel">
            <a href="?action=settings_page">⚙️</a>
          </div>
          <a id="myaccount-link" href="?action=acct_page">
            My Account
          </a>
          <a id="return-home" href="?action=default">
            Return to Home Page
          </a>
        </div>
      </div>

      <ul className="dynamic-list">
        <button className="add-tag-button">Add Tag</button>
        <li>Recent</li>
        <li>Favorites</li>
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
        <ul></ul>
      </div>
    </div>
  );
};

export default Nav;
