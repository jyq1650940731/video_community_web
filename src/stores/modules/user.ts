import { defineStore } from 'pinia';
import { ref, computed, type ComputedRef } from 'vue';
import type { loginForm } from '@/types/request';
import type { userinfoType } from '@/types/info';

import {
  login as loginApi,
  register as registerApi,
  logout,
  getUserinfo as getUserinfoApi,
} from '@/api/user';
import {
  getToken as getTokenApi,
  removeToken,
  setToken as setTokenApi,
} from '@/utils/token';

import { ElNotification } from 'element-plus';

export const useUserStore = defineStore('user', () => {
  //state
  const state = {
    token: ref(getTokenApi() as string),
    isLogin: ref(false),
    userinfo: reactive(<userinfoType>{}),
  };

  //getters
  const getToken = computed(() => {
    return state.token.value;
  });
  const getUserinfo = computed(() => {
    return state.userinfo;
  });
  const getIslogin = computed(() => {
    return state.isLogin.value;
  });

  const setUserinfo = (T?: userinfoType) => {
    state.userinfo.avatarUrl = T?.avatarUrl;
    state.userinfo.bgUrl = T?.bgUrl;
    state.userinfo.description = T?.description;
    state.userinfo.fansCount = T?.fansCount;
    state.userinfo.followsCount = T?.followsCount;
    state.userinfo.gender = T?.gender;
    state.userinfo.loveCount = T?.loveCount;
    state.userinfo.nickname = T?.nickname;
    state.userinfo.playCount = T?.playCount;
    state.userinfo.state = T?.state;
    state.userinfo.uid = T?.uid;
    state.userinfo.videoCount = T?.videoCount;
  };
  const setToken = (T: string) => {
    state.token.value = T;
    if (T.length == 0) removeToken();
    else setTokenApi(state.token.value);
  };
  const setIsLogin = (T: boolean) => {
    state.isLogin.value = T;
  };

  const login = async (userInfo: loginForm) => {
    const {
      result: { token, user: currentUser },
    } = await loginApi(userInfo);
    setToken(token);

    await handleUserinfo();
    ElNotification({
      message: '登录成功！',
      type: 'success',
    });
    return 'ok';
  };

  const register = async (userInfo: loginForm) => {
    await registerApi(userInfo);
    try {
      console.log('注册成功');
    } catch (e) {}
    return 'ok';
  };

  const userLogout = async () => {
    await logout();
    setUserinfo();
    setToken('');
    setIsLogin(false);
  };

  const handleUserinfo = async () => {
    const { result } = await getUserinfoApi();
    setIsLogin(true);
    setUserinfo(result);
  };

  return {
    ...state,
    login,
    register,
    userLogout,
    handleUserinfo,
  };
});
