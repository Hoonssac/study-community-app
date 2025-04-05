# 📚 앱 이름 : **StuDJ(스터디제이)**

| ![](https://github.com/user-attachments/assets/b6e9f02a-5739-459a-acd9-e86fed05d3b3) | ![](https://github.com/user-attachments/assets/7c07f7b9-3d62-494b-92eb-3df88207f6aa) |
| ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ |

# 🎯 기능 요구사항

## 📌 1. 스터디 목록 조회 + 필터 + 정렬

### ✅ 스터디 목록 조회

- `axios.get('/api/studies')`로 모든 스터디를 조회
- 각 스터디 항목은 **카드형 UI**로 출력
- 각 카드에는 다음 항목이 표시되어야 한다:
  - 제목 (`title`)
  - 카테고리 (`category`)
  - 등록일 (`createdAt`) → `YYYY-MM-DD` 형식
  - 마감일 (`dueDate`) → `YYYY-MM-DD` 형식
  - 좋아요 수 (`likes`)
  - 모집 상태 뱃지

### ✅ 필터: 모집 중만 보기

- 체크박스를 통해 "모집 중인 스터디만 보기" 기능 제공
- 마감일(`dueDate`)이 **오늘 이후인 경우**에만 출력
- 체크 해제 시 전체 스터디 다시 표시

### ✅ 정렬 기능

- select 박스로 정렬 기준 선택
- 정렬 기준은 아래 세 가지:
  1. **마감일 임박순** (`dueDate` 기준 오름차순)
  2. **최신 등록일순** (`createdAt` 기준 내림차순)
  3. **좋아요순** (`likes` 기준 내림차순)
- 선택된 정렬 기준에 따라 즉시 정렬 결과 반영
- 기본 정렬 기준은 `마감일 임박순`

### ✅ 상세 페이지 이동

- 각 스터디 카드를 클릭하면 `/studies/:id`로 이동
- 상세 페이지는 `router/index.js`에 경로 등록되어 있어야 함

## 📌 2. 스터디 등록 폼 구현 + 마감일 유효성 검사

### ✅ 등록 페이지 구성

- 주소: `/studies/add`
- 사용자가 직접 스터디 정보를 입력하여 등록할 수 있는 폼을 구현한다.

### ✅ 등록 폼 항목

모든 항목은 필수 입력이다.

| 필드명     | 설명        | 타입 / 형태                  |
| ---------- | ----------- | ---------------------------- |
| `title`    | 스터디명    | 텍스트 `<input>`             |
| `desc`     | 설명        | `<textarea>`                 |
| `category` | 카테고리    | `<select>` (옵션 선택)       |
| `dueDate`  | 모집 마감일 | `<input type="date">`        |
| `max`      | 최대 인원수 | 숫자 `<input type="number">` |

### ✅ 유효성 검사

- 모든 항목이 비어 있으면 등록 불가
- `dueDate < 오늘 날짜`인 경우도 등록 불가
  → `alert("마감일은 오늘 이후로 선택해주세요.")`

### ✅ 등록 처리 로직

- `axios.post('/api/studies')`로 서버에 등록 요청
- 등록 시 `createdAt`은 자동 생성 (`new Date().toISOString().split('T')[0]`)
- `likes`는 항상 0으로 초기화
- 등록 성공 시 `/studies`로 이동

```json
{
  "title": "예시 스터디",
  "desc": "...",
  "category": "백엔드",
  "dueDate": "2025-04-30",
  "createdAt": "2025-04-03", // 오늘 날짜 자동 생성
  "likes": 0,
  "max": 10
}
```

### ✅ 등록 버튼 위치

- 등록 버튼은 `StudyList.vue` 목록 페이지 상단에 존재
- 클릭 시 `/studies/add`로 이동

```
<router-link to="/studies/add" class="btn btn-primary mb-3">
  ➕ 스터디 등록
</router-link>
```

## 📌 3. 상세 페이지 좋아요 기능 구현

### ✅ 좋아요 버튼 표시

- `/studies/:id` 상세 페이지(`StudyDetail.vue`)에 ❤️ **좋아요 버튼**을 표시한다.
- 버튼 텍스트 예: `"❤️ 좋아요 누르기"`
- 버튼은 스터디 정보 아래에 위치시킨다.

### ✅ 좋아요 처리 로직

- 버튼을 클릭하면 해당 스터디의 `likes` 수를 `+1` 증가시킨다.
- 증가된 값은 즉시 화면에 반영되어야 한다.
- 서버에도 `axios.put()` 요청으로 반영해야 한다.

```
const updated = { ...study.value, likes: study.value.likes + 1 }
await axios.put(`/api/studies/${id}`, updated)
study.value.likes++
```

### ✅ 목록 페이지 동기화 처리

- 좋아요 버튼 클릭 후 목록 페이지(`/studies`)로 돌아갔을 때,
  **좋아요 수가 최신 상태로 반영되어 있어야 한다.**
- 이를 위해 상위에서 제공한 `fetchStudyList()` 함수를 **좋아요 클릭 후에 호출**한다.

```
const { fetchStudyList } = inject('actions')

await axios.put(...)
study.value.likes++
fetchStudyList() // ✅ 목록 새로고침
```

### ✅ 새로고침해도 반영 유지

- 좋아요 수는 서버(JSON Server)에 반영되므로, 새로고침해도 반영된 상태 유지

---

## 📌 4. 스터디 수정 기능 구현 + 목록 반영 처리

### ✅ 수정 페이지 구성

- 주소: `/studies/:id/edit`
- 해당 스터디 ID를 기준으로 데이터를 가져와 폼에 출력
- 수정 후 저장 시 서버에 반영하고, 상세 페이지(`/studies/:id`)로 이동

### ✅ 폼 구성 요소

### ✅ 2. 폼 구성 요소

| 항목        | 필드명     | 입력 형태                     |
| ----------- | ---------- | ----------------------------- |
| 스터디명    | `title`    | 텍스트                        |
| 설명        | `desc`     | 텍스트에어리어                |
| 카테고리    | `category` | `<select>` — 반드시 `CS` 포함 |
| 마감일      | `dueDate`  | `<input type="date">`         |
| 최대 인원수 | `max`      | `<input type="number">`       |

- 모든 항목은 필수 입력
- 수정 전 값이 모두 **자동으로 채워져 있어야 함**

### ✅ 유효성 검사

- 항목이 비어 있으면 등록 불가 (alert)
- 마감일이 오늘보다 이전이면 등록 불가

### ✅ 저장 처리 로직

- 수정된 데이터로 `axios.put('/api/studies/:id')` 요청 전송
- 전송 데이터는 기존에 있던 `likes`, `createdAt`, `id` 값도 포함
- 성공 시 `/studies/:id` 페이지로 이동

### ✅ 목록 자동 반영

- 수정 완료 후 `fetchStudyList()` 함수를 호출하여
  `studyList`가 최신 상태로 갱신되어야 함
- 그렇지 않으면 목록에 이전 정보가 그대로 남을 수 있음

### ✅ 상세 페이지에서 “수정하기” 버튼 표시

- `/studies/:id` 페이지에 수정 버튼 추가

```
<router-link :to="`/studies/${study.id}/edit`" class="btn btn-warning">
  ✏️ 수정하기
</router-link>
```

## 📁 전체 폴더 구조

```
MiniMall/
├── src/
│   ├── assets/
│   │   └── (이미지, 스타일 등)
│   ├── components/
│   │   └── StudyCard.vue             # 재사용 스터디 카드
│   ├── data/
│   │   └── products.json             # 스터디 리스트 JSON 데이터
│   ├── pages/
|   │   ├── StudyEdit.vue             # 스터디 수정 페이지
|   │   ├── StudyAdd.vue              # 스터디 등록 페이지
|   │   ├── StudyList.vue             # 스터디 리스트 페이지
│   │   └── StudyDetail.vue           # 스터디 상세 페이지 (동적 라우트)
│   ├── router/
│   │   └── index.js                  # 라우터 설정
│   ├── App.vue                       # 전체 레이아웃
│   └── main.js                       # 앱 진입점
├── package.json
└── vite.config.js (또는 vue.config.js)
```
