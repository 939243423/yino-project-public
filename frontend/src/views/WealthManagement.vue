<template>
  <div class="wealth-management w-full overflow-x-hidden">
    <!-- Section 1: Hero Banner -->
    <section class="relative w-full h-[350px] md:h-auto md:aspect-[1920/400] bg-gray-900 overflow-hidden flex items-center justify-center">
      <div class="absolute inset-0 z-0">
        <img :src="heroBg" class="w-full h-full object-cover opacity-60" alt="Wealth Management Hero">
        <div class="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60"></div>
      </div>
      
      <div class="relative z-10 text-center px-6 max-w-5xl">
        <h1 class="text-4xl md:text-5xl font-bold text-white tracking-[0.2em] mb-4 opacity-0 animate-slide-up">
          {{ $t('wealth_mgmt.title') }}
        </h1>
        <p class="text-base md:text-xl text-white/90 tracking-widest mb-4 opacity-0 animate-slide-up delay-200">
          {{ $t('wealth_mgmt.subtitle_banner') }}
        </p>

        <p class="text-base md:text-lg text-[#BCA669] font-medium tracking-wide italic opacity-0 animate-slide-up delay-500">
          {{ $t('wealth_mgmt.quote') }}
        </p>
      </div>
    </section>

    <!-- Section 2: Intro/Quote Section -->
    <section class="relative py-16 md:py-20 px-6 overflow-hidden flex items-center justify-center">
      <div class="absolute inset-0 z-0">
        <img :src="whiteBg" class="w-full h-full object-cover" alt="Background">
      </div>
      <div class="max-w-6xl mx-auto relative z-10 px-6">
        <div class="flex items-center mb-10">
          <div class="flex gap-1.5 shrink-0">
            <div class="w-2.5 h-6 bg-[#BCA669] rounded-tl-xl"></div>
            <div class="w-2.5 h-6 bg-[#BCA669] rounded-tl-xl"></div>
          </div>
          <div class="flex-1 h-px bg-[#BCA669]/20 ml-8"></div>
        </div>
        <p class="text-[20px] text-gray-900 leading-[1.5] tracking-wider font-medium max-w-5xl mx-auto text-left indent-[2em]">
          {{ $t('wealth_mgmt.intro') }}
        </p>
        <div class="flex items-center mt-10">
          <div class="flex-1 h-px bg-[#BCA669]/20 mr-8"></div>
          <div class="flex gap-1.5 shrink-0">
            <div class="w-2.5 h-6 bg-[#BCA669] rounded-br-xl"></div>
            <div class="w-2.5 h-6 bg-[#BCA669] rounded-br-xl"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 3: Core Values Grid -->
    <section class="py-16 md:py-20 bg-[#F8F9FA] relative">
      <div class="max-w-7xl mx-auto px-4 md:px-6">
        <div class="text-center mb-16">
          <h2 class="section-title" v-html="$t('wealth_mgmt.values_title')"></h2>
          <p class="section-subtitle max-w-4xl mx-auto" v-html="$t('wealth_mgmt.values_subtitle')"></p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 justify-items-center mt-12">
          <div v-for="(value, index) in values" :key="index" 
               class="group relative w-full md:w-[580px] h-64 md:h-[320px] rounded-xl overflow-hidden shadow-lg transition-all duration-700">
            <img :src="value.img" class="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" :alt="value.title">
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:via-black/40 transition-all duration-500"></div>
            <div class="absolute inset-0 p-6 md:p-12 flex flex-col justify-end">
              <h3 class="text-xl md:text-3xl font-bold text-white mb-2 md:mb-4 transform transition-transform duration-500 group-hover:-translate-y-2">
                {{ value.title }}
              </h3>
              <div class="h-0.5 w-12 bg-[#BCA669] mb-4 md:mb-6 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"></div>
              <p class="text-white/90 text-[13px] md:text-base leading-relaxed opacity-100 md:opacity-0 md:group-hover:opacity-100 transform translate-y-0 md:translate-y-4 md:group-hover:translate-y-0 transition-all duration-500 delay-100">
                {{ value.desc }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 4: Selection Mechanism -->
    <section class="py-20 md:py-24 bg-white">
      <div class="max-w-7xl mx-auto px-4 md:px-6">
        <div class="text-center mb-16 md:mb-24">
          <h2 class="section-title" v-html="$t('wealth_mgmt.mechanism_title')"></h2>
          <p class="section-subtitle max-w-4xl mx-auto" v-html="$t('wealth_mgmt.mechanism_subtitle')"></p>
        </div>

        <div class="relative max-w-[1100px] mx-auto px-4">
          <!-- Step Grid -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-y-16 gap-x-6 md:gap-4 relative z-10">
            <div v-for="(step, i) in selectionSteps" :key="i" class="flex flex-col items-center group relative">
              <div class="relative mb-6 p-2 border border-[#BCA669]/20 border-dashed rounded-full group-hover:border-[#BCA669]/50 transition-all duration-300">
                <div class="w-32 h-32 md:w-[180px] md:h-[180px] rounded-full border-4 border-white shadow-xl overflow-hidden transition-transform duration-500 group-hover:scale-105">
                  <img :src="step.img" class="w-full h-full object-cover" :alt="step.title">
                </div>
              </div>
              <h3 class="text-[15px] md:text-xl font-bold text-gray-900 tracking-widest text-center">{{ step.title }}</h3>
              
              <!-- Connecting Arrows -->
              <div v-if="i < 3" class="absolute inset-0 pointer-events-none z-20">
                <!-- Mobile 2x2 Z-flow -->
                <div class="md:hidden">
                  <!-- 1 -> 2 (Horizontal) -->
                  <div v-if="i === 0" class="absolute top-[38px] -right-[48px] w-[75px] h-[51px]">
                    <img :src="arrowIcon" class="w-full h-full object-contain opacity-40">
                  </div>
                  <!-- 2 -> 3 (Diagonal Down-Left) -->
                  <div v-if="i === 1" class="absolute top-[180px] -left-[70px] w-[75px] h-[51px]">
                    <img :src="arrowIcon" class="w-full h-full object-contain rotate-[135deg] opacity-40">
                  </div>
                  <!-- 3 -> 4 (Horizontal) -->
                  <div v-if="i === 2" class="absolute top-[38px] -right-[48px] w-[75px] h-[51px]">
                    <img :src="arrowIcon" class="w-full h-full object-contain opacity-40">
                  </div>
                </div>

                <!-- Desktop Horizontal Flow -->
                <div class="hidden md:block absolute top-[65px] -right-[44px] w-[75px] h-[51px]">
                   <img :src="arrowIcon" class="w-full h-full object-contain opacity-30">
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-24 md:mt-32">
          <h4 class="text-[#BCA669] font-bold mb-6 tracking-widest text-lg md:text-xl" v-html="$t('wealth_mgmt.compliance_title')"></h4>
          <div class="p-8 md:p-12 rounded-2xl border border-gray-100 shadow-sm transition-all hover:shadow-md bg-[#BCA669]/5">
            <p class="compliance-text text-xs md:text-[13px] text-black leading-relaxed text-justify" v-html="$t('wealth_mgmt.compliance_p1')"></p>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 5: Final CTA -->
    <section class="relative min-h-[160px] py-12 md:py-0 md:h-[180px] px-6 overflow-hidden flex items-center justify-center">
      <div class="absolute inset-0 z-0">
        <img :src="ctaBg" class="w-full h-full object-cover" alt="CTA Background">
        <div class="absolute inset-0 bg-gradient-to-r from-[#BCA669]/40 to-[#BCA669]/20 backdrop-blur-[1px]"></div>
      </div>
      <div class="max-w-4xl mx-auto relative z-10 text-center flex flex-col items-center justify-center gap-4 md:gap-6">
        <h2 class="text-xl md:text-2xl font-bold text-white tracking-widest drop-shadow-lg leading-tight mb-1">
          {{ $t('wealth_mgmt.cta') }}
        </h2>
        <router-link to="/contact" class="inline-block bg-white text-gray-900 px-12 py-2.5 rounded-lg text-base font-bold hover:bg-gray-50 hover:scale-105 transition-all duration-300 shadow-xl shrink-0">
          {{ $t('common.consult') }}
        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import request from '../api/request'

const { t } = useI18n()

// Assets
import whiteBg from '../assets/images/fortune/white_bg.png'
import bg1 from '../assets/images/fortune/1.jpg'
import bg2 from '../assets/images/fortune/2.jpg'
import bg3 from '../assets/images/fortune/4.jpg'
import bg4 from '../assets/images/fortune/3.jpg'
import img5 from '../assets/images/fortune/5.png'
import arrowIcon from '../assets/images/fortune/5.png' 
import img6 from '../assets/images/fortune/6.png'
import img7 from '../assets/images/fortune/7.png'
import img8 from '../assets/images/fortune/8.png'
import img9 from '../assets/images/fortune/9.png'
import ctaBg from '../assets/images/fortune/10.jpg'

const heroBg = ref(bg1) // Default

onMounted(async () => {
  try {
    const banners = await request.get('/public/banners?category=wealth-management')
    if (banners && banners.length > 0) {
      heroBg.value = banners[0].image_url
    }
  } catch (err) {
    console.error('Failed to fetch wealth-management banners', err)
  }
})

const values = computed(() => [
  {
    title: t('wealth_mgmt.v1_title'),
    desc: t('wealth_mgmt.v1_desc'),
    img: bg1
  },
  {
    title: t('wealth_mgmt.v2_title'),
    desc: t('wealth_mgmt.v2_desc'),
    img: bg2
  },
  {
    title: t('wealth_mgmt.v3_title'),
    desc: t('wealth_mgmt.v3_desc'),
    img: bg3
  },
  {
    title: t('wealth_mgmt.v4_title'),
    desc: t('wealth_mgmt.v4_desc'),
    img: bg4
  }
])

const selectionSteps = computed(() => [
  { title: t('wealth_mgmt.step1'), img: img6 },
  { title: t('wealth_mgmt.step2'), img: img7 },
  { title: t('wealth_mgmt.step3'), img: img9 },
  { title: t('wealth_mgmt.step4'), img: img8 }
])




</script>

<style scoped>
@keyframes slide-up {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-slide-up {
  animation: slide-up 1s cubic-bezier(0.23, 1, 0.32, 1) forwards;
}

.delay-200 { animation-delay: 0.2s; }
.delay-300 { animation-delay: 0.4s; }
.delay-500 { animation-delay: 0.6s; }
</style>
