import { useEffect, useReducer } from 'react';
import {
  Alert,
  Keyboard,
  View,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import inputTextReducer from '../store/TextInput';
import MaterialButton from '../components/UI/MaterialButton';

const NoteScreen = ({ navigation, content }) => {
  const [state, dispatch] = useReducer(inputTextReducer, { text: content });

  useEffect(() => {
    if (content) {
      dispatch({ type: 'enter', text: content });
    }
  }, [content]);

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
          dispatch({ type: 'reset', text: '' });
        },
      },
    ]);
  };

  const updateText = (input) => {
    dispatch({ type: 'enter', text: input });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <TextInput
          style={styles.textinput}
          onChangeText={(text) => updateText(text)}
          value={state.text}
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
