<template>
  <div class="container mt-4" v-if="study">
    <h2>{{ study.title }}</h2>
    <p class="text-muted">{{ study.desc }}</p>

    <ul class="list-group my-3">
      <li class="list-group-item">📅 마감일: {{ study.dueDate }}</li>
      <li class="list-group-item">📅 등록일: {{ study.createdAt }}</li>
      <li class="list-group-item">📌 카테고리: {{ study.category }}</li>
      <li class="list-group-item">👥 최대 인원: {{ study.max }}</li>
      <li class="list-group-item">❤️ 좋아요: {{ study.likes }}</li>
    </ul>

    <!-- 버튼 그룹 -->
    <div class="mb-3 d-flex flex-wrap gap-2">
      <!-- 좋아요 버튼 -->
      <button class="btn btn-outline-danger" @click="likeHandler">
        ❤️ 좋아요 누르기
      </button>

      <!-- 수정 버튼 -->
      <router-link :to="`/studies/${study.id}/edit`" class="btn btn-warning"
        >✏️ 수정하기</router-link
      >

      <!-- 신청 버튼 -->
      <router-link :to="`/studies/${study.id}/apply`" class="btn btn-success"
        >✅ 신청하기</router-link
      >
    </div>

    <!-- 모집 상태 -->
    <div class="mb-3">
      <span class="badge" :class="isClosed ? 'bg-secondary' : 'bg-success'">
        {{ isClosed ? '모집 마감' : 'D-' + dday }}
      </span>
    </div>
    <router-link to="/studies" class="btn btn-outline-secondary"
      >← 목록으로</router-link
    >

    <!-- 신청자 목록 -->
    <h5 class="mt-4">📋 신청자 목록</h5>
    <ul class="list-group">
      <li class="list-group-item" v-for="app in applicants" :key="app.id">
        {{ app.name }} ({{ app.contact }})
      </li>
      <li v-if="applicants.length === 0" class="list-group-item text-muted">
        아직 신청자가 없습니다.
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { ref, onMounted, computed, inject } from 'vue';
import axios from 'axios';

const route = useRoute();
const router = useRouter();
const study = ref(null);
const applicants = ref([]);
const { fetchStudyList } = inject('actions'); // 목록 새로고침 함수

// 상세 데이터 가져오기
onMounted(async () => {
  try {
    const res = await axios.get(`/api/studies/${route.params.id}`);
    study.value = res.data;
  } catch (err) {
    alert('스터디를 불러오는 데 실패했습니다.');
    router.push('/studies');
  }

  // 신청자 목록 가져오기
  try {
    const res = await axios.get(`/api/applications?studyId=${route.params.id}`);
    applicants.value = res.data;
  } catch (e) {
    alert('신청자 목록을 불러올 수 없습니다.');
  }
});

// 좋아요 기능
const likeHandler = async () => {
  const updated = { ...study.value, likes: study.value.likes + 1 };
  try {
    await axios.put(`/api/studies/${study.value.id}`, updated);
    study.value.likes++;
    fetchStudyList(); // 목록에 반영되도록 다시 불러오기
  } catch (e) {
    alert('좋아요 처리 중 오류가 발생했습니다.');
  }
};

// 마감 여부
const isClosed = computed(() => {
  if (!study.value) return false;
  return new Date(study.value.dueDate) < new Date();
});

// 디데이 계산
const dday = computed(() => {
  if (!study.value) return '-';
  const diff = new Date(study.value.dueDate) - new Date();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
});
</script>
