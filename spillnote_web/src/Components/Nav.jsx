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
        <div id="img-title">
          <img src="/Logo.svg" alt="Logo" id="logo" />
          <div className="title">Spillnote</div>
        </div>
        <div id="account">
          <a id="myaccount-link" href="?action=acct_page">
            My Account
          </a>
          <a id="myaccount-link" href="?action=reg_page">
            Register
          </a>
          <a id="return-home" href="?action=default">
            Return to Home Page
          </a>
          <a id="settings-link" href="?action=settings_page">
            Settings
          </a>
        </div>
      </div>

      <ul className="dynamic-list">
        <li>
          <a id="myaccount-link" href="?action=explore_link">
            Recent
          </a>
        </li>
        <li>
          <a id="myaccount-link" href="?action=explore_link">
            Favorites
          </a>
        </li>
        {navigationData.map((section) => (
          <li key={section.id}>
            <div
              className={`section-title ${
                expanded[section.id] ? "expanded" : ""
              }`}
              onClick={() => toggleExpand(section.id)}
            >
              <a href="#">{section.title}</a>
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
        <PopoutHandler />
      </ul>
      <div className="statics">
        <ul></ul>
      </div>
    </div>
  );
};

export default Nav;
