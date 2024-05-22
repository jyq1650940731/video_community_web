/*
 * @Author: YourName
 * @Date: 2024-05-22 09:40:57
 * @LastEditTime: 2024-05-22 09:51:18
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
