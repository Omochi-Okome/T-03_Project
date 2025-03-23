import React, { useState } from 'react';
import {
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useNoteActions } from '../util/useNoteActions';
import CustomTextInput from '../components/CustomTextInput';
import CustomButton from '../components/UI/CustomButton';

import { Colors } from '../util/styles';

const AddNoteScreen = () => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const { addMemo } = useNoteActions();

  const addData = async (title: string, content: string) => {
    const result = addMemo(title, content);
    if (await result) {
      setTitle('');
      setContent('');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text style={styles.label}>タイトル</Text>
          <CustomTextInput
            value={title}
            onChangeText={setTitle}
            placeholder='タイトルを入力...'
          />
          <Text style={styles.label}>内容</Text>
          <CustomTextInput
            value={content}
            onChangeText={setContent}
            placeholder='内容を入力...'
            multiline
          />
        </View>
        <View style={styles.buttonContainer}>
          <CustomButton
            title='追加'
            onPress={() => addData(title, content)}
          />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.systemBackground,
    padding: 16,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.label,
    textAlign: 'center',
    marginVertical: 8,
    marginHorizontal: 8,
  },
  buttonContainer: {
    padding: 16,
    alignItems: 'center',
  },
});

export default AddNoteScreen;
