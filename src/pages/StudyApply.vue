<template>
  <div class="container mt-4">
    <h2>✅ 스터디 신청</h2>
    <form @submit.prevent="submitHandler" class="mt-3">
      <div class="mb-3">
        <label class="form-label">이름</label>
        <input type="text" class="form-control" v-model="form.name" />
      </div>

      <div class="mb-3">
        <label class="form-label">연락처</label>
        <input type="text" class="form-control" v-model="form.contact" />
      </div>

      <button class="btn btn-success" type="submit">신청하기</button>
      <router-link
        :to="`/studies/${studyId}`"
        class="btn btn-outline-secondary ms-2"
        >돌아가기</router-link
      >
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const router = useRouter();
const studyId = route.params.id;
const form = ref({ name: '', contact: '' });

const submitHandler = async () => {
  if (!form.value.name || !form.value.contact) {
    alert('이름과 연락처를 입력해주세요.');
    return;
  }
  const payload = {
    ...form.value,
    studyId,
  };

  try {
    await axios.post('/api/applications', payload);
    alert('신청이 완료되었습니다.');
    router.push(`/studies/${studyId}`);
  } catch (e) {
    alert('신청 중 오류 발생!');
  }
};
</script>
