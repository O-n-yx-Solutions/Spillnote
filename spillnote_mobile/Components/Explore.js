import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet } from 'react-native';

const GalleryApp = () => {
  const [galleryItems, setGalleryItems] = useState([
    { id: 1, value: 'Item 1' },
    { id: 2, value: 'Item 2' },
    { id: 3, value: 'Item 3' },
  ]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortBy, setSortBy] = useState('default');
  const [searchQuery, setSearchQuery] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [editedValue, setEditedValue] = useState('');

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

  const handleSearch = (text) => {
    setSearchQuery(text);
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

  const handleInputChange = (text) => {
    setEditedValue(text);
  };

  const filteredItems = galleryItems.filter((item) =>
    item.value.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search Gallery"
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <ScrollView style={styles.gallery}>
        {filteredItems.map((item, index) => (
          <View key={item.id} style={styles.galleryItem}>
            <View>
              {editIndex === index ? (
                <View>
                  <TextInput
                    style={styles.input}
                    value={editedValue}
                    onChangeText={handleInputChange}
                  />
                  <Button title="Save" onPress={() => handleSave(index)} />
                  <Button title="Cancel" onPress={handleCancel} />
                </View>
              ) : (
                <>
                  <Text>{item.value}</Text>
                </>
              )}
            </View>
            <View style={styles.galleryItemButtons}>
              <Button title="Edit" onPress={() => handleEdit(index, item.value)} />
              <Button title="Remove" onPress={() => removeGalleryItem(index)} />
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={styles.galleryControls}>
        <Button title="Add Gallery Item" onPress={addGalleryItem} />
        <Button title="Sort Gallery" onPress={sortGalleryItems} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 80,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 5,
  },
  gallery: {
    flex: 1,
  },
  galleryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    padding: 10,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  galleryItemButtons: {
    flexDirection: 'row',
  },
  galleryControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
});

export default GalleryApp;
