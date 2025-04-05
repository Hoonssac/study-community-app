<template>
  <div class="container mt-4">
    <h2>✏️ 스터디 등록</h2>
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
          <option>CS</option>
          <option>크리에이티브</option>
          <option>데이터 분석</option>
          <option>자격증</option>
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

      <button class="btn btn-primary" type="submit">등록하기</button>
      <router-link to="/studies" class="btn btn-outline-secondary ms-2"
        >취소</router-link
      >
    </form>
  </div>
</template>

<script setup>
import { reactive, inject } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const { addStudy } = inject('actions');

const study = reactive({
  title: '',
  desc: '',
  category: '',
  dueDate: '',
  max: null,
});

const submitHandler = () => {
  const today = new Date().toISOString().split('T')[0];

  if (
    !study.title ||
    !study.desc ||
    !study.category ||
    !study.dueDate ||
    !study.max
  ) {
    alert('모든 항목을 입력해주세요.');
    return;
  }
  if (study.dueDate < today) {
    alert('마감일은 오늘 이후로 선택해주세요.');
    return;
  }
  addStudy({ ...study }, () => {
    router.push('/studies');
  });
};
</script>
