<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
    <!-- Admin Header -->
    <nav class="bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-100 sticky top-0 z-40">
      <div class="container mx-auto px-6 py-4">
        <div class="flex items-center justify-between">
          <h1 class="text-2xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            관리자 대시보드
          </h1>
          <div class="flex items-center gap-4">
            <span class="text-sm text-gray-600">{{ adminUser?.username || 'Admin' }}</span>
            <button
              @click="handleLogout"
              class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium"
            >
              로그아웃
            </button>
          </div>
        </div>
      </div>
    </nav>

    <div class="container mx-auto px-6 py-8">
      <!-- Tabs -->
      <div class="flex gap-4 mb-8 border-b border-gray-200">
        <button
          @click="activeTab = 'estimates'"
          :class="[
            'px-6 py-3 font-semibold border-b-2 transition-colors',
            activeTab === 'estimates'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          ]"
        >
          견적 요청 관리
        </button>
        <button
          @click="activeTab = 'portfolio'"
          :class="[
            'px-6 py-3 font-semibold border-b-2 transition-colors',
            activeTab === 'portfolio'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          ]"
        >
          포트폴리오 관리
        </button>
      </div>

      <!-- Estimates Tab -->
      <div v-if="activeTab === 'estimates'" class="space-y-6">
        <div class="bg-white rounded-2xl shadow-xl p-6">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-2xl font-bold text-gray-800">견적 요청 목록</h2>
            <div class="flex gap-4">
              <select
                v-model="statusFilter"
                class="px-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="all">전체</option>
                <option value="pending">대기중</option>
                <option value="processing">처리중</option>
                <option value="completed">완료</option>
              </select>
              <button
                @click="refreshEstimates"
                class="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors"
              >
                새로고침
              </button>
            </div>
          </div>

          <div v-if="loading" class="text-center py-12">
            <div class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent"></div>
          </div>

          <div v-else-if="filteredEstimates.length === 0" class="text-center py-12 text-gray-500">
            견적 요청이 없습니다.
          </div>

          <div v-else class="space-y-4">
            <div
              v-for="estimate in filteredEstimates"
              :key="estimate.id"
              class="border-2 border-gray-200 rounded-xl p-6 hover:border-indigo-300 transition-all cursor-pointer"
              @click="viewEstimateDetail(estimate)"
            >
              <div class="flex items-start justify-between">
                <div class="flex-1">
                  <div class="flex items-center gap-3 mb-2">
                    <h3 class="text-xl font-bold text-gray-800">{{ estimate.name }}</h3>
                    <span
                      class="px-3 py-1 text-xs font-semibold rounded-full"
                      :class="{
                        'bg-yellow-100 text-yellow-800': estimate.status === 'PENDING' || estimate.status === 'pending',
                        'bg-blue-100 text-blue-800': estimate.status === 'PROCESSING' || estimate.status === 'processing',
                        'bg-green-100 text-green-800': estimate.status === 'COMPLETED' || estimate.status === 'completed'
                      }"
                    >
                      {{ getStatusText(estimate.status) }}
                    </span>
                  </div>
                  <p class="text-gray-600 mb-2">
                    <span class="font-semibold">이메일:</span> {{ estimate.email }} | 
                    <span class="font-semibold">연락처:</span> {{ estimate.phoneNumber }}
                  </p>
                  <p class="text-gray-600 mb-2">
                    <span class="font-semibold">고객 유형:</span> {{ estimate.userType === 'INDIVIDUAL' ? '개인 고객' : '기업 고객' }}
                  </p>
                  <p class="text-xs text-gray-400 mt-2">
                    {{ formatDate(estimate.createdAt) }}
                  </p>
                </div>
                <button
                  @click.stop="updateStatus(estimate.id, getNextStatus(estimate.status))"
                  class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm"
                  :disabled="estimate.status === 'COMPLETED' || estimate.status === 'completed'"
                >
                  {{ getStatusButtonText(estimate.status) }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Portfolio Tab -->
      <div v-if="activeTab === 'portfolio'" class="space-y-6">
        <div class="bg-white rounded-2xl shadow-xl p-6">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-2xl font-bold text-gray-800">포트폴리오 관리</h2>
            <button
              @click="showAddPortfolio = true"
              class="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all"
            >
              + 새 포트폴리오 추가
            </button>
          </div>
          <p class="text-gray-600">포트폴리오 관리 기능은 포트폴리오 갤러리에서 확인할 수 있습니다.</p>
        </div>
      </div>
    </div>

    <!-- Estimate Detail Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div
          v-if="selectedEstimate"
          class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          @click="selectedEstimate = null"
        >
          <div
            class="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar shadow-2xl"
            @click.stop
          >
            <div class="p-8">
              <div class="flex items-center justify-between mb-6">
                <h2 class="text-3xl font-bold text-gray-800">견적 요청 상세</h2>
                <button
                  @click="selectedEstimate = null"
                  class="text-gray-500 hover:text-gray-700 text-3xl font-light"
                >
                  ×
                </button>
              </div>

              <div class="space-y-6">
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="text-sm font-semibold text-gray-600">이름</label>
                    <p class="text-lg font-bold text-gray-800">{{ selectedEstimate.name }}</p>
                  </div>
                  <div>
                    <label class="text-sm font-semibold text-gray-600">이메일</label>
                    <p class="text-lg text-gray-800">{{ selectedEstimate.email }}</p>
                  </div>
                  <div>
                    <label class="text-sm font-semibold text-gray-600">연락처</label>
                    <p class="text-lg text-gray-800">{{ selectedEstimate.phoneNumber }}</p>
                  </div>
                  <div>
                    <label class="text-sm font-semibold text-gray-600">고객 유형</label>
                    <p class="text-lg text-gray-800">
                      {{ selectedEstimate.userType === 'INDIVIDUAL' ? '개인 고객' : '기업 고객' }}
                    </p>
                  </div>
                </div>

                <div v-if="selectedEstimate.userType === 'COMPANY' && selectedEstimate.companyName">
                  <label class="text-sm font-semibold text-gray-600">회사명</label>
                  <p class="text-lg text-gray-800">{{ selectedEstimate.companyName }}</p>
                </div>

                <div v-if="selectedEstimate.requestDetails">
                  <label class="text-sm font-semibold text-gray-600">문의 내용</label>
                  <p class="text-lg text-gray-800 whitespace-pre-wrap">{{ selectedEstimate.requestDetails }}</p>
                </div>

                <!-- Estimate Items -->
                <div v-if="selectedEstimate.items && selectedEstimate.items.length > 0">
                  <label class="text-sm font-semibold text-gray-600 mb-2 block">견적 항목</label>
                  <div class="space-y-2">
                    <div
                      v-for="(item, index) in selectedEstimate.items"
                      :key="index"
                      class="border-2 border-gray-200 rounded-xl p-4"
                    >
                      <p class="font-medium text-gray-800">{{ item.itemName }}</p>
                      <p class="text-sm text-gray-600">수량: {{ item.quantity }}</p>
                      <p v-if="item.specifications" class="text-sm text-gray-500 mt-1">{{ item.specifications }}</p>
                    </div>
                  </div>
                </div>

                <!-- Attachments -->
                <div>
                  <label class="text-sm font-semibold text-gray-600 mb-3 block">첨부파일</label>
                  <div v-if="selectedAttachments && selectedAttachments.length > 0" class="space-y-2">
                    <div
                      v-for="attachment in selectedAttachments"
                      :key="attachment.id"
                      class="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
                    >
                      <div class="flex items-center gap-3">
                        <span class="text-2xl">{{ getFileIcon(attachment.fileType) }}</span>
                        <div>
                          <p class="font-medium text-gray-800">{{ attachment.fileName }}</p>
                          <p class="text-xs text-gray-500">{{ formatFileSize(attachment.fileSize) }}</p>
                        </div>
                      </div>
                      <button
                        @click="handleDownload(attachment)"
                        class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
                      >
                        다운로드
                      </button>
                    </div>
                  </div>
                  <div v-else class="p-4 bg-gray-50 rounded-lg border border-gray-200 text-center text-gray-500">
                    첨부파일이 없습니다.
                  </div>
                </div>

                <div class="pt-4 border-t">
                  <label class="text-sm font-semibold text-gray-600">제출 일시</label>
                  <p class="text-lg text-gray-800">{{ formatDate(selectedEstimate.createdAt) }}</p>
                </div>
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
import { useRouter } from 'vue-router';
import { fetchEstimates, updateEstimate, getEstimateAttachments, downloadAttachment } from '../services/EstimateService.js';

const router = useRouter();
const activeTab = ref('estimates');
const loading = ref(false);
const estimates = ref([]);
const statusFilter = ref('all');
const selectedEstimate = ref(null);
const selectedAttachments = ref([]);
const showAddPortfolio = ref(false);
const adminUser = ref(null);

const filteredEstimates = computed(() => {
  if (statusFilter.value === 'all') {
    return estimates.value;
  }
  // Map frontend filter to backend status format
  const statusMap = {
    'pending': 'PENDING',
    'processing': 'PROCESSING',
    'completed': 'COMPLETED'
  };
  const backendStatus = statusMap[statusFilter.value] || statusFilter.value;
  return estimates.value.filter(e => {
    const status = e.status?.toUpperCase();
    return status === backendStatus || status === statusFilter.value.toUpperCase();
  });
});

const getStatusText = (status) => {
  const statusMap = {
    'PENDING': '대기중',
    'pending': '대기중',
    'PROCESSING': '처리중',
    'processing': '처리중',
    'COMPLETED': '완료',
    'completed': '완료'
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

const formatFileSize = (bytes) => {
  if (!bytes) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};

const getFileIcon = (fileType) => {
  if (!fileType) return '📎';
  if (fileType.startsWith('image/')) return '🖼️';
  if (fileType === 'application/pdf') return '📄';
  if (fileType.includes('word') || fileType.includes('document')) return '📝';
  return '📎';
};

const refreshEstimates = async () => {
  loading.value = true;
  try {
    const status = statusFilter.value === 'all' ? null : statusFilter.value;
    const data = await fetchEstimates(status);
    estimates.value = Array.isArray(data) ? data : [];
    // Sort by creation date (newest first)
    estimates.value.sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt) : new Date(0);
      const dateB = b.createdAt ? new Date(b.createdAt) : new Date(0);
      return dateB - dateA;
    });
  } catch (error) {
    console.error('견적 목록 조회 실패:', error);
    estimates.value = [];
  } finally {
    loading.value = false;
  }
};

const getNextStatus = (currentStatus) => {
  const status = currentStatus?.toUpperCase();
  if (status === 'PENDING') return 'PROCESSING';
  if (status === 'PROCESSING') return 'COMPLETED';
  return 'COMPLETED';
};

const getStatusButtonText = (status) => {
  const statusUpper = status?.toUpperCase();
  if (statusUpper === 'PENDING') return '처리 시작';
  if (statusUpper === 'PROCESSING') return '완료 처리';
  return '완료됨';
};

const updateStatus = async (id, newStatus) => {
  try {
    // Map frontend status to backend format
    const updateData = { status: newStatus.toUpperCase() };
    await updateEstimate(id, updateData);
    
    // Refresh the list
    await refreshEstimates();
  } catch (error) {
    console.error('견적 상태 업데이트 실패:', error);
    alert('상태 업데이트에 실패했습니다.');
  }
};

const viewEstimateDetail = async (estimate) => {
  selectedEstimate.value = estimate;
  selectedAttachments.value = [];
  
  // Load attachments for the selected estimate
  if (estimate && estimate.id) {
    try {
      console.log('첨부파일 조회 시작, estimateId:', estimate.id);
      const attachments = await getEstimateAttachments(estimate.id);
      console.log('첨부파일 조회 결과:', attachments);
      selectedAttachments.value = attachments || [];
    } catch (err) {
      console.error('첨부파일 조회 실패:', err);
      selectedAttachments.value = [];
    }
  } else {
    console.warn('견적 ID가 없습니다:', estimate);
  }
};

const handleDownload = async (attachment) => {
  try {
    await downloadAttachment(attachment.id, attachment.fileName);
  } catch (error) {
    console.error('파일 다운로드 오류:', error);
    alert('파일 다운로드 중 오류가 발생했습니다.');
  }
};

const handleLogout = () => {
  localStorage.removeItem('adminToken');
  localStorage.removeItem('adminUser');
  router.push('/admin/login');
};

onMounted(() => {
  const token = localStorage.getItem('adminToken');
  if (!token) {
    router.push('/admin/login');
    return;
  }

  const user = localStorage.getItem('adminUser');
  if (user) {
    adminUser.value = JSON.parse(user);
  }

  refreshEstimates();
});
</script>

<style scoped>
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

