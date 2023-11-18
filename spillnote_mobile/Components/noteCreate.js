import React, { useEffect } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import db from '../firebase';
// import { handleEdit, handleNew, handleDelete, handleQueryDelete } from '../util';

function NoteCreate() {
    useEffect(() =>{
        
    }, []);
    return (
        <View>
            <Text>Create Note</Text>
        </View>
    );
  }
  
  export default NoteCreate;