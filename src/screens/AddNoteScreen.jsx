import { useState } from 'react';
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
import GradientButton from '../components/UI/GradientButton';

const AddNoteScreen = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const { addMemo } = useNoteActions();

  const addData = (title, content) => {
    const result = addMemo(title, content);
    if (result) {
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
            onChangeText={(title) => setTitle(title)}
            placeholder='タイトルを入力...'
          />
          <Text style={styles.label}>内容</Text>
          <CustomTextInput
            value={content}
            onChangeText={(content) => setContent(content)}
            placeholder='内容を入力...'
            multiline
          />
        </View>
        <View style={styles.buttonContainer}>
          <GradientButton
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
    backgroundColor: 'white',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    alignSelf: 'flex-start',
  },
  label: {
    alignSelf: 'flex-start',
    fontSize: 20,
    color: 'black',
    margin: 20,
  },
  buttonContainer: {
    marginTop: 20,
    borderRadius: 10,
    overflow: 'hidden',
    alignSelf: 'center',
  },
});

export default AddNoteScreen;
