# front-end

Write your command content here.

This command will be available in chat with /front-end
// Cursor AI 프롬프트 (Vue.js Frontend - Portfolio Gallery Component)

**[Context]**
나는 성재가구 웹사이트의 프론트엔드 개발자입니다. 스택은 **Vue.js 3 (Composition API)와 Tailwind CSS**를 사용하고 있습니다. 백엔드 API와의 통신을 가정합니다.

**[Goal]**
두 가지 카테고리(맞춤 가구 / 상업 공간 솔루션) 필터링 기능을 갖춘 고성능 포트폴리오 갤러리 컴포넌트를 구현해야 합니다. 데이터는 백엔드 Spring Boot API에서 가져올 것입니다.

**[Steps]**
1.  **Mock API Service (`PortfolioService.js`):** 포트폴리오 데이터를 가져오는 비동기 함수 `fetchPortfolios()`를 정의합니다. 이 함수는 임의의 Mock JSON 데이터(10개 이상, `category` 필드 포함)를 반환하도록 작성합니다.
2.  **Gallery Component (`PortfolioGallery.vue`):**
    * Composition API의 `ref`와 `computed`를 사용하여 상태를 관리합니다.
    * `onMounted` 훅에서 `fetchPortfolios()`를 호출하여 데이터를 가져와 상태에 저장합니다.
    * **카테고리 필터링 버튼**을 구현하고, 선택된 필터 상태(`selectedCategory`)에 따라 `computed` 속성으로 표시될 포트폴리오 목록을 동적으로 필터링합니다.
    * 포트폴리오 카드는 Tailwind CSS 그리드(데스크탑: 3열, 모바일: 1열)로 표시하며, **이미지, 제목, 카테고리**를 포함합니다.
3.  **Detail Modal:** 각 카드를 클릭하면 상세 정보를 보여주는 **모달 컴포넌트**를 구현하고, 텔레포트(Teleport)를 사용하여 렌더링하도록 합니다.

**[Focus]**
Vue.js Composition API의 효율적인 상태 관리와 Tailwind CSS를 사용한 깔끔하고 반응형 UI 구현에 중점을 둡니다.

// Cursor AI 프롬프트 (Vue.js Frontend - Estimate Form Component)

**[Context]**
나는 성재가구의 프론트엔드 개발자입니다. 스택은 **Vue.js 3와 Tailwind CSS**를 사용하며, 폼 유효성 검사를 위해 Vuelidate 라이브러리 사용을 가정합니다.

**[Goal]**
개인 고객과 기업 고객 유형에 따라 필드가 동적으로 변하는 **온라인 견적 요청 폼** 컴포넌트를 구현하고, 백엔드 API로 데이터를 전송하는 로직 스켈레톤을 작성해야 합니다.

**[Steps]**
1.  **Form Component (`EstimateForm.vue`):** 고객 유형 선택에 따라 조건부 렌더링되는 필드 그룹을 구성합니다 (개인 고객 필드 셋 / 기업 고객 필드 셋).
2.  **Field Validation:** Vuelidate를 사용하여 **이름, 연락처, 이메일** 등 필수 필드에 대한 클라이언트 측 유효성 검사를 구현합니다.
3.  **Submission Logic:** 폼 데이터를 Vue 컴포넌트의 상태로 관리하고, 폼 제출 시 Mock API 함수 `submitEstimate(formData)`를 호출하여 **Spring Boot 백엔드 엔드포인트**로 데이터를 전송하는 로직을 작성합니다. 성공 시 사용자에게 알림을 표시합니다.

**[Focus]**
조건부 렌더링, Vuelidate를 사용한 명확한 오류 메시지, 그리고 폼 제출 로직의 구조화에 중점을 둡니다.