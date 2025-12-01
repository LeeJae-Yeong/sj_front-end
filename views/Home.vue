<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
    <!-- Navigation -->
    <nav class="bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-100 sticky top-0 z-40">
      <div class="container mx-auto px-6 py-4">
        <div class="flex items-center justify-between">
          <h1 class="text-2xl font-bold text-gray-800">성재가구</h1>
          <div class="hidden md:flex gap-8 text-sm font-medium text-gray-700">
            <a href="#portfolio" class="hover:text-indigo-600 transition-colors">포트폴리오</a>
            <a href="#estimate" class="hover:text-indigo-600 transition-colors">견적 요청</a>
            <router-link to="/estimate/inquiry" class="hover:text-indigo-600 transition-colors">견적 조회</router-link>
            <router-link to="/admin/login" class="hover:text-indigo-600 transition-colors">관리자</router-link>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main>
      <!-- Portfolio Gallery Section -->
      <section id="portfolio" class="py-20">
        <PortfolioGallery />
      </section>

      <!-- Estimate Form Section -->
      <section id="estimate" class="py-20 bg-white">
        <EstimateForm />
      </section>
    </main>

    <!-- Footer -->
    <footer class="bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 text-white py-12">
      <div class="container mx-auto px-6 text-center">
        <p class="text-gray-300">© 2024 성재가구. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import PortfolioGallery from '../components/PortfolioGallery.vue';
import EstimateForm from '../components/EstimateForm.vue';
</script>

