import type { categoryType } from '@/types/info';

//投稿类型
export interface uploadType {
  coverURL: String;
  title: String;
  category: categoryType[];
  tags?: [];
  descr: String;
  type?: String;
}
