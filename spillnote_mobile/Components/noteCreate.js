import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

const RichTextEditor = () => {
  const [text, setText] = useState('');
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);

  const handleBold = () => {
    setIsBold(!isBold);
  };

  const handleItalic = () => {
    setIsItalic(!isItalic);
  };

  const handleUnderline = () => {
    setIsUnderline(!isUnderline);
  };

  return (
    <View>
      <TextInput
        multiline
        value={text}
        onChangeText={setText}
        style={[
          styles.editor,
          isBold && styles.boldText,
          isItalic && styles.italicText,
          isUnderline && styles.underlineText,
        ]}
      />
      <View style={styles.formattingBar}>
        <TouchableOpacity onPress={handleBold}>
          <Text>B</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleItalic}>
          <Text>I</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleUnderline}>
          <Text>U</Text>
        </TouchableOpacity>
        {/* Add more formatting options as needed */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  editor: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    minHeight: 150,
  },
  boldText: {
    fontWeight: 'bold',
  },
  italicText: {
    fontStyle: 'italic',
  },
  underlineText: {
    textDecorationLine: 'underline',
  },
  formattingBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
});

export default RichTextEditor;
