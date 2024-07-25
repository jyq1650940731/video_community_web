/*
 * @Author: YourName
 * @Date: 2024-06-17 11:36:12
 * @LastEditTime: 2024-06-17 23:56:31
 * @LastEditors: YourName
 * @Description:
 * @FilePath: \video_community_web\src\api\message.ts
 * 版权声明
 */
import type { responseData } from '@/types/api';
import request from '@/utils/request';
import { formatDate } from './../utils/date';

enum API {
  CREATE_CHAT_URL = '/msg/chat/create',
  RECENT_LIST_URL = '/msg/chat/recent-list',
  DELETE_CHAT_URL = '/msg/chat/delete',
  UPDATE_ONLINE_URL = '/msg/chat/online',
  UPDATE_OUTLINE_URL = '/msg/chat/outline',
  MORE_CHAT_DETAILS_URL = '/msg/chat-detailed/get-more',
  DEL_DETAIL_URL = '/msg/chat-detailed/delete',
  CLEAR_UNREAD_URL = '/msg-unread/all',
  MSG_UNREAD_URL = '/msg-unread/clear',
}

/**
 * 新建一个聊天，与其他用户首次聊天时调用
 * @param uid  对方用户ID
 * @return  CustomResponse对象 message可能值："新创建"/"已存在"/"未知用户"
 */
export const createChat = (params: any) =>
  request<any, responseData>({
    url: API.CREATE_CHAT_URL + `/${params}`,
    method: 'get',
  });

/**
 * 获取用户最近的聊天列表
 * @param offset    分页偏移量（前端查询了多少个聊天）
 * @return  CustomResponse对象 包含带用户信息和最近一条消息的聊天列表以及是否还有更多数据
 */
export const getRecentList = (params: any) =>
  request<any, responseData>({
    url: API.RECENT_LIST_URL,
    method: 'get',
    params,
  });
/**
 * 移除聊天
 * @param uid  对方用户ID
 * @return  CustomResponse对象
 */
export const deleteChat = (uid: number) =>
  request<any, responseData>({
    url: API.DELETE_CHAT_URL + `/${uid}`,
    method: 'get',
  });
/**
 * 切换窗口时 更新在线状态以及清除未读
 * @param from  对方UID
 */
export const updateWhisperOnline = (params: any) =>
  request<any, responseData>({
    url: API.UPDATE_ONLINE_URL,
    method: 'get',
    params,
  });
/**
 * 切换窗口时 更新为离开状态 （该接口要放开，无需验证token，防止token过期导致用户一直在线）
 * @param from  对方UID
 */
export const updateWhisperOutline = (params: any) =>
  request<any, responseData>({
    url: API.UPDATE_OUTLINE_URL,
    method: 'get',
    params,
  });

/**
 * 获取更多历史消息记录
 * @param uid   聊天对象的UID
 * @param offset    偏移量，即已经获取过的消息数量，从哪条开始获取更多
 * @return  CustomResponse对象，包含更多消息记录的map
 */
export const getMoreChatDetails = (params: any) =>
  request<any, responseData>({
    url: API.MORE_CHAT_DETAILS_URL,
    method: 'get',
    params,
  });

/**
 * 删除消息
 * @param id    消息ID
 * @return  CustomResponse对象
 */
export const delDetail = (FormData: FormData) =>
  request<any, responseData>({
    url: API.DEL_DETAIL_URL,
    method: 'post',
    data: FormData,
  });

/**
 * 获取当前用户全部消息未读数
 * @return
 */
export const getMsgUnread = () =>
  request<any, responseData>({
    url: API.CLEAR_UNREAD_URL,
    method: 'get',
  });

/**
 * 清除某一列的未读消息提示
 * @param column    msg_unread表列名 "reply"/"at"/"love"/"system"/"whisper"/"dynamic"
 */
export const clearUnread = (formData: FormData) =>
  request<any, responseData>({
    url: API.MSG_UNREAD_URL,
    method: 'post',
    data: formData,
  });
