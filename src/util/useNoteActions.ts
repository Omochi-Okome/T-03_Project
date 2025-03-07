import { useState } from 'react';
import {
  equalTo,
  get,
  getDatabase,
  onValue,
  orderByChild,
  push,
  query,
  update,
  ref,
  remove,
  set,
} from 'firebase/database';
import app from '../../firebase';
import { Alert } from 'react-native';
import { showMessage } from 'react-native-flash-message';

export const useNoteActions = (onChange: Function) => {
  const [loading, setLoading] = useState(false);
  const db = getDatabase(app);
  const memoRef = ref(db, 'memos');

  // Memo上に同じタイトルがあるかどうかをチェックする関数
  const checkTitle = async (title: string, currentId?: string) => {
    const titleQuery = query(memoRef, orderByChild('title'), equalTo(title));
    try {
      const titleSnapshot = await get(titleQuery);
      if (titleSnapshot.exists()) {
        const data = titleSnapshot.val();
        const keys = Object.keys(data);

        if (currentId) {
          if (keys.some((key) => key !== currentId)) {
            return true;
          } else {
            return false;
          }
        }
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const readMemo = (callback) => {
    const db = getDatabase(app);
    const memoRef = ref(db, 'memos');
    const unsubscribe = onValue(memoRef, (snapshot) => {
      const data = snapshot.val();
      console.log('onValueによるリアルタイムデータ更新:', data);

      if (data) {
        const getDrawers = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        console.log('getDrawers:', getDrawers);
        callback(getDrawers);
      } else {
        callback([]);
      }
    });

    return unsubscribe;
  };

  const addMemo = async (title: string, content: string) => {
    setLoading(true);
    const newMemoRef = push(memoRef);
    try {
      const exist = await checkTitle(title);
      if (exist) {
        Alert.alert('エラー', '同じタイトルのメモがすでに存在します');
        return;
      }
      await set(newMemoRef, { title, content });
      showMessage({
        message: '保存に成功しました！',
        type: 'success',
      });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      onChange && onChange();
      setLoading(false);
    }
  };

  const deleteMemo = (id: string) => {
    const idRef = ref(db, `/memos/${id}`);
    return new Promise<boolean>((resolve) => {
      Alert.alert('削除', 'メモを削除しますか？', [
        {
          text: 'キャンセル',
          style: 'cancel',
          onPress: () => {
            resolve(false);
          },
        },
        {
          text: '削除',
          style: 'destructive',
          onPress: async () => {
            try {
              await remove(idRef);
              showMessage({
                message: '削除に成功しました',
                type: 'success',
              });
              onChange && onChange();
              resolve(true);
            } catch (error) {
              showMessage({
                message: 'エラーが発生しました',
                type: 'danger',
              });
            }
          },
        },
      ]);
    });
  };

  const updateMemo = async (id: string, newTitle: string, newContent: string) => {
    const idRef = ref(db, `/memos/${id}`);

    try {
      const exist = await checkTitle(newTitle, id);
      if (exist) {
        Alert.alert('エラー', '同じタイトルのメモがすでに存在します');
        return;
      }
      await update(idRef, {
        title: newTitle,
        content: newContent,
      });
      onChange && onChange();
      showMessage({
        message: '更新に成功しました！',
        type: 'success',
      });
    } catch (error) {
      console.log('Error updating data:', error);
      showMessage({
        message: 'エラーが発生しました',
        type: 'danger',
      });
    }
  };
  const resetMemo = async (setInput: any) => {
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
  return { readMemo, addMemo, deleteMemo, updateMemo, resetMemo };
};
