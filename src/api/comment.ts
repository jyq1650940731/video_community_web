/*
 * @Author: YourName
 * @Date: 2024-06-03 15:58:21
 * @LastEditTime: 2024-06-03 17:29:17
 * @LastEditors: YourName
 * @Description:
 * @FilePath: \video_community_web\src\api\comment.ts
 * 版权声明
 */
import request from '@/utils/request';
import type {
  addCommentData,
  cidData,
  commentTreeData,
  responseData,
} from '@/types/api';

enum API {
  COMMENT_TREE_URL = '/comment/get',
  COMMENT_MORE_URL = '/comment/reply/getMore',
  COMMENT_DEL_URL = '/comment/delete',
  COMMENT_ADD_URL = '/comment/add',
}

/**
 * 获取评论树列表，每次查十条
 * @param vid   对应视频ID
 * @param offset 分页偏移量（已经获取到的评论树的数量）
 * @param type  排序类型 1 按热度排序 2 按时间排序
 * @return  评论树列表
 */

export const getCommentTreeByVid = (params: commentTreeData) =>
  request<any, responseData>({
    url: API.COMMENT_TREE_URL,
    method: 'get',
    params,
  });

/**
 * 展开更多回复评论
 * @param id 根评论id
 * @return 完整的一棵包含全部评论的评论树
 */

export const getMoreCommentById = (params: cidData) =>
  request<any, responseData>({
    url: API.COMMENT_MORE_URL,
    method: 'get',
    params,
  });

/**
 * 发表评论
 * @param vid   视频id
 * @param rootId    根评论id
 * @param parentId  被回复评论id
 * @param toUserId  被回复者uid
 * @param content   评论内容
 * @return  响应对象
 */
export const addComment = (data: addCommentData) =>
  request<any, responseData>({
    url: API.COMMENT_ADD_URL,
    method: 'post',
    data,
  });

/**
 * 删除评论
 * @param id 评论id
 * @return  响应对象
 */
export const delComment = (data: cidData) =>
  request<any, responseData>({
    url: API.COMMENT_DEL_URL,
    method: 'post',
    data,
  });
