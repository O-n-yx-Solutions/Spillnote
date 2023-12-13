// import React, { useState } from "react";

// const ScrollableSelectList = ({ items, onSelect }) => {
//   const [selectedItem, setSelectedItem] = useState(null);

//   const handleSelect = (item) => {
//     setSelectedItem(item);
//     console.log(item);
//     onSelect(item);
//   };

//   return (
//     <div className="scrollable-select-list">
//       <ul>
//         {items.map((item) => (
//           <li
//             key={item.id}
//             className={selectedItem === item ? "selected" : ""}
//             //onClick={() => handleSelect(item)}
//             onClick={() => console.log("working")}
//           ></li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ScrollableSelectList;
