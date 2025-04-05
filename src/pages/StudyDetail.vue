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

    <span class="badge" :class="isClosed ? 'bg-secondary' : 'bg-success'">
      {{ isClosed ? '모집 마감' : 'D-' + dday }}
    </span>

    <div class="mt-3">
      <router-link to="/studies" class="btn btn-outline-secondary"
        >← 목록으로</router-link
      >
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';

const route = useRoute();
const router = useRouter();
const study = ref(null);

onMounted(async () => {
  try {
    const res = await axios.get(`/api/studies/${route.params.id}`);
    study.value = res.data;
  } catch (err) {
    alert('스터디를 불러오는 데 실패했습니다.');
    router.push('/studies');
  }
});

const isClosed = computed(() => {
  if (!study.value) return false;
  return new Date(study.value.dueDate) < new Date();
});

const dday = computed(() => {
  if (!study.value) return '-';
  const diff = new Date(study.value.dueDate) - new Date();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
});
</script>
