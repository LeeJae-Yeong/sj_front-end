# 성재가구 프론트엔드 프로젝트

Vue.js 3 (Composition API)와 Tailwind CSS를 사용한 프론트엔드 프로젝트입니다.

## 구현된 컴포넌트

### 1. 포트폴리오 갤러리 (PortfolioGallery.vue)

- **카테고리 필터링**: "맞춤 가구" / "상업 공간 솔루션" 필터 기능
- **반응형 그리드 레이아웃**: 데스크탑 3열, 모바일 1열
- **상세 모달**: Teleport를 사용한 모달 컴포넌트
- **Mock API**: `PortfolioService.js`에서 12개 이상의 샘플 데이터 제공

#### 사용 방법

```vue
<template>
  <PortfolioGallery />
</template>

<script setup>
import PortfolioGallery from './components/PortfolioGallery.vue';
</script>
```

### 2. 견적 요청 폼 (EstimateForm.vue)

- **동적 필드**: 고객 유형(개인/기업)에 따라 필드가 동적으로 변경
- **Vuelidate 검증**: 이름, 이메일, 연락처 등 필수 필드 검증
- **폼 제출**: Spring Boot 백엔드 API로 데이터 전송 (Mock 구현)
- **사용자 피드백**: 성공/실패 메시지 표시

#### 사용 방법

```vue
<template>
  <EstimateForm />
</template>

<script setup>
import EstimateForm from './components/EstimateForm.vue';
</script>
```

## 파일 구조

```
front-end/
├── components/
│   ├── PortfolioGallery.vue    # 포트폴리오 갤러리 컴포넌트
│   └── EstimateForm.vue        # 견적 요청 폼 컴포넌트
├── services/
│   ├── PortfolioService.js     # 포트폴리오 데이터 Mock API
│   └── EstimateService.js      # 견적 제출 Mock API
├── App.vue                      # 메인 앱 컴포넌트 (예시)
└── README.md                    # 프로젝트 문서
```

## 기술 스택

- **Vue.js 3**: Composition API 사용
- **Tailwind CSS**: 스타일링
- **Vuelidate**: 폼 유효성 검사
- **Teleport**: 모달 렌더링

## 주요 기능

### 포트폴리오 갤러리
- ✅ 카테고리별 필터링 (전체/맞춤 가구/상업 공간 솔루션)
- ✅ 반응형 그리드 레이아웃
- ✅ 이미지, 제목, 카테고리 표시
- ✅ 클릭 시 상세 모달 표시
- ✅ Teleport를 사용한 모달 렌더링

### 견적 요청 폼
- ✅ 개인/기업 고객 유형 선택
- ✅ 조건부 필드 렌더링
- ✅ Vuelidate를 사용한 클라이언트 측 검증
- ✅ 폼 제출 로직 (Mock API)
- ✅ 성공/실패 알림

## 다음 단계

1. **의존성 설치**: 프로젝트에 필요한 패키지 설치
   ```bash
   npm install vue@^3.0.0 @vuelidate/core @vuelidate/validators
   npm install -D tailwindcss postcss autoprefixer
   ```

2. **Tailwind CSS 설정**: `tailwind.config.js` 파일 생성 및 설정

3. **백엔드 연동**: Mock API를 실제 Spring Boot API 엔드포인트로 교체
   - `PortfolioService.js`: `GET /api/portfolios`
   - `EstimateService.js`: `POST /api/estimates`

4. **라우팅 설정**: Vue Router를 사용하여 페이지 구성

