<template>
  <div class="container mt-4" v-if="study">
    <h2>✏️ 스터디 수정</h2>
    <form @submit.prevent="submitHandler" class="mt-3">
      <div class="mb-3">
        <label class="form-label">스터디명</label>
        <input type="text" class="form-control" v-model="study.title" />
      </div>

      <div class="mb-3">
        <label class="form-label">설명</label>
        <textarea class="form-control" v-model="study.desc"></textarea>
      </div>

      <div class="mb-3">
        <label class="form-label">카테고리</label>
        <select class="form-select" v-model="study.category">
          <option value="">선택하세요</option>
          <option>프론트엔드</option>
          <option>백엔드</option>
          <option>AI</option>
          <option>알고리즘</option>
          <option>디자인</option>
          <option>데이터 분석</option>
          <option>자격증</option>
          <option>크리에이티브</option>
          <option>CS</option>
          <option>기타</option>
        </select>
      </div>

      <div class="mb-3">
        <label class="form-label">마감일</label>
        <input type="date" class="form-control" v-model="study.dueDate" />
      </div>

      <div class="mb-3">
        <label class="form-label">최대 인원수</label>
        <input type="number" class="form-control" v-model.number="study.max" />
      </div>

      <button class="btn btn-primary" type="submit">저장하기</button>
      <router-link
        :to="`/studies/${study.id}`"
        class="btn btn-outline-secondary ms-2"
        >취소</router-link
      >
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const router = useRouter();
const study = ref(null);
const { fetchStudyList } = inject('actions'); // 목록 새로고침 함수 주입

// 기존 데이터 불러오기
onMounted(async () => {
  const res = await axios.get(`/api/studies/${route.params.id}`);
  study.value = res.data;
});

// 수정 후 저장
const submitHandler = async () => {
  const today = new Date().toISOString().split('T')[0];

  if (
    !study.value.title ||
    !study.value.desc ||
    !study.value.category ||
    !study.value.dueDate ||
    !study.value.max
  ) {
    alert('모든 항목을 입력하세요.');
    return;
  }

  if (study.value.dueDate < today) {
    alert('마감일은 오늘 이후로 선택해주세요.');
    return;
  }

  try {
    await axios.put(`/api/studies/${study.value.id}`, study.value);
    fetchStudyList(); // 목록 데이터 동기화
    alert('수정 완료');
    router.push(`/studies/${study.value.id}`);
  } catch (err) {
    alert('수정 중 오류 발생!');
  }
};
</script>
