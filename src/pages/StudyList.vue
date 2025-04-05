<template>
  <div class="container mt-4">
    <h2>📚 스터디 목록</h2>

    <!-- 스터디 등록 버튼 -->
    <router-link to="/studies/add" class="btn btn-primary mb-3">
      ➕ 스터디 등록
    </router-link>

    <!-- 필터 및 정렬 UI -->
    <div class="d-flex justify-content-between my-3">
      <div>
        <!-- 모집 중인 스터디만 보기 필터 -->
        <input type="checkbox" id="filter" v-model="filterOpenOnly" />
        <label for="filter"> 모집 중만 보기</label>
      </div>

      <!-- 정렬 옵션 선택 -->
      <select class="form-select" v-model="sortType" style="width: 160px">
        <option value="due">마감일 임박순</option>
        <option value="created">최신 등록일순</option>
        <option value="likes">좋아요순</option>
      </select>
    </div>
  </div>

  <div class="row row-cols-1 row-cols-md-2 g-4">
    <div class="col" v-for="study in filteredStudies" :key="study.id">
      <StudyCard :study="study" @click="goDetail(study.id)" />
    </div>
  </div>
</template>

<script setup>
import { inject, ref, computed } from 'vue'; // Vue의 Composition API 기능 가져오기
import { useRouter } from 'vue-router'; // 라우터 사용을 위한 Vue Router 가져오기
import StudyCard from '@/components/StudyCard.vue'; // 스터디 카드 컴포넌트 가져오기

// Vue Router 인스턴스 생성
const router = useRouter();

// 부모 컴포넌트 또는 전역 상태에서 스터디 목록 데이터를 주입받음
// 'studyList'는 부모 컴포넌트에서 provide로 전달된 데이터
const studies = inject('studyList');

// 모집 중인 스터디만 보기 필터 상태 (true/false)
const filterOpenOnly = ref(false);

// 정렬 기준 상태 ('due', 'created', 'likes' 중 하나)
const sortType = ref('due'); // 기본값은 '마감일 임박순'

// 마감 여부 판별
const isClosed = (dueDate) => new Date(dueDate) < new Date();

// 필터 + 정렬
const filteredStudies = computed(() => {
  let list = [...studies.value];

  // 모집 중 필터
  if (filterOpenOnly.value) {
    list = list.filter((study) => !isClosed(study.dueDate));
  }

  // 정렬
  if (sortType.value === 'likes') {
    list.sort((a, b) => b.likes - a.likes);
  } else if (sortType.value === 'created') {
    list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } else {
    list.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  }

  return list;
});

// 상세 페이지 이동
const goDetail = (id) => {
  router.push(`/studies/${id}`);
};
</script>
