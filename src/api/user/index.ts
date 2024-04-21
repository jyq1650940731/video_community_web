import request from "@/utils/request";
import type{loginForm,loginResponseData,userResponseData} from "./type";

enum API {
    LOGIN_URL = '/user/login',
    USERINFO_URL = '/user/info'
}

export const login = (data:loginForm) => request<any,loginResponseData>({
    url: API.LOGIN_URL,
    method: 'post',
    data
})

export const getUserInfo = () => request<any,userResponseData>({
    url: API.USERINFO_URL,
    method: 'get'
})
