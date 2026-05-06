<template>
  <div class="family-office w-full overflow-x-hidden">
    <!-- Section 1: Hero Banner -->
    <section class="relative w-full h-[350px] md:h-auto md:aspect-[1920/400] bg-gray-900 overflow-hidden flex items-center justify-center">
      <div class="absolute inset-0 z-0">
        <img :src="heroBg" class="w-full h-full object-cover opacity-60" alt="Family Office Hero">
        <div class="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60"></div>
      </div>
      
      <div class="relative z-10 text-center px-6 max-w-5xl">
        <h1 class="text-4xl md:text-5xl font-bold text-white tracking-[0.3em] mb-4 opacity-0 animate-slide-up">
          {{ $t('family_office.title') }}
        </h1>
        <p class="text-base md:text-xl text-white/90 tracking-widest mb-4 opacity-0 animate-slide-up delay-200">
          {{ $t('family_office.subtitle_banner') }}
        </p>

        <p class="text-base md:text-lg text-[#BCA669] font-medium tracking-wide italic opacity-0 animate-slide-up delay-500">
          {{ $t('family_office.quote') }}
        </p>
      </div>
    </section>

    <!-- Section 2: Quote Section -->
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
        <p class="text-[18px] md:text-[20px] text-gray-900 leading-[1.6] tracking-wider font-medium max-w-5xl mx-auto text-left indent-[2em]">
          {{ $t('family_office.intro') }}
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

    <!-- Section 3: Service Grid Section -->
    <section class="py-20 md:py-24 bg-white">
      <div class="max-w-7xl mx-auto px-4 md:px-6">
        <div class="text-center mb-16 md:mb-20">
          <h2 class="section-title" v-html="$t('family_office.services_title')"></h2>
          <p class="section-subtitle max-w-4xl mx-auto" v-html="$t('family_office.services_subtitle')"></p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 justify-items-center mt-12">
          <div v-for="(service, index) in services" :key="index" 
               class="group relative w-full md:w-[580px] h-64 md:h-[320px] rounded-xl overflow-hidden shadow-lg transition-all duration-700 cursor-pointer">
            <img :src="service.img" class="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" :alt="service.title">
            <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent group-hover:via-black/50 transition-all duration-500"></div>
            <div class="absolute inset-0 p-6 md:p-12 flex flex-col justify-end">
              <h3 class="text-xl md:text-3xl font-bold text-white mb-2 md:mb-4 transform group-hover:-translate-y-2 transition-transform duration-500">
                {{ service.title }}
              </h3>
              <div class="h-0.5 w-12 bg-[#BCA669] mb-4 md:mb-6 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"></div>
              <p :class="['text-[#BCA669] font-bold text-[13px] md:text-sm mb-2 transition-all duration-500 delay-100', service.subtitle ? 'opacity-100 translate-y-0 md:opacity-0 md:group-hover:opacity-100 md:translate-y-4 md:group-hover:translate-y-0' : 'hidden']">
                {{ service.subtitle }}
              </p>
              <p class="text-white/90 text-xs md:text-[15px] leading-relaxed opacity-100 md:opacity-0 md:group-hover:opacity-100 transform translate-y-0 md:translate-y-4 md:group-hover:translate-y-0 transition-all duration-500 delay-200">
                {{ service.desc }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 4: Solution Section -->
    <section class="py-20 md:py-24 bg-white">
      <div class="max-w-7xl mx-auto px-4 md:px-6">
        <div class="text-center mb-16 md:mb-24">
          <h2 class="section-title" v-html="$t('family_office.solution_title')"></h2>
          <p class="section-subtitle max-w-6xl mx-auto" v-html="$t('family_office.solution_subtitle')"></p>
        </div>

        <div class="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center mb-16 md:mb-20 mt-12">
          <!-- Left Image -->
          <div class="w-full lg:w-[40%]">
            <div class="relative rounded-2xl overflow-hidden shadow-2xl group">
              <img :src="solutionImg" class="w-full h-auto transition-transform duration-1000 group-hover:scale-105" alt="Twin City Solution">
              <div class="absolute inset-0 bg-gradient-to-tr from-[#BCA669]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          </div>

          <!-- Feature List -->
          <div class="w-full lg:w-[60%] space-y-8 md:space-y-12 px-2 md:px-0">
            <div v-for="(item, i) in solutionItems" :key="i" class="flex flex-row items-start md:items-start gap-4 md:gap-6 group text-left">
              <div class="shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-xl bg-gray-50 md:bg-white flex items-center justify-center transition-transform group-hover:scale-110">
                <img :src="item.icon" class="w-8 h-8 md:w-9 md:h-9 object-contain" :alt="item.title">
              </div>
              <div>
                <h3 class="text-base md:text-xl font-bold text-gray-900 mb-1.5 md:mb-2 group-hover:text-[#BCA669] transition-colors tracking-wide">{{ item.title }}</h3>
                <p class="text-gray-500 text-[13px] md:text-base leading-relaxed max-w-4xl opacity-90">{{ item.desc }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Compliance Box -->
        <div class="mt-20">
          <h4 class="text-[#BCA669] font-bold mb-5 tracking-widest text-lg" v-html="$t('family_office.compliance_title')"></h4>
          <div class="p-8 rounded-2xl border border-gray-100 shadow-sm bg-[#BCA669]/5">
            <p class="compliance-text text-xs text-black leading-relaxed" v-html="$t('family_office.compliance_p1')"></p>
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
          {{ $t('family_office.cta') }}
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
import whiteBg from '../assets/images/family/white_bg.png'
import heroBgStatic from '../assets/images/family/white_bg.png' // Fallback for hero
import img2 from '../assets/images/family/2.png'
import img3 from '../assets/images/family/3.png'
import img4 from '../assets/images/family/4.png'
import img5 from '../assets/images/family/5.png'
import solutionImg from '../assets/images/family/6.png'
import icon新加坡 from '../assets/images/family/8.png'
import icon路径 from '../assets/images/family/7.png'
import icon实操 from '../assets/images/family/9.png'
import ctaBg from '../assets/images/family/1.jpg'

const heroBg = ref(heroBgStatic)

onMounted(async () => {
  try {
    const banners = await request.get('/public/banners?category=family-office')
    if (banners && banners.length > 0) {
      heroBg.value = banners[0].image_url
    }
  } catch (err) {
    console.error('Failed to fetch family-office banners', err)
  }
})

const services = computed(() => [
  {
    title: t('family_office.s1_title'),
    subtitle: t('family_office.s1_subtitle'),
    desc: t('family_office.s1_desc'),
    img: img2
  },
  {
    title: t('family_office.s2_title'),
    subtitle: t('family_office.s2_subtitle'),
    desc: t('family_office.s2_desc'),
    img: img3
  },
  {
    title: t('family_office.s3_title'),
    subtitle: t('family_office.s3_subtitle'),
    desc: t('family_office.s3_desc'),
    img: img4
  },
  {
    title: t('family_office.s4_title'),
    subtitle: t('family_office.s4_subtitle'),
    desc: t('family_office.s4_desc'),
    img: img5
  }
])

const solutionItems = computed(() => [
  {
    title: t('family_office.item1_title'),
    desc: t('family_office.item1_desc'),
    icon: icon新加坡
  },
  {
    title: t('family_office.item2_title'),
    desc: t('family_office.item2_desc'),
    icon: icon路径
  },
  {
    title: t('family_office.item3_title'),
    desc: t('family_office.item3_desc'),
    icon: icon实操
  }
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
