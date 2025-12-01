<template>
  <div class="estimate-inquiry container mx-auto px-6 py-12 max-w-3xl">
    <div class="text-center mb-16">
      <h2 class="text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
        견적 조회
      </h2>
      <p class="text-gray-600 text-lg">요청하신 견적의 상세 내용을 확인하실 수 있습니다</p>
    </div>

    <!-- Inquiry Form -->
    <div v-if="!estimate" class="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100">
      <!-- Back to Home Button -->
      <div class="mb-6">
        <router-link
          to="/"
          class="inline-flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-indigo-600 transition-colors"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          메인 페이지로
        </router-link>
      </div>
      <!-- Customer Type Selection -->
      <div class="mb-8">
        <label class="block text-sm font-semibold text-gray-800 mb-4">
          고객 유형 <span class="text-red-500">*</span>
        </label>
        <div class="grid grid-cols-2 gap-4">
          <label class="relative cursor-pointer group">
            <input
              type="radio"
              v-model="customerType"
              value="individual"
              class="peer sr-only"
            />
            <div class="flex items-center justify-center p-6 rounded-2xl border-2 transition-all duration-300 peer-checked:border-indigo-500 peer-checked:bg-gradient-to-br peer-checked:from-indigo-50 peer-checked:to-purple-50 border-gray-200 group-hover:border-indigo-300 bg-white">
              <div class="text-center">
                <div class="text-2xl mb-2">🏠</div>
                <span class="font-semibold text-gray-800 peer-checked:text-indigo-600">개인 고객</span>
              </div>
            </div>
          </label>
          <label class="relative cursor-pointer group">
            <input
              type="radio"
              v-model="customerType"
              value="enterprise"
              class="peer sr-only"
            />
            <div class="flex items-center justify-center p-6 rounded-2xl border-2 transition-all duration-300 peer-checked:border-indigo-500 peer-checked:bg-gradient-to-br peer-checked:from-indigo-50 peer-checked:to-purple-50 border-gray-200 group-hover:border-indigo-300 bg-white">
              <div class="text-center">
                <div class="text-2xl mb-2">🏢</div>
                <span class="font-semibold text-gray-800 peer-checked:text-indigo-600">기업 고객</span>
              </div>
            </div>
          </label>
        </div>
      </div>

      <!-- Individual Customer Fields -->
      <template v-if="customerType === 'individual'">
        <div class="mb-6">
          <label for="inquiry-name" class="block text-sm font-semibold text-gray-800 mb-2">
            이름 <span class="text-red-500">*</span>
          </label>
          <input
            id="inquiry-name"
            v-model="inquiryData.name"
            type="text"
            class="w-full px-5 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-gray-50 focus:bg-white"
            placeholder="이름을 입력해주세요"
          />
        </div>
      </template>

      <!-- Enterprise Customer Fields -->
      <template v-if="customerType === 'enterprise'">
        <div class="mb-6">
          <label for="inquiry-company" class="block text-sm font-semibold text-gray-800 mb-2">
            회사명 <span class="text-red-500">*</span>
          </label>
          <input
            id="inquiry-company"
            v-model="inquiryData.companyName"
            type="text"
            class="w-full px-5 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-gray-50 focus:bg-white"
            placeholder="회사명을 입력해주세요"
          />
        </div>
      </template>

      <!-- Common Fields -->
      <div class="mb-6">
        <label for="inquiry-email" class="block text-sm font-semibold text-gray-800 mb-2">
          이메일 <span class="text-red-500">*</span>
        </label>
        <input
          id="inquiry-email"
          v-model="inquiryData.email"
          type="email"
          class="w-full px-5 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-gray-50 focus:bg-white"
          placeholder="example@email.com"
        />
      </div>

      <div class="mb-8">
        <label for="inquiry-phone" class="block text-sm font-semibold text-gray-800 mb-2">
          연락처 <span class="text-red-500">*</span>
        </label>
        <input
          id="inquiry-phone"
          v-model="inquiryData.phone"
          type="tel"
          class="w-full px-5 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-gray-50 focus:bg-white"
          placeholder="010-1234-5678"
        />
      </div>

      <!-- Submit Button -->
      <button
        @click="handleInquiry"
        :disabled="loading"
        class="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/50 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
      >
        <span v-if="!loading">견적 조회하기</span>
        <span v-else class="flex items-center gap-2">
          <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          조회 중...
        </span>
      </button>

      <!-- Error Message -->
      <Transition name="message">
        <div v-if="errorMessage" class="mt-6 p-5 rounded-xl font-medium shadow-lg bg-gradient-to-r from-red-50 to-rose-50 text-red-800 border-2 border-red-200">
          <div class="flex items-center gap-3">
            <span class="text-2xl">✕</span>
            <span>{{ errorMessage }}</span>
          </div>
        </div>
      </Transition>
    </div>

    <!-- Estimate Detail -->
    <div v-else class="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100">
      <div class="flex items-center justify-between mb-8">
        <h3 class="text-3xl font-bold text-gray-800">견적 상세 정보</h3>
        <div class="flex gap-3">
          <router-link
            to="/"
            class="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors flex items-center gap-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
            </svg>
            메인 페이지
          </router-link>
          <button
            @click="resetInquiry"
            class="px-4 py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors"
          >
            다시 조회하기
          </button>
        </div>
      </div>

      <div class="space-y-6">
        <!-- Status Badge -->
        <div class="flex items-center gap-4">
          <span class="text-sm font-semibold text-gray-600">상태:</span>
          <span
            class="px-4 py-2 text-sm font-semibold rounded-full"
            :class="{
              'bg-yellow-100 text-yellow-800': estimate.status === 'PENDING',
              'bg-blue-100 text-blue-800': estimate.status === 'PROCESSING',
              'bg-green-100 text-green-800': estimate.status === 'COMPLETED',
              'bg-red-100 text-red-800': estimate.status === 'CANCELLED'
            }"
          >
            {{ getStatusText(estimate.status) }}
          </span>
        </div>

        <!-- Customer Information -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="text-sm font-semibold text-gray-600">고객 유형</label>
            <p class="text-lg font-bold text-gray-800 mt-1">
              {{ estimate.userType === 'INDIVIDUAL' ? '개인 고객' : '기업 고객' }}
            </p>
          </div>
          <div>
            <label class="text-sm font-semibold text-gray-600">이름</label>
            <p class="text-lg text-gray-800 mt-1">{{ estimate.name }}</p>
          </div>
          <div>
            <label class="text-sm font-semibold text-gray-600">이메일</label>
            <p class="text-lg text-gray-800 mt-1">{{ estimate.email }}</p>
          </div>
          <div>
            <label class="text-sm font-semibold text-gray-600">연락처</label>
            <p class="text-lg text-gray-800 mt-1">{{ estimate.phoneNumber }}</p>
          </div>
          <div v-if="estimate.companyName">
            <label class="text-sm font-semibold text-gray-600">회사명</label>
            <p class="text-lg text-gray-800 mt-1">{{ estimate.companyName }}</p>
          </div>
          <div>
            <label class="text-sm font-semibold text-gray-600">요청 일시</label>
            <p class="text-lg text-gray-800 mt-1">{{ formatDate(estimate.createdAt) }}</p>
          </div>
        </div>

        <!-- Request Details -->
        <div v-if="estimate.requestDetails">
          <label class="text-sm font-semibold text-gray-600 mb-2 block">문의 내용</label>
          <div class="bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
            <p class="text-gray-800 whitespace-pre-wrap">{{ estimate.requestDetails }}</p>
          </div>
        </div>

        <!-- Estimate Items -->
        <div v-if="estimate.items && estimate.items.length > 0">
          <label class="text-sm font-semibold text-gray-600 mb-4 block">견적 항목</label>
          <div class="space-y-4">
            <div
              v-for="(item, index) in estimate.items"
              :key="index"
              class="bg-gray-50 rounded-xl p-6 border-2 border-gray-200"
            >
              <div class="flex items-start justify-between mb-2">
                <h4 class="text-lg font-bold text-gray-800">{{ item.itemName }}</h4>
                <span v-if="item.totalPrice" class="text-lg font-bold text-indigo-600">
                  {{ formatPrice(item.totalPrice) }}원
                </span>
              </div>
              <div class="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <span class="text-sm text-gray-600">수량:</span>
                  <span class="ml-2 font-semibold text-gray-800">{{ item.quantity }}개</span>
                </div>
                <div v-if="item.unitPrice">
                  <span class="text-sm text-gray-600">단가:</span>
                  <span class="ml-2 font-semibold text-gray-800">{{ formatPrice(item.unitPrice) }}원</span>
                </div>
              </div>
              <p v-if="item.specifications" class="mt-4 text-sm text-gray-600">
                {{ item.specifications }}
              </p>
            </div>
          </div>
        </div>

        <!-- Estimated Price -->
        <div v-if="estimate.estimatedPrice" class="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border-2 border-indigo-200">
          <div class="flex items-center justify-between">
            <span class="text-lg font-semibold text-gray-800">예상 가격</span>
            <span class="text-3xl font-bold text-indigo-600">{{ formatPrice(estimate.estimatedPrice) }}원</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { inquiryEstimateByIndividual, inquiryEstimateByCompany } from '../services/EstimateService.js';

const customerType = ref('individual');
const loading = ref(false);
const estimate = ref(null);
const errorMessage = ref('');

const inquiryData = reactive({
  name: '',
  companyName: '',
  email: '',
  phone: ''
});

const getStatusText = (status) => {
  const statusMap = {
    'PENDING': '대기중',
    'PROCESSING': '처리중',
    'COMPLETED': '완료',
    'CANCELLED': '취소됨'
  };
  return statusMap[status] || status;
};

const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const formatPrice = (price) => {
  if (!price) return '0';
  return new Intl.NumberFormat('ko-KR').format(price);
};

const handleInquiry = async () => {
  // Validation
  if (customerType.value === 'individual') {
    if (!inquiryData.name || !inquiryData.email || !inquiryData.phone) {
      errorMessage.value = '모든 필드를 입력해주세요.';
      return;
    }
  } else {
    if (!inquiryData.companyName || !inquiryData.email || !inquiryData.phone) {
      errorMessage.value = '모든 필드를 입력해주세요.';
      return;
    }
  }

  loading.value = true;
  errorMessage.value = '';

  try {
    if (customerType.value === 'individual') {
      estimate.value = await inquiryEstimateByIndividual(
        inquiryData.name,
        inquiryData.email,
        inquiryData.phone
      );
    } else {
      estimate.value = await inquiryEstimateByCompany(
        inquiryData.companyName,
        inquiryData.email,
        inquiryData.phone
      );
    }
  } catch (error) {
    errorMessage.value = error.message || '견적 조회 중 오류가 발생했습니다.';
    estimate.value = null;
  } finally {
    loading.value = false;
  }
};

const resetInquiry = () => {
  estimate.value = null;
  errorMessage.value = '';
  inquiryData.name = '';
  inquiryData.companyName = '';
  inquiryData.email = '';
  inquiryData.phone = '';
};
</script>

<style scoped>
.message-enter-active,
.message-leave-active {
  transition: all 0.3s ease;
}

.message-enter-from,
.message-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>

