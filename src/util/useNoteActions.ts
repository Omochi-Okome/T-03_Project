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
import { Unsubscribe } from 'firebase/database';

// Types
import { MemoList } from '../types/memo';

export const useNoteActions = (onChange?: Function) => {
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

  // 禁止されているタイトルが使われていないかをチェックする関数
  const checkProhibitedTitle = async (title: string) => {
    const prohibitedWord = ['Home', 'AddScreen', 'Management'];

    if (prohibitedWord.includes(title)) {
      return false;
    } else {
      return true;
    }
  };

  const readMemo = (callback: (memos: MemoList) => void): Unsubscribe => {
    const db = getDatabase(app);
    const memoRef = ref(db, 'memos');
    const unsubscribe: Unsubscribe = onValue(memoRef, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        const getDrawers = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        console.log('データを取得中...');
        callback(getDrawers);
      } else {
        callback([]);
      }

      return unsubscribe;
    });

    return unsubscribe;
  };

  const addMemo = async (title: string, content: string): Promise<boolean> => {
    const allowed = await checkProhibitedTitle(title);

    if (!allowed) {
      Alert.alert('エラー', 'このタイトルは使用できません');
      return false;
    }

    try {
      const newMemoRef = push(memoRef);
      const exist = await checkTitle(title);
      if (exist) {
        Alert.alert('エラー', '同じタイトルのメモがすでに存在します');
        return false;
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
    const allowed = await checkProhibitedTitle(newTitle);

    // 禁止用語リストに該当したら処理中止
    if (!allowed) {
      Alert.alert('エラー', 'このタイトルは使用できません');
      return false;
    }

    try {
      console.log('updateMemoを実行~in useNoteActions.ts');
      const idRef = ref(db, `/memos/${id}`);
      const exist = await checkTitle(newTitle, id);
      if (exist) {
        Alert.alert('エラー', '同じタイトルのメモがすでに存在します');
        return;
      }
      await update(idRef, {
        title: newTitle,
        content: newContent,
      });
      // onChange && onChange();
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
