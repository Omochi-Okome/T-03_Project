import { StyleSheet, TextInput } from 'react-native';

export default function CustomTextInput({ value, onChangeText, placeholder, multiline = false }) {
  return (
    <TextInput
      style={[styles.input, multiline && styles.TextInput]}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      multiline={multiline}
      textAlignVertical={multiline ? 'top' : 'center'}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: 300,
    margin: 12,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  TextInput: {
    height: 120,
  },
});
