<template>
  <div class="container">
    <router-view />
  </div>
</template>

<script setup>
import { reactive, provide, computed, onMounted } from 'vue';
import axios from 'axios';

const states = reactive({
  studyList: [],
});

// 최초 스터디 목록 조회
const fetchStudyList = async () => {
  try {
    const res = await axios.get('/api/studies');
    states.studyList = res.data;
  } catch (err) {
    alert('데이터 조회 실패');
  }
};

// 동록 함수 추가
const addStudy = async (studyData, successCallback) => {
  const payload = {
    ...studyData,
    likes: 0,
    createdAt: new Date().toISOString().split('T')[0],
  };
  try {
    const res = await axios.post('/api/studies', payload);
    states.studyList.push(res.data);
    successCallback();
  } catch (e) {
    alert('등록 실패');
  }
};

provide(
  'studyList',
  computed(() => states.studyList)
);
provide('actions', { addStudy, fetchStudyList });
onMounted(fetchStudyList);
</script>
