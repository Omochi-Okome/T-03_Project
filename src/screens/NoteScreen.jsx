import { useEffect, useState } from 'react';
import {
  Keyboard,
  View,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import MaterialButton from '../components/UI/MaterialButton';
import { useNoteActions } from '../util/useNoteActions';

// TODO:Focus状態で、キーボードをオフにできる「完了」ボタンを表示できるよう修正する

const NoteScreen = ({ navigation }) => {
  const [input, setInput] = useState('');

  const { resetMemo } = useNoteActions();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <MaterialButton
          style={styles.resetButton}
          onPress={() => resetMemo(setInput)}
          iconName='autorenew'
          iconSize={32}
          iconColor='black'
        />
      ),
    });
  }, [navigation]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <TextInput
          style={styles.textinput}
          onChangeText={(text) => setInput(text)}
          value={input}
          multiline
          placeholder='入力...'
          returnKeyLabel='改行'
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
