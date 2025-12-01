<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 px-4">
    <div class="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-8 md:p-12 w-full max-w-md border border-white/20">
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold mb-2 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          관리자 로그인
        </h1>
        <p class="text-gray-300">성재가구 관리 시스템</p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label for="username" class="block text-sm font-semibold text-gray-300 mb-2">
            사용자명
          </label>
          <input
            id="username"
            v-model="username"
            type="text"
            required
            class="w-full px-5 py-3.5 bg-white/10 border-2 border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all backdrop-blur-sm"
            placeholder="관리자 ID를 입력하세요"
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-semibold text-gray-300 mb-2">
            비밀번호
          </label>
          <input
            id="password"
            v-model="password"
            type="password"
            required
            class="w-full px-5 py-3.5 bg-white/10 border-2 border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all backdrop-blur-sm"
            placeholder="비밀번호를 입력하세요"
          />
        </div>

        <div v-if="errorMessage" class="p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-200 text-sm">
          {{ errorMessage }}
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/50 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
        >
          <span v-if="!loading">로그인</span>
          <span v-else class="flex items-center gap-2">
            <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            로그인 중...
          </span>
        </button>
      </form>

      <div class="mt-6 text-center text-sm text-gray-400">
        <p>테스트 계정: admin / admin123</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const username = ref('');
const password = ref('');
const loading = ref(false);
const errorMessage = ref('');

const handleLogin = async () => {
  loading.value = true;
  errorMessage.value = '';

  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));

  // Mock authentication (in real app, this would call backend API)
  if (username.value === 'admin' && password.value === 'admin123') {
    localStorage.setItem('adminToken', 'mock-admin-token');
    localStorage.setItem('adminUser', JSON.stringify({ username: username.value }));
    router.push('/admin/dashboard');
  } else {
    errorMessage.value = '사용자명 또는 비밀번호가 올바르지 않습니다.';
  }

  loading.value = false;
};
</script>

