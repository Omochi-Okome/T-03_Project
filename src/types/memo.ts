export type Memo = {
  id: string;
  title: string;
  content: string;
};

export type MemoList = Memo[];

type Id = 'title' | 'content';
type Title = 'id' | 'content';
type Content = 'id' | 'title';
type TitleAndContent = 'id';

export type MemoId = Omit<Memo, Id>;
export type MemoTitle = Omit<Memo, Title>;
export type MemoContent = Omit<Memo, Content>;
export type MemoTitleAndContent = Omit<Memo, TitleAndContent>;
