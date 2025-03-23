import { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNoteActions } from '../util/useNoteActions';
import CustomButton from '../components/UI/CustomButton';
import { Colors } from '../util/styles';
import { useNavigation, useRoute } from '@react-navigation/native';

// FIXME:変更後に編集ボタンを押した時、変更前のデータが表示されるバグ
// TODO:変更がない場合は保存ボタンを無効化する

type EditMemoScreenProps = {
  id: string;
  title: string;
  content: string;
};

const EditMemoScreen: React.FC<EditMemoScreenProps> = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { id, title, content } = route.params as EditMemoScreenProps;
  const [newTitle, setNewTitle] = useState<string>(title);
  const [newContent, setNewContent] = useState<string>(content);

  console.log('newTitle', title);
  console.log('newContent', content);

  const { updateMemo } = useNoteActions();

  function changeMemo(id: string, newTitle: string, newContent: string) {
    // titleとcontentの両方に変更がなければ実行しない
    if (title === newTitle && content === newContent) {
      return;
    }
    updateMemo(id, newTitle, newContent);
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoiding}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>Edit Memo</Text>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.titleInput}
              value={newTitle}
              placeholder='タイトルを入力'
              placeholderTextColor={Colors.systemGray}
              maxLength={50}
              returnKeyType='done'
              onChangeText={(text) => setNewTitle(text)}
            />
            <TextInput
              style={styles.contentInput}
              value={newContent}
              placeholder='内容を入力'
              placeholderTextColor={Colors.systemGray}
              multiline
              textAlignVertical='top'
              onChangeText={(text) => setNewContent(text)}
            />
          </View>
          <CustomButton
            title='保存'
            onPress={() => {
              changeMemo(id, newTitle, newContent);
              navigation.goBack();
            }}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  keyboardAvoiding: {
    flex: 1,
  },
  container: {
    padding: 16,
  },
  headerContainer: {
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black900,
  },
  inputContainer: {
    marginBottom: 20,
  },
  titleInput: {
    height: 44,
    borderColor: Colors.systemGray3,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: Colors.systemBackground,
    marginBottom: 12,
  },
  contentInput: {
    minHeight: 120,
    borderColor: Colors.systemGray3,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    backgroundColor: Colors.systemBackground,
  },
});

export default EditMemoScreen;
