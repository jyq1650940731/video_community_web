/*
 * @Author: YourName
 * @Date: 2024-06-04 11:07:59
 * @LastEditTime: 2024-06-04 11:19:59
 * @LastEditors: YourName
 * @Description:
 * @FilePath: \video_community_web\src\api\search.ts
 * 版权声明
 */
import request from '@/utils/request';
import type { keywordData, responseData } from '@/types/api';

enum API {
  HOTSEARCH_URL = '/search/hot/get',
  ADD_SEARCH_WORD_URL = '/search/word/add',
  GET_SEARCH_WORD = '/search/word/get',
  GET_COUNT = '/search/count',
  GET_MATCH_VIDEO = '/search/video/only-pass',
  GET_MATCH_USER = '/search/user',
}

/**
 * 获取热搜词条
 * @return  热搜列表
 */
export const getHotSearch = () =>
  request<any, responseData>({
    url: API.HOTSEARCH_URL,
    method: 'get',
  });

/**
 * 添加搜索词或者给该搜索词热度加一
 * @param keyword   搜索词
 * @return  返回格式化后的搜索词，有可能为null
 */
export const addSearchWord = (formData: FormData) =>
  request<any, responseData>({
    url: API.ADD_SEARCH_WORD_URL,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    method: 'post',
    data: formData,
  });

/**
 * 根据输入内容获取相关搜索推荐词
 * @param keyword   关键词
 * @return  包含推荐搜索词的列表
 */
export const getSearchWord = (params: keywordData) =>
  request<any, responseData>({
    url: API.GET_SEARCH_WORD,
    method: 'get',
    params,
  });

/**
 * 获取各种类型相关数据数量  视频&用户
 * @param keyword   关键词
 * @return  包含视频数量和用户数量的顺序列表
 */
export const getCount = (params: keywordData) =>
  request<any, responseData>({
    url: API.GET_COUNT,
    method: 'get',
    params,
  });

/**
 * 搜索相关已过审视频
 * @param keyword   关键词
 * @param page  第几页
 * @return  视频列表
 * @throws UnsupportedEncodingException
 */
export const getMatchingVideo = (params: any) =>
  request<any, responseData>({
    url: API.GET_MATCH_VIDEO,
    method: 'get',
    params,
  });

export const getMatchingUser = (params: any) =>
  request<any, responseData>({
    url: API.GET_MATCH_USER,
    method: 'get',
    params,
  });
