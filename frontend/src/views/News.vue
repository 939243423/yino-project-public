<template>
  <div class="min-h-screen bg-[#F8F9FA] flex flex-col pb-24">
    <PageBanner category="news" :title="$t('nav.news')" :subtitle="$t('news.banner_subtitle')" />

    <!-- Content Section -->
    <div class="max-w-7xl mx-auto w-full px-6 py-12 md:py-20 relative z-20">
      
      <!-- Tabs (Toggle style, clearly below banner) -->
      <div class="flex justify-center mb-16">
        <div class="inline-flex shadow-[0_8px_30_rgb(0,0,0,0.04)]">
          <button @click="switchTab('insight')" 
                  :class="['flex items-center justify-center font-bold transition-colors duration-300 w-[160px] h-[50px]', 
                   locale === 'en' ? 'text-base' : 'text-lg',
                   currentTab === 'insight' ? 'bg-[#C5A059] text-white' : 'bg-white text-gray-900 hover:text-[#C5A059]']">
            {{ $t('news.tab_insight') }}
          </button>
          <button @click="switchTab('info')" 
                  :class="['flex items-center justify-center font-bold transition-colors duration-300 w-[160px] h-[50px]', 
                   locale === 'en' ? 'text-base' : 'text-lg',
                   currentTab === 'info' ? 'bg-[#C5A059] text-white' : 'bg-white text-gray-900 hover:text-[#C5A059]']">
            {{ $t('news.tab_news') }}
          </button>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex flex-col items-center justify-center py-20 space-y-4">
        <div class="w-12 h-12 border-4 border-[#C5A059] border-t-transparent rounded-full animate-spin"></div>
        <p class="text-gray-400 font-medium tracking-widest">{{ $t('news.loading') }}</p>
      </div>

      <!-- Empty State -->
      <div v-else-if="news.length === 0" class="flex flex-col items-center justify-center py-32 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-gray-100">
        <div class="text-6xl mb-6 opacity-20 filter grayscale">📬</div>
        <h3 class="text-xl font-bold text-gray-900 mb-2 tracking-widest">{{ $t('news.no_data_title') }}</h3>
        <p class="text-gray-400 text-sm tracking-widest max-w-sm text-center leading-relaxed">{{ $t('news.no_data_subtitle') }}</p>
      </div>

      <!-- News List -->
      <div v-else class="space-y-6">
        <div v-for="(item, index) in news" :key="item.id" 
             @click="goToDetail(item.id)"
             class="group bg-white flex flex-col md:flex-row shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 hover:border-[#C5A059]/20 overflow-visible">
          
          <!-- Date Column -->
          <div class="relative w-full md:w-40 flex flex-col items-center justify-center py-8 md:py-0 bg-white text-gray-900 group-hover:bg-[#C5A059] group-hover:text-white transition-all duration-300 shrink-0">
            <span class="text-4xl md:text-5xl font-bold mb-2">{{ String(new Date(item.created_at).getDate()).padStart(2, '0') }}</span>
            <span class="text-xs md:text-sm font-medium tracking-wider opacity-80">{{ formatYearMonth(item.created_at) }}</span>
            <!-- Triangle indicator (Visible on hover for all cards) -->
            <div class="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 w-0 h-0 border-y-[12px] border-y-transparent border-l-[12px] border-l-[#C5A059] z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>

          <!-- Text Column -->
          <div class="flex-1 p-8 md:p-12 md:pl-12 flex flex-col justify-center">
            <h3 class="text-xl md:text-2xl font-bold mb-4 text-gray-900 group-hover:text-[#C5A059] transition-colors leading-tight">
              {{ locale === 'zh' ? item.title_zh : item.title_en }}
            </h3>
            <p class="text-gray-500 leading-relaxed line-clamp-2 text-sm md:text-[15px]">
              <template v-if="locale === 'zh'">
                {{ item.description_zh || (item.content_zh ? item.content_zh.replace(/<[^>]+>/g, '').substring(0, 100) + '...' : '') }}
              </template>
              <template v-else>
                {{ item.description_en || (item.content_en ? item.content_en.replace(/<[^>]+>/g, '').substring(0, 100) + '...' : '') }}
              </template>
            </p>
          </div>

          <!-- Image Column -->
          <div class="w-full md:w-[400px] h-[240px] shrink-0 p-3 md:p-6">
            <img :src="item.cover_url || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop'" 
                 class="w-full h-full object-cover rounded-sm" 
                 alt="News Cover" />
          </div>
        </div>

        <!-- Pagination -->
        <div v-if="pagination.pages > 0" class="flex justify-center items-center mt-16 space-x-2">
          <!-- Prev Button -->
          <button @click="changePage(pagination.page - 1)" 
                  :disabled="pagination.page === 1"
                  class="w-8 h-8 flex items-center justify-center rounded border border-gray-200 transition-colors disabled:opacity-30 disabled:hover:border-gray-200 cursor-pointer bg-white hover:border-[#C5A059] hover:text-[#C5A059]">
            <span class="text-xs">‹</span>
          </button>

          <!-- Page Numbers -->
          <div class="flex space-x-2">
            <template v-for="(p, i) in paginationItems" :key="i">
              <span v-if="p === '...'" class="w-8 h-8 flex flex-col items-center justify-center text-gray-400 font-medium">...</span>
              <button v-else @click="changePage(p)"
                      :class="['w-8 h-8 flex items-center justify-center rounded border transition-colors text-sm font-medium', p === pagination.page ? 'bg-[#B49E69] border-[#B49E69] text-white' : 'bg-white border-gray-200 text-gray-500 hover:border-[#C5A059] hover:text-[#C5A059]']">
                {{ p }}
              </button>
            </template>
          </div>

          <!-- Next Button -->
          <button @click="changePage(pagination.page + 1)" 
                  :disabled="pagination.page === pagination.pages || pagination.pages === 0"
                  class="w-8 h-8 flex items-center justify-center rounded border border-gray-200 transition-colors disabled:opacity-30 disabled:hover:border-gray-200 cursor-pointer bg-white hover:border-[#C5A059] hover:text-[#C5A059]">
            <span class="text-xs">›</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import request from '../api/request'
import { useI18n } from 'vue-i18n'
import PageBanner from '../components/PageBanner.vue'

const router = useRouter()
const route = useRoute()
const { locale } = useI18n()
const news = ref([])
const loading = ref(true)
const currentTab = ref(route.query.tab || 'insight')
const pagination = ref({
  total: 0,
  page: 1,
  limit: 5,
  pages: 0
})

const paginationItems = computed(() => {
  const current = pagination.value.page;
  const last = pagination.value.pages;
  const delta = 2;
  const left = current - delta;
  const right = current + delta + 1;
  const range = [];
  const rangeWithDots = [];
  let l;

  for (let i = 1; i <= last; i++) {
    if (i === 1 || i === last || (i >= left && i < right)) {
      range.push(i);
    }
  }

  for (const i of range) {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1);
      } else if (i - l !== 1) {
        rangeWithDots.push('...');
      }
    }
    rangeWithDots.push(i);
    l = i;
  }

  return rangeWithDots;
});

onMounted(() => {
  fetchNews()
})

const switchTab = (tab) => {
  if (currentTab.value === tab) return
  currentTab.value = tab
  router.replace({ query: { ...route.query, tab } })
}

watch(() => route.query.tab, (newTab) => {
  if (newTab && newTab !== currentTab.value) {
    currentTab.value = newTab
  }
})

watch(currentTab, () => {
  pagination.value.page = 1
  fetchNews()
})

const fetchNews = async () => {
  loading.value = true
  try {
    // Map info/insight tabs to news/insight categories
    const category = currentTab.value === 'info' ? 'news' : 'insight'
    const response = await request.get(`/public/news`, {
      params: {
        category,
        page: pagination.value.page,
        limit: pagination.value.limit
      }
    })
    news.value = response.data
    pagination.value = response.pagination
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
}

const changePage = (page) => {
  if (page < 1 || page > pagination.value.pages) return
  pagination.value.page = page
  fetchNews()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const formatYearMonth = (dateStr) => {
  const d = new Date(dateStr)
  if (locale.value === 'en') {
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
  }
  const month = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0')
  return month
}

const goToDetail = (id) => {
  router.push(`/news/${id}`)
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-clamp: 2;
  overflow: hidden;
}
</style>
