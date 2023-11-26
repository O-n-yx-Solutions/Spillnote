import React, { useState } from 'react';
import './Small.css'; // Import your CSS file with gallery styles
import "./Large.css";

const Gallery = () => {
  const [galleryItems, setGalleryItems] = useState([
    { id: 1, value: 'Item 1' },
    { id: 2, value: 'Item 2' },
    { id: 3, value: 'Item 3' },
  ]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortBy, setSortBy] = useState('default'); // 'default' or 'recentlyAdded'
  const [searchQuery, setSearchQuery] = useState('');
  const [editIndex, setEditIndex] = useState(null); // Track the index of the item being edited
  const [editedValue, setEditedValue] = useState(''); // Local state for the edited value

  const addGalleryItem = () => {
    const newItem = `Item ${galleryItems.length + 1}`;
    setGalleryItems([...galleryItems, { id: Date.now(), value: newItem }]);
  };

  const removeGalleryItem = (index) => {
    const updatedItems = [...galleryItems];
    updatedItems.splice(index, 1);
    setGalleryItems(updatedItems);
  };

  const sortGalleryItems = () => {
    const sortedItems = [...galleryItems];
    if (sortBy === 'recentlyAdded') {
      sortedItems.sort((a, b) => (sortOrder === 'asc' ? a.id - b.id : b.id - a.id));
    } else {
      sortedItems.sort((a, b) => (sortOrder === 'asc' ? a.value.localeCompare(b.value) : b.value.localeCompare(a.value)));
    }
    setGalleryItems(sortedItems);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleEdit = (index, value) => {
    setEditIndex(index);
    setEditedValue(value);
  };

  const handleSave = (index) => {
    setGalleryItems((prevItems) =>
      prevItems.map((item, i) => (i === index ? { ...item, value: editedValue } : item))
    );
    setEditIndex(null);
  };

  const handleCancel = () => {
    setEditIndex(null);
  };

  const handleInputChange = (e) => {
    setEditedValue(e.target.value);
  };

  const filteredItems = galleryItems.filter((item) =>
    item.value.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Search Gallery"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
      <div className="gallery-container">
        <div className="gallery">
          {filteredItems.map((item, index) => (
            <div key={item.id} className="gallery-item">
              {editIndex === index ? (
                <div>
                  <input
                    type="text"
                    value={editedValue}
                    onChange={handleInputChange}
                  />
                  <button onClick={() => handleSave(index)}>Save</button>
                  <button onClick={handleCancel}>Cancel</button>
                </div>
              ) : (
                <>
                  <div>{item.value}</div>
                  <button onClick={() => handleEdit(index, item.value)}>Edit</button>
                  <button onClick={() => removeGalleryItem(index)}>Remove</button>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
      <div>
        <label>
          Sort by:
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="default">Default</option>
            <option value="recentlyAdded">Recently Added</option>
          </select>
        </label>
      </div>
      <button onClick={addGalleryItem}>Add Gallery Item</button>
      <button onClick={sortGalleryItems}>Sort Gallery</button>
    </div>
  );
};

export default Gallery;
