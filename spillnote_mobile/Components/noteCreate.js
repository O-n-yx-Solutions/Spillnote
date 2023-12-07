import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import db from "../firebase";
// import { handleEdit, handleNew, handleDelete, handleQueryDelete } from '../util';

function NoteCreate() {
  useEffect(() => {}, []);
  return (
    <View style={styles.create}>
      <Text>Create Note</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  create: {
    flex: 1,
  },
});

export default NoteCreate;
