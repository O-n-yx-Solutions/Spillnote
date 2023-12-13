import React from 'react';
import { SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import QuillEditor, { QuillToolbar } from 'react-native-cn-quill';
export default function App() {
  const _editor = React.createRef();

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar style="auto" />
      <QuillEditor
        style={styles.editor}
        ref={_editor}
        initialHtml="<h1>Write Here!</h1>"
      />
      <QuillToolbar editor={_editor} options="full" theme="dark" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    alignSelf: 'center',
    paddingVertical: 10,
  },
  root: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: 'rgb(48, 48, 88)',
  },
  editor: {
    flex: 1,
    backgroundColor: 'white',
  },
});