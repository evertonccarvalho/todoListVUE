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
];

export default routes;
