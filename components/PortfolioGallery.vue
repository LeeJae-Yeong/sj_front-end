<template>
  <div class="portfolio-gallery container mx-auto px-6 py-12">
    <div class="text-center mb-16">
      <h2 class="text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
        포트폴리오 갤러리
      </h2>
      <p class="text-gray-600 text-lg">우리의 작품을 만나보세요</p>
    </div>
    
    <!-- Category Filter Buttons -->
    <div class="flex justify-center gap-4 mb-12 flex-wrap">
      <button
        @click="selectedCategory = '전체'"
        :class="[
          'px-8 py-3 rounded-full font-semibold text-sm transition-all duration-300 transform hover:scale-105',
          selectedCategory === '전체'
            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/50'
            : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md border border-gray-200'
        ]"
      >
        전체
      </button>
      <button
        @click="selectedCategory = '맞춤 가구'"
        :class="[
          'px-8 py-3 rounded-full font-semibold text-sm transition-all duration-300 transform hover:scale-105',
          selectedCategory === '맞춤 가구'
            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/50'
            : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md border border-gray-200'
        ]"
      >
        맞춤 가구
      </button>
      <button
        @click="selectedCategory = '상업 공간 솔루션'"
        :class="[
          'px-8 py-3 rounded-full font-semibold text-sm transition-all duration-300 transform hover:scale-105',
          selectedCategory === '상업 공간 솔루션'
            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/50'
            : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md border border-gray-200'
        ]"
      >
        상업 공간 솔루션
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-20">
      <div class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent"></div>
      <p class="text-gray-600 mt-4 text-lg">로딩 중...</p>
    </div>

    <!-- Portfolio Grid -->
    <div
      v-else
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      <div
        v-for="(portfolio, index) in filteredPortfolios"
        :key="portfolio.id"
        @click="openModal(portfolio)"
        class="portfolio-card group bg-white rounded-2xl shadow-xl overflow-hidden cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-2xl"
        :style="{ animationDelay: `${index * 100}ms` }"
      >
        <div class="relative overflow-hidden">
          <div class="aspect-w-16 aspect-h-9 bg-gradient-to-br from-gray-100 to-gray-200">
            <img
              :src="portfolio.image"
              :alt="portfolio.title"
              class="w-full h-72 object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div class="absolute top-4 right-4">
            <span
              class="inline-block px-4 py-2 text-xs font-bold rounded-full backdrop-blur-md shadow-lg"
              :class="
                portfolio.category === '맞춤 가구'
                  ? 'bg-gradient-to-r from-indigo-500/90 to-purple-500/90 text-white'
                  : 'bg-gradient-to-r from-emerald-500/90 to-teal-500/90 text-white'
              "
            >
              {{ portfolio.category }}
            </span>
          </div>
        </div>
        <div class="p-6">
          <h3 class="text-2xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors">
            {{ portfolio.title }}
          </h3>
          <p class="text-gray-600 text-sm leading-relaxed line-clamp-2">
            {{ portfolio.description }}
          </p>
          <div class="mt-4 flex items-center text-indigo-600 font-semibold text-sm">
            <span>자세히 보기</span>
            <svg class="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div
      v-if="!loading && filteredPortfolios.length === 0"
      class="text-center py-20"
    >
      <div class="inline-block p-6 bg-white rounded-2xl shadow-lg">
        <p class="text-gray-600 text-lg">표시할 포트폴리오가 없습니다.</p>
      </div>
    </div>

    <!-- Detail Modal (using Teleport) -->
    <Teleport to="body">
      <Transition name="modal">
        <div
          v-if="selectedPortfolio"
          class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          @click="closeModal"
        >
          <div
            class="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar shadow-2xl transform transition-all"
            @click.stop
          >
            <div class="relative">
              <div class="relative h-96 overflow-hidden">
                <img
                  :src="selectedPortfolio.image"
                  :alt="selectedPortfolio.title"
                  class="w-full h-full object-cover"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
              <button
                @click="closeModal"
                class="absolute top-6 right-6 text-white hover:text-gray-200 text-3xl font-light bg-black/30 backdrop-blur-md rounded-full w-12 h-12 flex items-center justify-center shadow-xl hover:bg-black/50 transition-all transform hover:rotate-90"
              >
                ×
              </button>
              <div class="absolute bottom-6 left-6">
                <span
                  class="inline-block px-4 py-2 text-sm font-bold rounded-full backdrop-blur-md shadow-lg"
                  :class="
                    selectedPortfolio.category === '맞춤 가구'
                      ? 'bg-gradient-to-r from-indigo-500/90 to-purple-500/90 text-white'
                      : 'bg-gradient-to-r from-emerald-500/90 to-teal-500/90 text-white'
                  "
                >
                  {{ selectedPortfolio.category }}
                </span>
              </div>
            </div>
            <div class="p-8">
              <h2 class="text-4xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {{ selectedPortfolio.title }}
              </h2>
              <p class="text-gray-600 mb-6 text-lg leading-relaxed">
                {{ selectedPortfolio.description }}
              </p>
              <div class="border-t border-gray-200 pt-6">
                <h3 class="font-bold text-gray-900 mb-3 text-xl">상세 정보</h3>
                <p class="text-gray-600 leading-relaxed">{{ selectedPortfolio.details }}</p>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { fetchPortfolios } from '../services/PortfolioService.js';

// State management using Composition API
const portfolios = ref([]);
const loading = ref(true);
const selectedCategory = ref('전체');
const selectedPortfolio = ref(null);

// Computed property for filtered portfolios
const filteredPortfolios = computed(() => {
  if (selectedCategory.value === '전체') {
    return portfolios.value;
  }
  return portfolios.value.filter(
    portfolio => portfolio.category === selectedCategory.value
  );
});

// Fetch portfolios on mount
onMounted(async () => {
  try {
    loading.value = true;
    portfolios.value = await fetchPortfolios();
  } catch (error) {
    console.error('포트폴리오 데이터를 가져오는 중 오류 발생:', error);
  } finally {
    loading.value = false;
  }
});

// Modal functions
const openModal = (portfolio) => {
  selectedPortfolio.value = portfolio;
  document.body.style.overflow = 'hidden';
};

const closeModal = () => {
  selectedPortfolio.value = null;
  document.body.style.overflow = '';
};
</script>

<style scoped>
.portfolio-card {
  animation: fadeInUp 0.6s ease-out forwards;
  opacity: 0;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-active .bg-white,
.modal-leave-active .bg-white {
  transition: transform 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .bg-white,
.modal-leave-to .bg-white {
  transform: scale(0.9);
}
</style>

