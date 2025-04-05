import { createRouter, createWebHistory } from 'vue-router';
import StudyList from '@/pages/StudyList.vue';
import StudyDetail from '@/pages/StudyDetail.vue';
import StudyAdd from '@/pages/StudyAdd.vue';

const routes = [
  { path: '/', redirect: '/studies' },
  { path: '/studies', name: 'StudyList', component: StudyList },
  { path: '/studies/:id', name: 'StudyDetail', component: StudyDetail },
  { path: '/studies/add', name: 'StudyAdd', component: StudyAdd },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
