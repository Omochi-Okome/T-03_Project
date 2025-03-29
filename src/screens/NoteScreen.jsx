import { useLayoutEffect, useState } from 'react';
import {
  Keyboard,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import { Colors } from '../util/styles';
import DoneButton from '../components/Button/DoneButton';
import ResetButton from '../components/Button/ResetButton';

// TODO:Focus状態で、キーボードをオフにできる「完了」ボタンを表示できるよう修正する

const NoteScreen = ({ navigation }) => {
  const [input, setInput] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <>
          {isFocused && <DoneButton />}
          <ResetButton setInput={setInput} />
        </>
      ),
    });
  }, [navigation, isFocused]);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView style={styles.container}>
        <TextInput
          style={styles.textinput}
          onChangeText={(text) => setInput(text)}
          value={input}
          multiline
          placeholder='入力...'
          returnKeyLabel='改行'
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white100,
  },
  textInputContainer: {
    flex: 0.8,
    margin: 10,
  },
  textinput: {
    margin: 10,
    fontSize: 22,
    fontWeight: 'bold',
  },
  resetButton: {
    paddingHorizontal: 10,
  },
});

export default NoteScreen;
