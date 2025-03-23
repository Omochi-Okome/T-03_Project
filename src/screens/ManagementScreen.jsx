import { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import MaterialButton from '../components/UI/MaterialButton';
import { useNoteActions } from '../util/useNoteActions';
import { Colors } from '../util/styles';

import { useNavigation } from '@react-navigation/native';

// 要件定義
// 左からMemoタイトル、削除ボタン、編集ボタンを配置する(component化する)
// 削除ボタンを押下したら、useNoteActionのdeleteMemoを使って削除する
// 編集ボタンを押下したら、画面遷移する👉MemoScreenの編集画面と統合する

// TODO:編集画面を追加する

const ManagementScreen = () => {
  const [memos, setMemos] = useState([]);
  const { readMemo, deleteMemo } = useNoteActions();
  const navigation = useNavigation();

  useEffect(() => {
    readMemo((callback) => {
      setMemos(callback);
    });
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.mainTitle}>Management</Text>
      <View style={styles.memoCountCard}>
        <Text style={styles.infoTitle}>Memo数</Text>
        <Text style={styles.infoCount}>{Object.keys(memos).length}</Text>
      </View>

      <View style={styles.listContainer}>
        {memos.map((memo) => (
          <View
            key={memo.id}
            style={styles.memoCard}
          >
            <Text style={styles.memoTitle}>{memo.title}</Text>
            <Text style={styles.memoContent}>{memo.content}</Text>
            <View style={styles.buttonContainer}>
              <MaterialButton
                iconName='delete'
                iconSize={32}
                iconColor={Colors.systemBlue}
                onPress={() => deleteMemo(memo.id)}
              />
              <MaterialButton
                iconName='edit'
                iconSize={28}
                iconColor={Colors.systemBlue}
                onPress={() =>
                  navigation.navigate('EditMemo', {
                    id: memo.id,
                    title: memo.title,
                    content: memo.content,
                  })
                }
              />
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.systemBackground,
  },
  mainTitle: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    fontSize: 26,
    fontWeight: '600',
    color: Colors.label,
  },
  memoCountCard: {
    justifyContent: 'center',
    backgroundColor: Colors.white100,
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 30,
    shadowColor: Colors.black900,
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    alignSelf: 'center',
    width: '30%',
    aspectRatio: 1,
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 14,
    color: Colors.label,
    marginBottom: 6,
  },
  infoContainer: {
    marginBottom: 20,
  },
  infoCount: {
    fontSize: 30,
    fontWeight: '700',
    color: Colors.systemBlue,
    textAlign: 'center',
  },
  listContainer: {
    paddingHorizontal: 16,
  },
  memoCard: {
    backgroundColor: Colors.white100,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: Colors.label,
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  memoTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.label,
    marginBottom: 6,
  },
  memoContent: {
    fontSize: 14,
    color: Colors.secondaryLabel,
    marginBottom: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});

export default ManagementScreen;
