# 📚 앱 이름 : **StuDJ(스터디제이)**

Vue.js로 스터디 모집 커뮤니티 "스터디제이"를 만들어보자!

# 🎯 기능 요구사항

## 1. 스터디 목록 조회 + 필터 + 정렬

### 스터디 목록 조회

- `axios.get('/api/studies')`로 모든 스터디를 조회
- 각 스터디 항목은 **카드형 UI**로 출력
- 각 카드에는 다음 항목이 표시되어야 한다:
  - 제목 (`title`)
  - 카테고리 (`category`)
  - 등록일 (`createdAt`) → `YYYY-MM-DD` 형식
  - 마감일 (`dueDate`) → `YYYY-MM-DD` 형식
  - 좋아요 수 (`likes`)
  - 모집 상태 뱃지

### 필터: 모집 중만 보기

- 체크박스를 통해 "모집 중인 스터디만 보기" 기능 제공
- 마감일(`dueDate`)이 **오늘 이후인 경우**에만 출력
- 체크 해제 시 전체 스터디 다시 표시

### 정렬 기능

- select 박스로 정렬 기준 선택
- 정렬 기준은 아래 세 가지:
  1. **마감일 임박순** (`dueDate` 기준 오름차순)
  2. **최신 등록일순** (`createdAt` 기준 내림차순)
  3. **좋아요순** (`likes` 기준 내림차순)
- 선택된 정렬 기준에 따라 즉시 정렬 결과 반영
- 기본 정렬 기준은 `마감일 임박순`

### 상세 페이지 이동

- 각 스터디 카드를 클릭하면 `/studies/:id`로 이동
- 상세 페이지는 `router/index.js`에 경로 등록되어 있어야 함

---

## 📁 전체 폴더 구조

```
MiniMall/
├── public/
│   └── index.html
├── src/
│   ├── assets/
│   │   └── (이미지, 스타일 등)
│   ├── components/
│   │   └── Header.vue                # 상단 고정 메뉴
│   ├── data/
│   │   └── products.json             # 상품 리스트 JSON 데이터
│   ├── pages/
│   │   ├── Home.vue                  # 메인 페이지
│   │   ├── Products.vue              # 상품 목록 페이지
|   │   ├── CategoryFilter.vue        # 왼쪽 카테고리 필터 (left view)
│   |   ├── ProductDescription.vue    # 중첩 탭 - 상세정보
|   │   ├── ProductReview.vue          # 중첩 탭 - 리뷰
│   │   └── ProductDetail.vue         # 상품 상세 페이지 (동적 라우트)
│   ├── router/
│   │   └── index.js                  # 라우터 설정
│   ├── App.vue                       # 전체 레이아웃 (Header + router-view)
│   └── main.js                       # 앱 진입점
├── package.json
└── vite.config.js (또는 vue.config.js)
```
