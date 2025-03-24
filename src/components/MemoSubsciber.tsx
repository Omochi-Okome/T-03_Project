// components/MemoSubscriber.tsx
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setMemos } from '../store/memoSlice';
import { useNoteActions } from '../util/useNoteActions';

const MemoSubscriber: React.FC = () => {
  const dispatch = useDispatch();
  const { readMemo } = useNoteActions();

  useEffect(() => {
    const unsubscribe = readMemo((memos) => {
      dispatch(setMemos(memos));
    });
    return () => unsubscribe();
  }, [dispatch, readMemo]);

  return null;
};

export default MemoSubscriber;
