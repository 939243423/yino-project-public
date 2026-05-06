<template>
  <div class="min-h-screen bg-gray-50 flex flex-col py-12">
    <div class="max-w-[1100px] mx-auto w-full px-6 flex flex-col lg:flex-row gap-8">
      
      <!-- Main Content Area -->
      <div class="flex-1 min-w-0 overflow-hidden">
        <!-- Back Button -->
        <button @click="goBack" class="flex items-center space-x-2 text-white bg-yino-gold px-4 py-1.5 rounded shadow hover:bg-gold-600 transition mb-10 w-fit group text-sm">
          <span class="transform group-hover:-translate-x-1 transition-transform">←</span>
          <span class="font-bold">{{ $t('news.back') }}</span>
        </button>

        <!-- Article Card -->
        <div v-if="loading" class="bg-white p-20 rounded-2xl shadow-sm text-center">
           <div class="w-10 h-10 border-4 border-yino-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
           <p class="text-gray-400 font-medium">{{ $t('news.loading') }}</p>
        </div>

        <div v-else-if="article" class="bg-white p-7 md:p-10 rounded-2xl shadow-sm border border-gray-100">
          <h1 class="text-2xl md:text-[32px] font-bold text-gray-900 mb-6 leading-tight">
            {{ locale === 'zh' ? article.title_zh : article.title_en }}
          </h1>
          
          <div class="flex items-center space-x-6 text-sm text-gray-400 mb-10 border-b border-gray-100 pb-6">
            <span class="flex items-center"><span class="mr-2">📅</span>{{ new Date(article.created_at).toLocaleDateString(locale === 'en' ? 'en-US' : 'zh-CN') }}</span>
            <span class="flex items-center"><span class="mr-2">👁️</span>{{ article.views || 0 }}</span>
          </div>

          <!-- Article Body -->
          <article class="prose prose-base max-w-none text-gray-700 leading-relaxed space-y-6 overflow-hidden">
            <div v-html="locale === 'zh' ? article.content_zh : article.content_en" class="break-words"></div>
          </article>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="w-full lg:w-[320px] shrink-0">
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-24">
          <div class="p-5 border-b border-gray-50 bg-gray-50/50 flex items-center space-x-3">
             <span class="text-lg">📋</span>
             <h3 class="text-[15px] font-bold text-gray-800">{{ $t('news.recommendations') }}</h3>
          </div>
          
          <div class="p-5 space-y-5">
            <div v-for="(rec, index) in recommendations" :key="rec.id" 
                 @click="router.push(`/news/${rec.id}`)"
                 class="group cursor-pointer flex flex-col space-y-3 pb-6 border-b border-gray-100 last:border-0 last:pb-0">
              
              <!-- Only show cover for the first recommendation -->
              <div v-if="index === 0" class="relative h-36 overflow-hidden rounded-xl mb-1">
                <img :src="rec.cover_url || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop'" 
                     class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div class="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
              </div>

              <h4 class="font-bold text-gray-800 group-hover:text-yino-gold transition-colors leading-snug line-clamp-2"
                  :class="index === 0 ? 'text-base' : 'text-[14px]'">
                {{ locale === 'zh' ? rec.title_zh : rec.title_en }}
              </h4>
              <p class="text-xs text-gray-400">
                {{ new Date(rec.created_at).toLocaleDateString(locale === 'en' ? 'en-US' : 'zh-CN') }}
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import request from '../api/request'
import { useI18n } from 'vue-i18n'

const route = useRoute()
const router = useRouter()
const { locale } = useI18n()

const article = ref(null)
const recommendations = ref([])
const loading = ref(true)

const fetchNewsDetail = async (id) => {
  loading.value = true
  try {
    const res = await request.get(`/public/news/${id}`)
    article.value = res
    // After getting the article, fetch recommendations for the same category
    if (res && res.category) {
      await fetchRecommendations(res.category, id)
    }
  } catch (err) {
    console.error('Failed to fetch article detail', err)
  } finally {
    loading.value = false
  }
}

const goBack = () => {
  if (article.value && article.value.category === 'news') {
    router.push('/news?tab=info')
  } else {
    router.push('/news?tab=insight')
  }
}

const fetchRecommendations = async (category, currentId) => {
  try {
    // Current API returns { data: [], pagination: {} }
    // We send category to filter by same type, and a sufficient limit
    const res = await request.get('/public/news', { 
      params: { category, limit: 10 } 
    })
    
    const list = res.data || []
    
    // Filter out the current article and take top 5
    recommendations.value = list
      .filter(item => item.id !== parseInt(currentId))
      .slice(0, 5)
  } catch (err) {
    console.error('Failed to fetch recommendations', err)
  }
}

onMounted(() => {
  fetchNewsDetail(route.params.id)
})

// React to route changes if user clicks sidebar items
watch(() => route.params.id, (newId) => {
  if (newId) {
    fetchNewsDetail(newId)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Ensure rich text images are responsive and follow TinyMCE alignment */
:deep(.prose img) {
  max-width: 100% !important;
  height: auto !important;
  border-radius: 0.5rem;
  margin-top: 2rem;
  margin-bottom: 2rem;
  object-fit: contain;
}

:deep(.prose figure) {
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}
</style>
