//返回格式
import { cancelCollect } from './../api/collection';
export interface responseData {
  code?: number;
  result?: any;
  success?: boolean;
  message?: string;
}

export interface uidData {
  uid: number;
}
export interface vidData {
  vid: number;
}
export interface fidData {
  fid: number;
}

export interface idData {
  id: number;
}

export interface vidsData {
  vids?: string[];
}

//用户信息
export interface addUserData {
  page?: Int16Array;
  pageSize?: Int16Array;
}

//添加用户信息
export interface addUserData {
  username?: string;
  email?: string;
  role?: string;
}

//修改用户信息
export interface updataUserData {
  id?: Int16Array;
  username?: string;
  email?: string;
  role?: string;
}

export interface isGoodData {
  vid?: number | string;
  isLove?: boolean;
  isSet?: boolean;
}

//分片
export interface ASKCHUNKData {
  hash?: string;
}

export interface uploadChunkData {
  currentChunk?: FormData;
  hash?: String;
  index?: Int16Array;
}

//收藏
export interface addCollectionkData {
  title?: string;
  desc?: string;
  visible?: number;
}
export interface collectionVideosData {
  fid?: number;
  rule?: number;
  page?: number;
  quantity?: number;
}
export interface isCollectionData {
  vid?: string;
  addArray?: string;
  removeArray?: string;
}

export interface cancelCollectData {
  vid: number;
  fid: number;
}

// video
export interface serVideoData {
  uid?: number;
  rule?: number;
  page?: number;
  quantity?: number;
}

//评论
export interface commentTreeData {
  vid: number;
  offset: number;
  type: number;
}
export interface addCommentData {
  vid: number;
  rootId: number;
  parentId: number;
  toUserId: number;
  content: string;
}
export interface cidData {
  id: number;
}

//热搜
export interface keywordData {
  keyword: string;
  page?: number;
}
