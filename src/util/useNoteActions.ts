import { useState } from 'react';
import {
  equalTo,
  get,
  getDatabase,
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

  const readMemo = async () => {
    const db = getDatabase(app);
    const dataRef = ref(db, '/notes');

    try {
      const snapshot = await get(dataRef);
      const data = snapshot.val();
      if (data) {
        const getDrawers = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        return getDrawers;
      } else {
        return [];
      }
    } catch (error) {
      console.error('データ取得できませんでした', error);
      return [];
    }
  };

  const addMemo = async (title: string, content: string) => {
    setLoading(true);
    const db = getDatabase(app);
    const notesRef = ref(db, 'notes');
    const newNoteRef = push(notesRef);
    const titleQuery = query(notesRef, orderByChild('title'), equalTo(title));

    try {
      const titleSnapshot = await get(titleQuery);
      if (titleSnapshot.exists()) {
        Alert.alert('エラー', '同じタイトルのメモがすでに存在します');
        return;
      }
      await set(newNoteRef, { title, content });
      onChange && onChange();
      showMessage({
        message: '保存に成功しました！',
        type: 'success',
      });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteMemo = (id: string) => {
    const db = getDatabase(app);
    const dataRef = ref(db, `/notes/${id}`);
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
              await remove(dataRef);
              showMessage({
                message: '削除に成功しました',
                type: 'success',
              });
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
    const db = getDatabase(app);
    const dataRef = ref(db, `/notes/${id}`);
    try {
      await update(dataRef, {
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

  return { readMemo, addMemo, deleteMemo, updateMemo };
};
