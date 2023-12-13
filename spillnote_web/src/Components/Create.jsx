import React from "react";
import { useNavigate } from "react-router-dom";
const Creator = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    console.log("Clicked!");
    navigate("/text_editor");
  };
  return (
    <img
      src="/create.svg"
      alt="Create"
      style={{
        cursor: "pointer",
        width: "25vh",
        height: "25vh",
        fill: "#952541",
        position: "absolute",
        right: "0",
        bottom: "0",
      }}
      onClick={handleClick}
    />
  );
};

export default Creator;
