import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'home', component: () => import('pages/TodoList.vue') },
      {
        path: 'artigos',
        name: 'artigos',
        component: () => import('pages/ArtigosPage.vue'),
      },
      {
        path: 'form-post',
        name: 'formPost',
        component: () => import('pages/FormPost.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
