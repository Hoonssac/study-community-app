<template>
  <div class="card h-100" style="cursor: pointer">
    <div class="card-body">
      <h5 class="card-title">
        {{ study.title }}
      </h5>
      <p class="card-text text-muted mb-2">
        📌 카테고리: {{ study.category }}<br />
        🗓️ 등록일: {{ formatDate(study.createdAt) }}<br />
        📅 마감일: {{ formatDate(study.dueDate) }}<br />
        ❤️ 좋아요: {{ study.likes }}
      </p>
      <span class="badge" :class="isClosed ? 'bg-secondary' : 'bg-success'">{{
        isClosed ? '모집 마감' : 'D-' + getDday(study.dueDate)
      }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

// props 구조분해 (study 객체 받기)
const { study } = defineProps({
  study: Object,
});

// 날짜 포맷 YYYY-MM-DD
const formatDate = (date) => {
  return new Date(date).toISOString().split('T')[0];
};

// 마감 여부 판단
const isClosed = computed(() => {
  return new Date(study.dueDate) < new Date();
});

// D-day 계산
const getDday = (dueDate) => {
  const diff = new Date(dueDate) - new Date();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};
</script>
