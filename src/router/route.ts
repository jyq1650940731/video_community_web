/*
 * @Author: YourName
 * @Date: 2024-05-22 14:35:24
 * @LastEditTime: 2024-05-24 11:07:11
 * @LastEditors: YourName
 * @Description:
 * @FilePath: \video_community_web\src\router\route.ts
 * 版权声明
 */
/*
 * @Author: YourName
 * @Date: 2024-05-22 14:35:24
 * @LastEditTime: 2024-05-22 16:00:39
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
    meta: {
      title: 'redirect',
      hidden: true,
    },
  },
  {
    path: '/home',
    component: () => import('@/views/home/index.vue'),
    name: 'home',
  },
  {
    path: '/video/:vid',
    name: 'video',
    component: () => import('@/views/video/index.vue'),
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
