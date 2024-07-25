/*
 * @Author: YourName
 * @Date: 2024-05-22 14:35:24
 * @LastEditTime: 2024-06-18 14:12:42
 * @LastEditors: YourName
 * @Description:
 * @FilePath: \video_community_web\src\router\route.ts
 * 版权声明
 */

const constantRoutes = [
  {
    path: '/',
    name: 'redirect',
    redirect: '/home',
  },
  {
    path: '/home',
    component: () => import('@/views/home/index.vue'),
    name: 'home',
  },
  {
    path: '/video/:vid',
    name: 'videoDetails',
    component: () => import('@/views/video/index.vue'),
  },
  {
    path: '/account',
    component: () => import('@/views/account/index.vue'),
    name: 'account',
    redirect: '/account/home',
    children: [
      {
        path: '/account/home',
        name: 'accountHome',
        component: () => import('@/views/account/components/AccountHome.vue'),
      },
      {
        path: '/account/avatar',
        name: 'accountAvator',
        component: () => import('@/views/account/components/AccountAvator.vue'),
      },
      {
        path: '/account/info',
        name: 'accountInfo',
        component: () => import('@/views/account/components/AccountInfo.vue'),
      },
      {
        path: '/account/Security',
        name: 'accountSecurity',
        component: () =>
          import('@/views/account/components/AccountSecurity.vue'),
      },
    ],
  },
  {
    path: '/space',
    name: 'space',
    component: () => import('@/views/space/index.vue'),
    redirect: '/space/:uid',
    children: [
      {
        path: '/space/:uid',
        name: 'spaceHome',
        component: () => import('@/views/space/children/SpaceHome.vue'),
      },
      {
        path: '/space/:uid/favlist',
        name: 'spaceFavlist',
        component: () => import('@/views/space/children/SpaceFavlist.vue'),
        props: (route: { query: { fid: number } }) => ({
          fid: route.query.fid,
        }),
      },
      {
        path: '/space/:uid/videos',
        name: 'spacevideos',
        component: () => import('@/views/space/children/SpaceVideos.vue'),
      },
      {
        path: '/space/:uid/dynamic',
        name: 'spaceDynamic',
        component: () => import('@/views/space/children/SpaceDynamic.vue'),
      },
    ],
  },
  {
    path: '/search',
    component: () => import('@/views/search/index.vue'),
    children: [
      {
        path: '/search/video',
        component: () => import('@/views/search/child/searchVideo.vue'),
        meta: { requestAuth: false },
        props: (route: { query: { keyword: any } }) => ({
          keyword: route.query.keyword,
        }),
      },
      {
        path: '/search/user',
        component: () => import('@/views/search/child/searchUser.vue'),
        meta: { requestAuth: false },
        props: (route: { query: { keyword: any } }) => ({
          keyword: route.query.keyword,
        }),
      },
    ],
  },
  {
    path: '/message',
    redirect: '/message/reply',
    component: () => import('@/views/message/index.vue'),
    children: [
      {
        path: '/message/reply',
        component: () => import('@/views/message/components/MessageReply.vue'),
        meta: { requestAuth: true },
      },
      {
        path: '/message/at',
        component: () => import('@/views/message/components/MessageAt.vue'),
        meta: { requestAuth: true },
      },
      {
        path: '/message/love',
        component: () => import('@/views/message/components/MessageLove.vue'),
        meta: { requestAuth: true },
      },
      {
        path: '/message/system',
        component: () => import('@/views/message/components/MessageSystem.vue'),
        meta: { requestAuth: true },
      },
      {
        path: '/message/whisper',
        component: () =>
          import('@/views/message/components/MessageWhisper.vue'),
        meta: { requestAuth: true },
        children: [
          {
            path: '/message/whisper/:mid',
            component: () =>
              import('@/views/message/components/WhisperDialog.vue'),
            meta: { requestAuth: true },
          },
        ],
      },
      {
        path: '/message/config',
        component: () => import('@/views/message/components/MessageConfig.vue'),
        meta: { requestAuth: true },
      },
    ],
  },
  {
    path: '/platform',
    name: 'platform',
    redirect: '/platform/upload',
    component: () => import('@/views/platform/index.vue'),
    children: [
      {
        path: '/platform/upload',
        name: 'upload',
        redirect: '/platform/upload/video',
        component: () => import('@/views/platform/upload/index.vue'),
        children: [
          {
            path: '/platform/upload/video',
            component: () =>
              import('@/views/platform/upload/children/VideoUpload.vue'),
          },
        ],
      },
    ],
  },
  // {
  //   path: '/404',
  //   component: () => import('@/views/404.vue'),
  //   name: '404',
  // },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'any',
  },
];

export default constantRoutes;
