import { useEffect, useState } from 'react';
import { Keyboard, StyleSheet, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import MaterialButton from '../components/UI/MaterialButton';
import EditMemoModal from '../components/Modal/EditMemoModal';
import { useNoteActions } from '../util/useNoteActions';

// FIXME: MemoScreenにもリセットボタンを付与する。

const MemoScreen = ({ id, title, content }) => {
  const [memo, setMemo] = useState(content);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const { deleteMemo } = useNoteActions();

  const editMemo = () => {
    setModalVisible((visible) => !visible);
  };

  const deleteData = async (id) => {
    deleteMemo(id);
  };

  useEffect(() => {
    setMemo(content);
  }, [content]);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerRight: () => (
        <>
          <MaterialButton
            iconName='delete'
            iconSize={32}
            iconColor='black'
            onPress={() => deleteData(id)}
          />
          <MaterialButton
            iconName='edit'
            iconSize={32}
            iconColor='black'
            onPress={() => editMemo()}
          />
        </>
      ),
    });
  }, [navigation]);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View>
          <EditMemoModal
            id={id}
            title={title}
            content={content}
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
          />
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.textInputContainer}>
              <TextInput
                style={styles.textinput}
                onChangeText={(memo) => setMemo(memo)}
                value={memo}
                multiline
                placeholder='入力...'
                returnKeyLabel='改行'
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  textInputContainer: {
    margin: 10,
  },
  textinput: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    marginTop: 22,
  },
});

export default MemoScreen;
