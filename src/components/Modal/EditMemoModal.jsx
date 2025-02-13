import { useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  TextInput,
} from 'react-native';
import { useNoteActions } from '../../util/useNoteActions';

// FIXME:更新後、再レンダリングがなされるよう修正する

const EditMemoModal = ({ id, title, content, modalVisible, setModalVisible }) => {
  const [newTitle, setNewTitle] = useState(title);
  const [newContent, setNewContent] = useState(content);

  const { updateMemo } = useNoteActions();

  function changeMemo(id, newTitle, newContent) {
    updateMemo(id, newTitle, newContent);
    setModalVisible((visible) => !visible);
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Modal
        animationType='fade'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>タイトル</Text>
              <TextInput
                style={styles.inputTitle}
                value={newTitle}
                onChangeText={(title) => setNewTitle(title)}
              />
              <Text style={styles.modalText}>内容</Text>
              <TextInput
                style={styles.inputContent}
                value={newContent}
                onChangeText={(content) => setNewContent(content)}
                multiline
                textAlignVertical='top'
              />
              <View style={styles.buttonContainer}>
                <Pressable
                  onPress={() => setModalVisible(!modalVisible)}
                  style={styles.button}
                >
                  <Text style={styles.textStyle}>キャンセル</Text>
                </Pressable>
                <Pressable
                  onPress={() => changeMemo(id, newTitle, newContent)}
                  style={[styles.button, styles.buttonSave]}
                >
                  <Text style={styles.textStyle}>変更</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centeredView: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingTop: 100,
  },
  modalView: {
    width: '90%',
    height: 'auto',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonSave: {
    backgroundColor: '#2196F3',
  },
  modalText: {
    fontSize: 20,
  },
  inputTitle: {
    alignSelf: 'center',
    height: 40,
    width: 300,
    margin: 12,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  inputContent: {
    alignSelf: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    height: 100,
    width: 300,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    width: '90%',
  },
  button: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#ddd',
    width: '45%',
    alignItems: 'center',
  },
  textStyle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EditMemoModal;
