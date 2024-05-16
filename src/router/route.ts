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
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    name: 'login',
  },
  {
    path: '/home',
    component: () => import('@/views/home/index.vue'),
    name: 'home',
  },
  {
    path: '/video/:vid',
    component: () => import('@/views/video/index.vue'),
  },
  {
    path: '/404',
    component: () => import('@/views/404.vue'),
    name: '404',
  },

  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'any',
  },
];

export default constantRoutes;
