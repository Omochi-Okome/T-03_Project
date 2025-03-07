import { useEffect, useState } from 'react';
import {
  Alert,
  Keyboard,
  View,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import MaterialButton from '../components/UI/MaterialButton';

// FIXME:Focus状態で、キーボードをオフにできる「完了」ボタンを表示できるよう修正する

const NoteScreen = ({ navigation }) => {
  const [input, setInput] = useState('');

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <MaterialButton
          style={styles.resetButton}
          onPress={resetText}
          iconName='delete'
          iconSize={32}
          iconColor='black'
        />
      ),
    });
  }, [navigation, resetText]);

  const resetText = () => {
    Alert.alert('リセット', 'メモをリセットしますか？', [
      {
        text: 'キャンセル',
        style: 'cancel',
      },
      {
        text: 'リセット',
        style: 'destructive',
        onPress: () => {
          setInput('');
        },
      },
    ]);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <TextInput
          style={styles.textinput}
          onChangeText={(text) => setInput(text)}
          value={input}
          // ref={input}
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
