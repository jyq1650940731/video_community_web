import { defineStore } from 'pinia';
import { ref, computed, type ComputedRef } from 'vue';
import type { loginForm } from '@/types/request';
import type { statsWithCurrentVideoType, userinfoType } from '@/types/info';
import { useMessageStore } from './message';
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
  const state = reactive({
    token: getTokenApi() as string,
    isLogin: false,
    userinfo: {} as userinfoType,
    loginDialogVisible: false,
  });

  const attrs = reactive({
    currentVideoAttrs: {} as statsWithCurrentVideoType,
  });

  //getters
  const getToken = computed(() => {
    return state.token;
  });
  const getUserinfo = computed(() => {
    return state.userinfo;
  });
  const getIslogin = computed(() => {
    return state.isLogin;
  });

  const setLoginDialogVisible = (T: boolean) => {
    state.loginDialogVisible = T;
  };

  const setCurrentVideoAttrs = (T: statsWithCurrentVideoType) => {
    attrs.currentVideoAttrs = T;
  };

  const setUpAvatarUrl = (T: string) => {
    state.userinfo.avatarUrl = T;
  };

  const setCurrentGoodNum = (isSet: boolean) => {
    if (isSet) attrs.currentVideoAttrs.good += 1;
    else attrs.currentVideoAttrs.good -= 1;
  };

  const setUserinfo = (T: userinfoType | null) => {
    if (T) state.userinfo = T;
  };
  const setToken = (T: string) => {
    state.token = T;
    if (T.length == 0) removeToken();
    else setTokenApi(state.token);
  };
  const setIsLogin = (T: boolean) => {
    state.isLogin = T;
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
    const useMessage = useMessageStore();
    await logout();
    setUserinfo(null);
    setToken('');
    setIsLogin(false);
    useMessage.init();
  };

  const handleUserinfo = async () => {
    const { result } = await getUserinfoApi();
    setIsLogin(true);
    setUserinfo(result);
  };

  return {
    ...toRefs(state),
    ...toRefs(attrs),
    login,
    register,
    userLogout,
    handleUserinfo,
    setLoginDialogVisible,
    setCurrentVideoAttrs,
    setCurrentGoodNum,
    setUpAvatarUrl,
  };
});
