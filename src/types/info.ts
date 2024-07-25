/*
 * @Author: YourName
 * @Date: 2024-05-22 14:35:24
 * @LastEditTime: 2024-06-18 14:31:01
 * @LastEditors: YourName
 * @Description:
 * @FilePath: \video_community_web\src\types\info.ts
 * 版权声明
 */

//登录请求参数类型
export interface userinfoType {
  uid: number;
  nickname: string;
  avatarUrl: string;
  bgUrl: string;
  gender: number;
  description: string;
  state: number;
  videoCount: number;
  followsCount: number;
  fansCount: number;
  loveCount?: number;
  playCount: number;
}

//分区
export interface categoryType {
  id: String;
  name: String;
}

//子分区
export interface sclistType {
  descr: String;
  mcId: String;
  scId: String;
  scName: String;
  rcmTag: String[];
}

export interface categoryListType {
  mcId: String;
  mcName: String;
  scList: sclistType[];
}

//视频
export interface videoType {
  coverUrl: string;
  descr: string;
  duration: number;
  mcId: string;
  scId: string;
  status: number;
  tags: Array<string>;
  title: string;
  type: number;
  uid: number;
  uploadDate: string;
  vid: number;
  videoUrl: string;
}

export interface statsWithCurrentVideoType {
  bad: number;
  collect: number;
  comment: number;
  danmu: number;
  good: number;
  play: number;
  share: number;
  vid: number;
}

export interface ownStatsWithVideoType {
  collect: number;
  id: number;
  love: number;
  play: number;
  playTime: string;
  uid: number;
  unlove: number;
  vid: number;
}

export interface categoryInfoType {
  descr: string;
  mcId: string;
  mcName: string;
  rcmTag: string;
  scId: string;
  scName: string;
}

export interface videosType {
  category: categoryListType;
  stats: statsWithCurrentVideoType;
  info?: any;
  user: userinfoType;
  video: videoType;
}

//收藏
export interface collectionType {
  count: number;
  description: string;
  fid: number;
  title: string;
  type: number;
  uid: number;
  visible: number;
  cover?: string;
}

//弹幕
export interface danmuType {
  id: number;
  content: string;
  fontsize: number;
  mode: number;
  color: string;
  timePoint: string;
}

//发送弹幕
export interface sendDanmuType {
  id: number;
  time: number;
  text: string;
}

//chat
export interface chatResType {
  more: boolean;
  list: chatListType[];
}
export interface chatType {
  anotherId: number;
  id: number;
  isDeleted: number;
  latestTime: string;
  unread: number;
  userId: number;
}
export interface detailType {
  anotherDel: number;
  id: number;
  anotherId: number;
  time: string;
  content: string;
  userDel: number;
  userId: number;
  withdraw: number;
}
export interface chatListType {
  chat: chatType;
  detail: {
    more: boolean;
    list: detailType[];
  };
  user: userinfoType;
}
// export interface msgChatDataType {
//   data: object;
//   type: string;
//   time: string;
// }
export interface msgChatType {
  data: object;
  type: string;
  time: string;
}
