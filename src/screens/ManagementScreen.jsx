import { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import MaterialButton from '../components/UI/MaterialButton';
import { useNoteActions } from '../util/useNoteActions';
import { Colors } from '../util/styles';

// 要件定義
// 左からMemoタイトル、削除ボタン、編集ボタンを配置する(component化する)
// 削除ボタンを押下したら、useNoteActionのdeleteMemoを使って削除する
// 編集ボタンを押下したら、画面遷移する👉MemoScreenの編集画面と統合する

const ManagementScreen = () => {
  const [memos, setMemos] = useState([]);
  const { readMemo, deleteMemo } = useNoteActions();

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
                onPress={() => console.log('編集機能は開発中です。')}
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
    backgroundColor: '#F8F8F8',
  },
  mainTitle: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    fontSize: 26,
    fontWeight: '600',
    color: '#000',
  },
  memoCountCard: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 30,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    alignSelf: 'center',
    width: '80%',
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 16,
    color: '#000',
    marginBottom: 6,
  },
  infoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  infoCount: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.systemBlue,
  },
  listContainer: {
    paddingHorizontal: 16,
  },
  memoCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  memoTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    marginBottom: 6,
  },
  memoContent: {
    fontSize: 14,
    color: '#444',
    marginBottom: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});

export default ManagementScreen;
