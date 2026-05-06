<template>
  <div class="bg-[#F8F9FA] min-h-screen">
    <PageBanner category="join" :title="$t('join.open_positions')" :subtitle="$t('join.subtitle')" />
    
    <!-- 为什么选择一诺 -->
    <section class="join-why-section relative min-h-[500px] md:h-[800px] py-8 md:py-0 flex flex-col justify-center overflow-hidden">
      <!-- Background Watermark -->
      <div class="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <img :src="join4" class="w-full h-full object-cover" alt="Background Watermark">
      </div>
      <div class="relative z-10 w-full max-w-6xl mx-auto px-6">
        <h2 class="section-title text-center mb-8 md:mb-16 tracking-wider">{{ $t('join.why_yino') }}</h2>
        
        <div class="flex flex-col md:grid md:grid-cols-3 gap-6 lg:gap-10">
          <!-- Reason 1: 全球视野 -->
          <div class="group relative h-40 md:h-[460px] rounded-xl overflow-hidden shadow-2xl transition-transform duration-500 md:hover:-translate-y-4">
            <img :src="join1" class="absolute inset-0 w-full h-full object-cover transform transition-transform duration-1000 group-hover:scale-110" alt="全球视野">
            <div class="absolute inset-0 bg-black/40 md:bg-transparent md:bg-gradient-to-t md:from-black/60 md:to-transparent flex flex-col justify-center md:justify-end p-8 md:p-10">
              <h3 class="text-2xl font-bold text-white mb-2 md:mb-5 tracking-wider drop-shadow-lg">{{ $t('join.reason1_title') }}</h3>
              <p class="text-white text-[13px] md:text-sm leading-relaxed font-medium drop-shadow-md">{{ $t('join.reason1_desc') }}</p>
            </div>
          </div>

          <!-- Reason 2: 专业成长 -->
          <div class="group relative h-40 md:h-[460px] rounded-xl overflow-hidden shadow-2xl transition-transform duration-500 md:hover:translate-y-[60px] md:translate-y-[80px]">
            <img :src="join2" class="absolute inset-0 w-full h-full object-cover transform transition-transform duration-1000 group-hover:scale-110" alt="专业成长">
            <div class="absolute inset-0 bg-black/40 md:bg-transparent md:bg-gradient-to-t md:from-black/60 md:to-transparent flex flex-col justify-center md:justify-end p-8 md:p-10">
              <h3 class="text-2xl font-bold text-white mb-2 md:mb-5 tracking-wider drop-shadow-lg">{{ $t('join.reason2_title') }}</h3>
              <p class="text-white text-[13px] md:text-sm leading-relaxed font-medium drop-shadow-md">{{ $t('join.reason2_desc') }}</p>
            </div>
          </div>

          <!-- Reason 3: 价值认同 -->
          <div class="group relative h-40 md:h-[460px] rounded-xl overflow-hidden shadow-2xl transition-transform duration-500 md:hover:translate-y-[30px] md:translate-y-[40px]">
            <img :src="join3" class="absolute inset-0 w-full h-full object-cover transform transition-transform duration-1000 group-hover:scale-110" alt="价值认同">
            <div class="absolute inset-0 bg-black/40 md:bg-transparent md:bg-gradient-to-t md:from-black/60 md:to-transparent flex flex-col justify-center md:justify-end p-8 md:p-10">
              <h3 class="text-2xl font-bold text-white mb-2 md:mb-5 tracking-wider drop-shadow-lg">{{ $t('join.reason3_title') }}</h3>
              <p class="text-white text-[13px] md:text-sm leading-relaxed font-medium drop-shadow-md">{{ $t('join.reason3_desc') }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>


    <!-- 招聘职位 -->
    <div class="max-w-[1140px] mx-auto px-6 py-8 pb-16 md:py-12 md:pb-24">
      <h2 class="section-title text-center mb-12 md:mb-32 tracking-wider">{{ $t('join.open_positions') }}</h2>
      
      <div v-if="loading" class="flex justify-center py-20">
        <div class="w-10 h-10 border-4 border-[#BCA669] border-t-transparent rounded-full animate-spin"></div>
      </div>
      
      <div v-else class="space-y-6">
        <!-- Job Accordion List -->
        <div v-for="(job, index) in jobs" :key="job.id" 
             class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300">
          
          <!-- Header (Always Visible) -->
          <div @click="toggleAccordion(index)" 
               class="px-8 py-6 md:py-8 flex items-stretch md:items-center justify-between cursor-pointer transition-all duration-500 group"
               :class="expandedIndex === index ? 'bg-[#0B0E14] text-white hover:bg-[#0B0E14] shadow-2xl' : 'bg-white text-gray-900 hover:bg-gray-50'">
            
            <div class="flex flex-col md:flex-row md:items-center w-full pr-4 md:pr-8">
              <h3 class="text-xl md:text-2xl font-bold tracking-wider md:w-5/12 mb-2 md:mb-0">{{ locale === 'zh' ? job.title_zh : job.title_en }}</h3>
              <div class="flex items-center text-sm md:w-7/12 mt-1 md:mt-0" :class="expandedIndex === index ? 'text-gray-300' : 'text-gray-500'">
                <div class="h-px w-8 bg-gray-500/30 mx-4 md:block hidden"></div>
                <span class="hidden md:inline font-bold mr-10 text-xl tracking-tight whitespace-nowrap" :class="expandedIndex === index ? 'text-white' : 'text-gray-900'">
                  {{ job.salary }}
                </span>
                <span class="flex items-center opacity-80 md:pl-10 md:border-l whitespace-nowrap" :class="expandedIndex === index ? 'md:border-gray-700' : 'md:border-gray-200'">{{ $t('join.location_prefix') }}{{ locale === 'zh' ? job.location_zh : job.location_en }}</span>
              </div>
            </div>

            <!-- Right Column (Mobile: Salary + Arrow vertically spread, PC: just Arrow centered) -->
            <div class="shrink-0 flex flex-col md:flex-row items-end md:items-center justify-between md:justify-end">
              <span class="md:hidden font-bold text-sm tracking-tight whitespace-nowrap mb-2" :class="expandedIndex === index ? 'text-white' : 'text-gray-900'">
                {{ job.salary }}
              </span>
              <div class="w-9 h-[22px] md:w-10 md:h-8 flex items-center justify-center rounded transition-all duration-300"
                   :class="expandedIndex === index ? 'bg-[#BCA669] text-white' : 'bg-gray-700 text-white group-hover:bg-[#BCA669]'">
                <svg class="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300" 
                     :class="{'rotate-180': expandedIndex === index}"
                     fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
          </div>

          <!-- Body (Expandable) -->
          <Transition name="expand">
            <div v-if="expandedIndex === index" class="px-8 py-12 bg-white">
              <div class="grid grid-cols-1 md:grid-cols-1 gap-12 mb-10">
                <div class="space-y-6">
                  <h4 class="text-xl font-bold text-gray-900 mb-6 flex items-center">
                    {{ $t('join.job_desc') }}：
                  </h4>
                  <p class="text-gray-600 leading-relaxed whitespace-pre-line text-[15px]">
                    {{ locale === 'zh' ? job.description_zh : job.description_en }}
                  </p>
                </div>
                <div class="space-y-6 mt-10">
                  <h4 class="text-xl font-bold text-gray-900 mb-6 flex items-center">
                    {{ $t('join.job_req') }}：
                  </h4>
                  <p class="text-gray-600 leading-relaxed whitespace-pre-line text-[15px]">
                    {{ locale === 'zh' ? job.requirements_zh : job.requirements_en }}
                  </p>
                </div>
              </div>

              <div class="flex justify-center mt-16 bg-gray-50 py-10 -mx-8 -mb-12">
                <a href="mailto:info@yinoasset.com" class="px-16 py-4 bg-[#BCA669]/80 text-white rounded font-bold hover:bg-[#BCA669] transition shadow-md hover:shadow-xl hover:-translate-y-0.5 inline-block">
                  {{ $t('join.apply_now') }}
                </a>
              </div>
            </div>
          </Transition>
        </div>

        <!-- No Data State -->
        <div v-if="jobs.length === 0" class="text-center py-20 text-gray-400">
           {{ $t('join.no_jobs') }}
        </div>
      </div>

      <!-- Pagination (Enhanced) -->
      <div v-if="totalPages > 1" class="mt-20 md:mt-40 flex justify-center items-center space-x-2">
        <button @click="changePage(currentPage - 1)" 
                :disabled="currentPage === 1"
                class="w-10 h-10 flex items-center justify-center rounded border border-gray-100 hover:border-[#BCA669] hover:text-[#BCA669] disabled:opacity-20 disabled:hover:border-gray-100 disabled:hover:text-gray-900 transition cursor-pointer bg-white">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
        </button>
        
        <div class="flex space-x-2">
          <template v-for="p in paginationPages" :key="p === '...' ? Math.random() : p">
            <button v-if="p !== '...'"
                    @click="changePage(p)"
                    class="w-10 h-10 rounded transition-all duration-300 font-medium text-sm"
                    :class="currentPage === p ? 'bg-[#BCA669] text-white shadow-md border border-[#BCA669]' : 'border border-gray-100 hover:border-[#BCA669] hover:text-[#BCA669] text-gray-400 bg-white'">
              {{ p }}
            </button>
            <span v-else class="w-10 h-10 flex items-center justify-center text-gray-400">...</span>
          </template>
        </div>

        <button @click="changePage(currentPage + 1)" 
                :disabled="currentPage === totalPages"
                class="w-10 h-10 flex items-center justify-center rounded border border-gray-100 hover:border-[#BCA669] hover:text-[#BCA669] disabled:opacity-20 disabled:hover:border-gray-100 disabled:hover:text-gray-900 transition cursor-pointer bg-white">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import request from '../api/request'
import { useI18n } from 'vue-i18n'
import PageBanner from '../components/PageBanner.vue'

import join1 from '../assets/images/join/1.png'
import join2 from '../assets/images/join/2.png'
import join3 from '../assets/images/join/3.png'
import join4 from '../assets/images/join/4.png'

const { locale } = useI18n()
const jobs = ref([])
const loading = ref(true)
const expandedIndex = ref(0) // Default expand first job

// Pagination Pages logic (e.g., 1 2 3 4 5 ... 11)
const paginationPages = computed(() => {
  const pages = []
  if (totalPages.value <= 7) {
    for (let i = 1; i <= totalPages.value; i++) pages.push(i)
  } else {
    if (currentPage.value <= 4) {
      for (let i = 1; i <= 5; i++) pages.push(i)
      pages.push('...')
      pages.push(totalPages.value)
    } else if (currentPage.value >= totalPages.value - 3) {
      pages.push(1)
      pages.push('...')
      for (let i = totalPages.value - 4; i <= totalPages.value; i++) pages.push(i)
    } else {
      pages.push(1)
      pages.push('...')
      for (let i = currentPage.value - 1; i <= currentPage.value + 1; i++) pages.push(i)
      pages.push('...')
      pages.push(totalPages.value)
    }
  }
  return pages
})

// Pagination state
const currentPage = ref(1)
const totalPages = ref(1)
const pageSize = 5

const fetchJobs = async (page = 1) => {
  loading.value = true
  try {
    const res = await request.get(`/public/jobs?page=${page}&limit=${pageSize}`)
    jobs.value = res.data
    totalPages.value = res.pagination.pages
    currentPage.value = res.pagination.page
  } catch (err) {
    console.error('Failed to fetch jobs', err)
  } finally {
    loading.value = false
  }
}

const toggleAccordion = (index) => {
  expandedIndex.value = expandedIndex.value === index ? -1 : index
}

const changePage = (page) => {
  if (page < 1 || page > totalPages.value) return
  fetchJobs(page)
  window.scrollTo({ top: 300, behavior: 'smooth' })
}

onMounted(() => {
  fetchJobs()
})
</script>

<style scoped>
.join-why-section::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: radial-gradient(#BCA669 0.5px, transparent 0.5px);
  background-size: 20px 20px;
  opacity: 0.05;
  pointer-events: none;
}
.expand-enter-active, .expand-leave-active {
  transition: all 0.3s ease-in-out;
  max-height: 1000px;
}
.expand-enter-from, .expand-leave-to {
  max-height: 0;
  opacity: 0;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}

/* Custom vertical alignment for the header content */
h3 {
  line-height: normal;
}
</style>
