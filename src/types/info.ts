/*
 * @Author: YourName
 * @Date: 2024-05-22 09:40:57
 * @LastEditTime: 2024-05-26 14:02:23
 * @LastEditors: YourName
 * @Description:
 * @FilePath: \video_community_web\src\types\info.ts
 * 版权声明
 */
//登录请求参数类型
export interface userinfoType {
  uid?: Number;
  nickname?: String;
  avatarUrl?: String;
  bgUrl?: String;
  gender?: Number;
  description?: String;
  state?: Number;
  videoCount?: Number;
  followsCount?: Number;
  fansCount?: Number;
  loveCount?: Number;
  playCount?: Number;
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
  mcId?: String;
  mcName?: String;
  scList?: sclistType[];
}
