import { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialButton from '../components/UI/MaterialButton';
import { useNoteActions } from '../util/useNoteActions';

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
      <View style={styles.outlineContainer}>
        <LinearGradient
          colors={['#4158D0', '#C850C0', '#FFCC70']}
          start={{ x: 0.2, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.card}
        >
          <Text style={{ fontSize: 22 }}>Memo数</Text>
          <Text style={{ fontSize: 22 }}>{Object.keys(memos).length}</Text>
        </LinearGradient>
        {/* 以下,カードの使い道が見つからないので保留 */}
        {/* <LinearGradient
          colors={['#4158D0', '#C850C0', '#FFCC70']}
          start={{ x: 0.2, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.card}
        >
          <Text style={{ fontSize: 22 }}>Memo数</Text>
          <Text style={{ fontSize: 22 }}>{Object.keys(memos).length}</Text>
        </LinearGradient> */}
      </View>
      <View style={styles.listContainer}>
        {memos.map((memo) => (
          <LinearGradient
            colors={['#8BC6EC', '#9599E2']}
            start={{ x: 0.2, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.memoContainer}
          >
            background-color: #8BC6EC; background-image: linear-gradient(135deg, #8BC6EC 0%, #9599E2
            100%);
            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{memo.title}</Text>
            <Text style={{ fontSize: 10 }}>{memo.content}</Text>
            <View style={styles.buttonContainer}>
              <MaterialButton
                iconName='delete'
                iconSize={32}
                iconColor='black'
                onPress={() => deleteMemo(memo.id)}
              />
              <MaterialButton
                iconName='edit'
                iconSize={32}
                iconColor='black'
                onPress={() => console.log('編集機能は開発中です。')}
              />
            </View>
          </LinearGradient>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  outlineContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  mainTitle: {
    padding: 20,
    fontSize: 26,
    fontWeight: 'bold',
  },
  card: {
    justifyContent: 'space-between',
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: 'blue',
    borderRadius: 30,
    width: '40%',
    height: 90,
  },
  listContainer: {
    alignItems: 'center',
    margin: 10,
  },
  memoContainer: {
    justifyContent: 'space-between',
    marginVertical: 3,
    paddingVertical: 5,
    paddingHorizontal: 20,
    width: '100%',
    height: 200,
    borderRadius: 20,
    backgroundColor: '#8BC6EC',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  memoTitle: {
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default ManagementScreen;
