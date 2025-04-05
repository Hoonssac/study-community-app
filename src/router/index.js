import { createRouter, createWebHistory } from 'vue-router';
import StudyList from '@/pages/StudyList.vue';
import StudyDetail from '@/pages/StudyDetail.vue';

const routes = [
  {
    path: '/',
    redirect: '/studies',
  },
  {
    path: '/studies',
    name: 'StudyList',
    component: StudyList,
  },
  {
    path: '/studies/:id',
    name: 'StudyDetail',
    component: StudyDetail,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
