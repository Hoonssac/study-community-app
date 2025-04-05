import { createRouter, createWebHistory } from 'vue-router';
import StudyList from '@/pages/StudyList.vue';
import StudyDetail from '@/pages/StudyDetail.vue';
import StudyAdd from '@/pages/StudyAdd.vue';
import StudyEdit from '@/pages/StudyEdit.vue';
import StudyApply from '@/pages/StudyApply.vue';

const routes = [
  { path: '/', redirect: '/studies' },
  { path: '/studies', name: 'StudyList', component: StudyList },
  { path: '/studies/:id', name: 'StudyDetail', component: StudyDetail },
  { path: '/studies/add', name: 'StudyAdd', component: StudyAdd },
  { path: '/studies/:id/edit', name: 'StudyEdit', component: StudyEdit },
  { path: '/studies/:id/apply', name: 'StudyApply', component: StudyApply },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
