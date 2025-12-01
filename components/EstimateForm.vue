<template>
  <div class="estimate-form container mx-auto px-6 py-12 max-w-3xl">
    <div class="text-center mb-16">
      <h2 class="text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
        온라인 견적 요청
      </h2>
      <p class="text-gray-600 text-lg">프리미엄 가구 솔루션을 위한 첫 걸음</p>
    </div>

    <form @submit.prevent="handleSubmit" class="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100">
      <!-- Customer Type Selection -->
      <div class="mb-8">
        <label class="block text-sm font-semibold text-gray-800 mb-4">
          고객 유형 <span class="text-red-500">*</span>
        </label>
        <div class="grid grid-cols-2 gap-4">
          <label class="relative cursor-pointer group">
            <input
              type="radio"
              v-model="formData.customerType"
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
              v-model="formData.customerType"
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

      <!-- Common Fields -->
      <div class="mb-6">
        <label for="name" class="block text-sm font-semibold text-gray-800 mb-2">
          이름 <span class="text-red-500">*</span>
        </label>
        <input
          id="name"
          v-model="formData.name"
          type="text"
          class="w-full px-5 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-gray-50 focus:bg-white"
          :class="{ 'border-red-500 focus:ring-red-500': v$.name.$error }"
          placeholder="이름을 입력해주세요"
        />
        <p v-if="v$.name.$error" class="mt-2 text-sm text-red-600 font-medium">
          {{ v$.name.$errors[0]?.$message }}
        </p>
      </div>

      <div class="mb-6">
        <label for="email" class="block text-sm font-semibold text-gray-800 mb-2">
          이메일 <span class="text-red-500">*</span>
        </label>
        <input
          id="email"
          v-model="formData.email"
          type="email"
          class="w-full px-5 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-gray-50 focus:bg-white"
          :class="{ 'border-red-500 focus:ring-red-500': v$.email.$error }"
          placeholder="example@email.com"
        />
        <p v-if="v$.email.$error" class="mt-2 text-sm text-red-600 font-medium">
          {{ v$.email.$errors[0]?.$message }}
        </p>
      </div>

      <div class="mb-6">
        <label for="phone" class="block text-sm font-semibold text-gray-800 mb-2">
          연락처 <span class="text-red-500">*</span>
        </label>
        <input
          id="phone"
          v-model="formData.phone"
          type="tel"
          class="w-full px-5 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-gray-50 focus:bg-white"
          :class="{ 'border-red-500 focus:ring-red-500': v$.phone.$error }"
          placeholder="010-1234-5678"
        />
        <p v-if="v$.phone.$error" class="mt-2 text-sm text-red-600 font-medium">
          {{ v$.phone.$errors[0]?.$message }}
        </p>
      </div>

      <!-- Individual Customer Fields -->
      <template v-if="formData.customerType === 'individual'">
        <div class="mb-6">
          <label for="address" class="block text-sm font-semibold text-gray-800 mb-2">
            주소
          </label>
          <input
            id="address"
            v-model="formData.address"
            type="text"
            class="w-full px-5 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-gray-50 focus:bg-white"
            placeholder="주소를 입력해주세요"
          />
        </div>

        <div class="mb-6">
          <label for="preferredDate" class="block text-sm font-semibold text-gray-800 mb-2">
            희망 방문일
          </label>
          <input
            id="preferredDate"
            v-model="formData.preferredDate"
            type="date"
            class="w-full px-5 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-gray-50 focus:bg-white"
          />
        </div>
      </template>

      <!-- Enterprise Customer Fields -->
      <template v-if="formData.customerType === 'enterprise'">
        <div class="mb-6">
          <label for="companyName" class="block text-sm font-semibold text-gray-800 mb-2">
            회사명 <span class="text-red-500">*</span>
          </label>
          <input
            id="companyName"
            v-model="formData.companyName"
            type="text"
            class="w-full px-5 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-gray-50 focus:bg-white"
            :class="{ 'border-red-500 focus:ring-red-500': v$.companyName.$error }"
            placeholder="회사명을 입력해주세요"
          />
          <p v-if="v$.companyName.$error" class="mt-2 text-sm text-red-600 font-medium">
            {{ v$.companyName.$errors[0]?.$message }}
          </p>
        </div>

        <div class="mb-6">
          <label for="businessNumber" class="block text-sm font-semibold text-gray-800 mb-2">
            사업자등록번호
          </label>
          <input
            id="businessNumber"
            v-model="formData.businessNumber"
            type="text"
            class="w-full px-5 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-gray-50 focus:bg-white"
            placeholder="123-45-67890"
          />
        </div>

        <div class="mb-6">
          <label for="projectType" class="block text-sm font-semibold text-gray-800 mb-2">
            프로젝트 유형
          </label>
          <select
            id="projectType"
            v-model="formData.projectType"
            class="w-full px-5 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-gray-50 focus:bg-white appearance-none cursor-pointer"
          >
            <option value="">선택하세요</option>
            <option value="office">사무실</option>
            <option value="retail">매장</option>
            <option value="restaurant">레스토랑</option>
            <option value="hotel">호텔</option>
            <option value="other">기타</option>
          </select>
        </div>

        <div class="mb-6">
          <label for="budget" class="block text-sm font-semibold text-gray-800 mb-2">
            예산 범위
          </label>
          <select
            id="budget"
            v-model="formData.budget"
            class="w-full px-5 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-gray-50 focus:bg-white appearance-none cursor-pointer"
          >
            <option value="">선택하세요</option>
            <option value="under-10m">1천만원 미만</option>
            <option value="10m-30m">1천만원 ~ 3천만원</option>
            <option value="30m-50m">3천만원 ~ 5천만원</option>
            <option value="over-50m">5천만원 이상</option>
          </select>
        </div>
      </template>

      <!-- Common Message Field -->
      <div class="mb-8">
        <label for="message" class="block text-sm font-semibold text-gray-800 mb-2">
          문의 내용
        </label>
        <textarea
          id="message"
          v-model="formData.message"
          rows="5"
          class="w-full px-5 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-gray-50 focus:bg-white resize-none"
          placeholder="견적 요청에 대한 상세 내용을 입력해주세요."
        ></textarea>
      </div>

      <!-- File Upload Section -->
      <div class="mb-8">
        <label class="block text-sm font-semibold text-gray-800 mb-2">
          견적서 파일 첨부 (선택사항)
        </label>
        <div class="border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-indigo-400 transition-colors bg-gray-50">
          <input
            type="file"
            ref="fileInput"
            @change="handleFileSelect"
            accept="image/*,.pdf,.doc,.docx"
            multiple
            class="hidden"
            id="file-upload"
          />
          <label
            for="file-upload"
            class="cursor-pointer flex flex-col items-center justify-center"
          >
            <div class="text-4xl mb-3">📎</div>
            <p class="text-gray-600 font-medium mb-1">
              클릭하여 파일을 선택하거나 드래그하여 업로드
            </p>
            <p class="text-sm text-gray-500">
              이미지, PDF, 문서 파일 (최대 10MB)
            </p>
          </label>
        </div>
        
        <!-- Uploaded Files Preview -->
        <div v-if="uploadedFiles.length > 0" class="mt-4 space-y-2">
          <div
            v-for="(file, index) in uploadedFiles"
            :key="index"
            class="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 shadow-sm"
          >
            <div class="flex items-center gap-3 flex-1">
              <div class="text-2xl">
                {{ getFileIcon(file.type) }}
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-800 truncate">
                  {{ file.name }}
                </p>
                <p class="text-xs text-gray-500">
                  {{ formatFileSize(file.size) }}
                </p>
              </div>
            </div>
            <button
              type="button"
              @click="removeFile(index)"
              class="ml-2 text-red-500 hover:text-red-700 transition-colors"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Submit Button -->
      <button
        type="submit"
        :disabled="submitting"
        class="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/50 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
      >
        <span v-if="!submitting">견적 요청하기</span>
        <span v-else class="flex items-center gap-2">
          <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          제출 중...
        </span>
      </button>

      <!-- Success/Error Messages -->
      <Transition name="message">
        <div v-if="submitMessage" class="mt-6 p-5 rounded-xl font-medium shadow-lg" :class="submitMessageType === 'success' ? 'bg-gradient-to-r from-green-50 to-emerald-50 text-green-800 border-2 border-green-200' : 'bg-gradient-to-r from-red-50 to-rose-50 text-red-800 border-2 border-red-200'">
          <div class="flex items-center gap-3">
            <span v-if="submitMessageType === 'success'" class="text-2xl">✓</span>
            <span v-else class="text-2xl">✕</span>
            <span>{{ submitMessage }}</span>
          </div>
        </div>
      </Transition>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, email, minLength } from '@vuelidate/validators';
import { submitEstimate } from '../services/EstimateService.js';

// Form data state
const formData = reactive({
  customerType: 'individual',
  name: '',
  email: '',
  phone: '',
  address: '',
  preferredDate: '',
  companyName: '',
  businessNumber: '',
  projectType: '',
  budget: '',
  message: ''
});

// File upload state
const fileInput = ref(null);
const uploadedFiles = ref([]);

// Validation rules
const rules = {
  name: { required },
  email: { required, email },
  phone: { required, minLength: minLength(10) },
  companyName: {
    // 기업 고객일 때만 필수, 개인 고객일 때는 검증하지 않음
    required: {
      $validator: (value) => {
        // 개인 고객이면 검증하지 않음
        if (formData.customerType === 'individual') {
          return true;
        }
        // 기업 고객이면 필수
        return value && value.trim().length > 0;
      },
      $message: '회사명을 입력해주세요.'
    }
  }
};

const v$ = useVuelidate(rules, formData);

// Submission state
const submitting = ref(false);
const submitMessage = ref('');
const submitMessageType = ref('');

// File handling functions
const handleFileSelect = (event) => {
  const files = Array.from(event.target.files);
  const maxSize = 10 * 1024 * 1024; // 10MB
  
  files.forEach(file => {
    if (file.size > maxSize) {
      submitMessage.value = `${file.name} 파일이 너무 큽니다. (최대 10MB)`;
      submitMessageType.value = 'error';
      return;
    }
    
    if (!uploadedFiles.value.find(f => f.name === file.name && f.size === file.size)) {
      uploadedFiles.value.push(file);
    }
  });
  
  // Reset input
  if (fileInput.value) {
    fileInput.value.value = '';
  }
};

const removeFile = (index) => {
  uploadedFiles.value.splice(index, 1);
};

const getFileIcon = (fileType) => {
  if (fileType.startsWith('image/')) return '🖼️';
  if (fileType === 'application/pdf') return '📄';
  if (fileType.includes('word') || fileType.includes('document')) return '📝';
  return '📎';
};

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};

// Handle form submission
const handleSubmit = async () => {
  // Validate form
  const isFormValid = await v$.value.$validate();
  
  if (!isFormValid) {
    // Find the first error field and create a detailed message
    const errorFields = [];
    if (v$.value.name.$error) errorFields.push('이름');
    if (v$.value.email.$error) errorFields.push('이메일');
    if (v$.value.phone.$error) errorFields.push('연락처');
    // 개인 고객일 때는 companyName 오류를 무시
    if (v$.value.companyName.$error && formData.customerType === 'enterprise') {
      errorFields.push('회사명');
    }
    
    if (errorFields.length > 0) {
      submitMessage.value = `다음 필드를 확인해주세요: ${errorFields.join(', ')}`;
    } else {
      submitMessage.value = '입력한 정보를 확인해주세요.';
    }
    submitMessageType.value = 'error';
    
    // Scroll to first error field
    setTimeout(() => {
      if (v$.value.name.$error) {
        document.getElementById('name')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        document.getElementById('name')?.focus();
      } else if (v$.value.email.$error) {
        document.getElementById('email')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        document.getElementById('email')?.focus();
      } else if (v$.value.phone.$error) {
        document.getElementById('phone')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        document.getElementById('phone')?.focus();
      } else if (v$.value.companyName.$error && formData.customerType === 'enterprise') {
        document.getElementById('companyName')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        document.getElementById('companyName')?.focus();
      }
    }, 100);
    
    return;
  }

  submitting.value = true;
  submitMessage.value = '';

  try {
    // Prepare form data for submission
    const dataToSubmit = { ...formData };
    
    // Clean up data based on customer type
    if (dataToSubmit.customerType === 'individual') {
      delete dataToSubmit.companyName;
      delete dataToSubmit.businessNumber;
      delete dataToSubmit.projectType;
      delete dataToSubmit.budget;
    } else {
      delete dataToSubmit.address;
      delete dataToSubmit.preferredDate;
    }

    // Submit to backend API with files
    const response = await submitEstimate(dataToSubmit, uploadedFiles.value);
    
    if (response.success) {
      submitMessage.value = '견적 요청이 성공적으로 전송되었습니다. 빠른 시일 내에 연락드리겠습니다.';
      submitMessageType.value = 'success';
      
      // Reset form
      Object.assign(formData, {
        customerType: 'individual',
        name: '',
        email: '',
        phone: '',
        address: '',
        preferredDate: '',
        companyName: '',
        businessNumber: '',
        projectType: '',
        budget: '',
        message: ''
      });
      uploadedFiles.value = [];
      v$.value.$reset();
    } else {
      throw new Error(response.message || '제출에 실패했습니다.');
    }
  } catch (error) {
    console.error('견적 요청 제출 오류:', error);
    
    // 네트워크 오류인지 확인
    if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
      submitMessage.value = '서버에 연결할 수 없습니다. 백엔드 서버가 실행 중인지 확인해주세요.';
    } else {
      submitMessage.value = error.message || '견적 요청 제출 중 오류가 발생했습니다. 다시 시도해주세요.';
    }
    submitMessageType.value = 'error';
  } finally {
    submitting.value = false;
  }
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

select {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236366f1'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1.5em 1.5em;
  padding-right: 3rem;
}
</style>

