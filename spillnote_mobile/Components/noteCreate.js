//documentation for source used: https://www.npmjs.com/package/react-native-cn-quill?activeTab=readme

import React, { useRef } from 'react';
import { SafeAreaView, StyleSheet, StatusBar, TouchableOpacity, Text, Alert } from 'react-native';
import QuillEditor, { QuillToolbar } from 'react-native-cn-quill';

export default function App() {
  const editorRef = useRef();
  const deltaToHtml = (delta) => {
    return delta.ops
      .map((op) => {
        if (typeof op.insert === 'string') {
          let text = op.insert;

          if (op.attributes) {
            if (op.attributes.bold) {
              text = `<strong>${text}</strong>`;
            }
            if (op.attributes.italic) {
              text = `<em>${text}</em>`;
            }
            if (op.attributes.underline) {
              text = `<u>${text}</u>`;
            }
          }

          return text;
        }

        return '';
      })
      .join('');
  };
  const handleGetContent = async () => {
    try {
      const delta = await editorRef.current.getContents();
      console.log(deltaToHtml(delta)) ;
    } catch (error) {
      console.error('Error getting content:', error.message);
    }
  };

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar style="auto" />
      <QuillEditor
        style={styles.editor}
        ref={editorRef}
        initialHtml="<h1>Write Here!</h1>"
      />
      <QuillToolbar editor={editorRef} options="full" theme="dark" />
      <TouchableOpacity style={styles.button} onPress={handleGetContent}>
        <Text>Get Content</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: 'rgb(48, 48, 88)',
  },
  editor: {
    flex: 1,
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: '#3f4966',
    padding: 10,
    margin: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
});
