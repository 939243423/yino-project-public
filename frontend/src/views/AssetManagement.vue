<template>
  <div class="asset-management w-full overflow-x-hidden">
    <!-- Section 1: Hero Banner -->
    <section class="relative w-full h-[350px] md:h-auto md:aspect-[1920/400] bg-gray-900 overflow-hidden flex items-center justify-center">
      <div class="absolute inset-0 z-0">
        <img :src="heroBg" class="w-full h-full object-cover opacity-60" alt="Asset Management Hero">
        <div class="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60"></div>
      </div>
      
      <div class="relative z-10 text-center px-6 max-w-5xl">
        <h1 class="text-4xl md:text-5xl font-bold text-white tracking-[0.2em] mb-4 opacity-0 animate-slide-up">
          {{ $t('asset_mgmt.title') }}
        </h1>
        <p class="text-base md:text-xl text-white/90 tracking-widest mb-4 opacity-0 animate-slide-up delay-200">
          {{ $t('asset_mgmt.subtitle_banner') }}
        </p>
        <p class="text-base md:text-lg text-[#C1A768] font-medium tracking-wide italic opacity-0 animate-slide-up delay-500">
          {{ $t('asset_mgmt.quote') }}
        </p>
      </div>
    </section>

    <!-- Section 2: Intro -->
    <section class="relative py-16 md:py-24 px-6 overflow-hidden flex items-center justify-center bg-white">
      <div class="max-w-6xl mx-auto relative z-10 px-6">
        <div class="flex items-center mb-10">
          <div class="flex gap-1.5 shrink-0">
            <div class="w-2.5 h-6 bg-[#C1A768] rounded-tl-xl"></div>
            <div class="w-2.5 h-6 bg-[#C1A768] rounded-tl-xl"></div>
          </div>
          <div class="flex-1 h-px bg-[#C1A768]/20 ml-8"></div>
        </div>
        <p class="text-[20px] text-gray-700 leading-[1.5] tracking-wider font-medium max-w-5xl mx-auto text-left indent-[2em]">
          {{ $t('asset_mgmt.intro') }}
        </p>
        <div class="flex items-center mt-10">
          <div class="flex-1 h-px bg-[#C1A768]/20 mr-8"></div>
          <div class="flex gap-1.5 shrink-0">
            <div class="w-2.5 h-6 bg-[#C1A768] rounded-br-xl"></div>
            <div class="w-2.5 h-6 bg-[#C1A768] rounded-br-xl"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 3: Why Choose Us -->
    <section class="py-20 md:py-24 bg-white">
      <div class="max-w-7xl mx-auto px-4 md:px-6">
        <h2 class="section-title text-center" v-html="$t('asset_mgmt.why_us')"></h2>
        
        <div class="lg:hidden space-y-16">
          <div v-for="(item, index) in reasons" :key="index" class="flex flex-col group">
            <div class="relative w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-xl mb-8">
              <img :src="item.img" class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" :alt="item.title">
            </div>
            <div class="px-2">
              <h3 class="text-2xl font-bold text-gray-900 mb-4 tracking-widest">{{ item.title }}</h3>
              <p class="text-gray-600 leading-relaxed text-base">{{ item.desc }}</p>
            </div>
          </div>
        </div>

        <div class="hidden lg:grid grid-cols-2 gap-16 items-center">
          <div class="space-y-12">
            <div v-for="(item, index) in reasons" :key="index" 
                 class="group pl-8 border-l-4 transition-all duration-500 cursor-pointer"
                 :class="activeIndex === index ? 'border-[#C1A768]' : 'border-transparent hover:border-[#C1A768]/50'"
                 @mouseenter="handleTabHover(index)">
              <h3 class="text-2xl font-bold mb-4" :class="activeIndex === index ? 'text-[#C1A768]' : 'text-gray-900'">{{ item.title }}</h3>
              <p class="leading-relaxed text-base" :class="activeIndex === index ? 'text-gray-700' : 'text-gray-500'">{{ item.desc }}</p>
            </div>
          </div>
          <div class="relative rounded-2xl overflow-hidden shadow-2xl h-[500px]">
            <swiper :modules="[Autoplay, EffectFade]" :slides-per-view="1" :loop="true" effect="fade" :autoplay="{ delay: 5000 }" class="h-full w-full" @swiper="onSwiperInit" @realIndexChange="onSlideChange">
              <swiper-slide v-for="(img, index) in carouselImages" :key="index">
                <img :src="img" class="w-full h-full object-cover" :alt="'Slide ' + (index + 1)">
              </swiper-slide>
            </swiper>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 4: Product Cards -->
    <section class="py-20 md:py-24 bg-[#F8F9FA]">
      <div class="max-w-7xl mx-auto px-4 md:px-6">
        <h2 class="section-title text-center">{{ $t('asset_mgmt.product_title') }}</h2>
        <p class="section-subtitle text-center mb-16 md:mb-24 max-w-2xl mx-auto">{{ $t('asset_mgmt.product_subtitle') }}</p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-[32px] max-w-[1152px] mx-auto">
          <!-- Card 1 -->
          <div class="bg-white rounded-2xl shadow-xl overflow-hidden group flex flex-col border border-gray-100 md:w-[560px] md:h-[668px]">
            <div :class="['bg-[#C1A768] relative shrink-0', $i18n.locale === 'en' ? 'px-6 py-4 md:px-10 md:py-6' : 'px-8 py-5 md:px-10 md:py-8']">
              <img :src="awardIcon" class="absolute top-6 right-8 w-10 h-10 md:w-20 md:h-20 opacity-30" alt="Award">
              <img :src="awardIcon" class="absolute top-6 right-8 w-10 h-10 md:w-20 md:h-20 opacity-30" alt="Award">
              <img :src="awardIcon" class="absolute top-6 right-8 w-10 h-10 md:w-20 md:h-20 opacity-30" alt="Award">
              <img :src="awardIcon" class="absolute top-6 right-8 w-10 h-10 md:w-20 md:h-20 opacity-30" alt="Award">
              <h3 :class="[
                'font-bold text-white tracking-wide',
                $i18n.locale === 'en' ? 'text-[18px] md:text-[25px] mb-1' : 'text-xl md:text-3xl mb-2'
              ]">{{ $t('asset_mgmt.fund1.name') }}</h3>
              <div class="flex items-center">
                <img :src="awardLeft" class="w-[16px] h-[29.4px] object-contain shrink-0" alt="Left">
                <p class="text-black text-[8.8px] md:text-[13px] leading-relaxed font-bold tracking-widest text-center">{{ $t('asset_mgmt.fund1.award') }}</p>
                <img :src="awardRight" class="w-[16px] h-[29.4px] object-contain shrink-0" alt="Right">
              </div>
            </div>
            <div :class="['px-8 flex-1 flex flex-col overflow-hidden', $i18n.locale === 'en' ? 'py-6 md:px-10 md:py-7' : 'py-8 md:px-10 md:py-8']">
              <p :class="['text-gray-500 text-[13px] md:text-[14px] leading-relaxed font-medium', $i18n.locale === 'en' ? 'mb-4' : 'mb-6']">{{ $t('asset_mgmt.fund1.desc') }}</p>
              <div :class="['border-t border-dashed border-gray-200 w-full', $i18n.locale === 'en' ? 'mb-4' : 'mb-6']"></div>
              <div :class="['grid grid-cols-1 md:grid-cols-[140px_1fr] w-full', $i18n.locale === 'en' ? 'gap-y-4 mb-4' : 'gap-y-6 mb-6']">
                <div class="flex flex-col gap-1 col-span-1">
                  <div class="text-black text-[13px] tracking-widest font-bold whitespace-nowrap">{{ $t('asset_mgmt.fund1.launched') }}</div>
                  <div class="text-[#C1A768] font-bold text-[14px] md:text-[15px]">{{ $t('asset_mgmt.fund1.launch_date') }}</div>
                </div>
                <div class="flex flex-col gap-1 col-span-1">
                  <div class="text-black text-[13px] tracking-widest font-bold">{{ $t('asset_mgmt.fund1.performance') }}</div>
                  <div class="text-[#C1A768] font-bold text-[13px] md:text-[14px] leading-relaxed">{{ $t('asset_mgmt.fund1.return_label') }}</div>
                </div>
                <div class="flex flex-col gap-1 col-span-1">
                  <div class="text-black text-[13px] tracking-widest font-bold whitespace-nowrap">{{ $t('asset_mgmt.fund1.holdings') }}</div>
                  <div class="text-[#C1A768] font-bold text-[13px] md:text-[14px] leading-relaxed">{{ $t('asset_mgmt.fund1.investment') }}</div>
                </div>
                <div class="flex flex-col gap-1 col-span-1">
                  <div class="text-black text-[13px] tracking-widest font-bold">{{ $t('asset_mgmt.fund1.objective') }}</div>
                  <div class="text-[#C1A768] font-bold text-[13px] md:text-[14px] leading-relaxed">{{ $t('asset_mgmt.fund1.target') }}</div>
                </div>
              </div>
              <div class="flex-1 flex flex-col">
                <h4 :class="['text-[16px] font-bold text-black tracking-widest text-center', $i18n.locale === 'en' ? 'mb-3' : 'mb-4']">{{ $t('asset_mgmt.fund1.highlights') }}</h4>
                <div :class="['bg-[#F8F9FA] rounded-2xl border border-gray-100 flex-1 flex flex-col', $i18n.locale === 'en' ? 'p-5' : 'p-6' ]">
                  <div class="flex-1 flex flex-col justify-center gap-y-5">
                    <div v-for="(highlight, i) in fund1Highlights" :key="i" class="flex items-center gap-4">
                      <img :src="checkIcon" class="w-5 h-5 shrink-0 object-contain" alt="Check">
                      <p class="text-[13px] md:text-[15px] text-[#110C00] leading-relaxed font-medium">{{ highlight }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Card 2 -->
          <div class="bg-white rounded-2xl shadow-xl overflow-hidden group flex flex-col border border-gray-100 md:w-[560px] md:h-[668px]">
            <div :class="['bg-[#C1A768] relative shrink-0', $i18n.locale === 'en' ? 'px-6 py-4 md:px-10 md:py-6' : 'px-8 py-5 md:px-10 md:py-8']">
              <img :src="trendIcon" class="absolute top-6 right-8 w-10 h-10 md:w-20 md:h-20 opacity-30" alt="Trend">
              <img :src="trendIcon" class="absolute top-6 right-8 w-10 h-10 md:w-20 md:h-20 opacity-30" alt="Trend">
              <img :src="trendIcon" class="absolute top-6 right-8 w-10 h-10 md:w-20 md:h-20 opacity-30" alt="Trend">
              <img :src="trendIcon" class="absolute top-6 right-8 w-10 h-10 md:w-20 md:h-20 opacity-30" alt="Trend">
              <h3 :class="[
                'font-bold text-white tracking-wide',
                $i18n.locale === 'en' ? 'text-[18px] md:text-[25px] whitespace-nowrap mb-1' : 'text-xl md:text-3xl mb-2'
              ]">{{ $t('asset_mgmt.fund2.name') }}</h3>
              <div class="h-[29.4px] opacity-0 select-none">Spacer</div>
            </div>
            <div :class="['px-8 flex-1 flex flex-col overflow-hidden', $i18n.locale === 'en' ? 'py-6 md:px-10 md:py-7' : 'py-8 md:px-10 md:py-8']">
              <p :class="['text-gray-500 text-[13px] md:text-[14px] leading-relaxed font-medium', $i18n.locale === 'en' ? 'mb-4' : 'mb-6']">{{ $t('asset_mgmt.fund2.desc') }}</p>
              <div :class="['border-t border-dashed border-gray-200 w-full', $i18n.locale === 'en' ? 'mb-4' : 'mb-6']"></div>
              <div :class="['grid grid-cols-1 md:grid-cols-[140px_1fr] w-full', $i18n.locale === 'en' ? 'gap-y-4 mb-4' : 'gap-y-6 mb-6']">
                <div class="flex flex-col gap-1 col-span-1">
                  <div class="text-black text-[13px] tracking-widest font-bold">{{ $t('asset_mgmt.fund2.launched') }}</div>
                  <div class="text-[#C1A768] font-bold text-[14px] md:text-[15px]">{{ $t('asset_mgmt.fund2.launch_date') }}</div>
                </div>
                <div class="flex flex-col gap-1 col-span-1">
                  <div class="text-black text-[13px] tracking-widest font-bold">{{ $t('asset_mgmt.fund2.objective') }}</div>
                  <div class="text-[#C1A768] font-bold text-[13px] md:text-[14px]">{{ $t('asset_mgmt.fund2.target') }}</div>
                </div>
                <div class="flex flex-col gap-1 col-span-1 md:col-span-2">
                  <div class="text-black text-[13px] tracking-widest font-bold">{{ $t('asset_mgmt.fund2.holdings') }}</div>
                  <div class="text-[#C1A768] font-bold text-[13px] md:text-[14px] leading-relaxed">{{ $t('asset_mgmt.fund2.investment') }}</div>
                </div>
              </div>
              <div class="flex-1 flex flex-col">
                <h4 :class="['text-[16px] font-bold text-black tracking-widest text-center', $i18n.locale === 'en' ? 'mb-3' : 'mb-4']">{{ $t('asset_mgmt.fund2.highlights') }}</h4>
                <div :class="['bg-[#F8F9FA] rounded-2xl border border-gray-100 flex-1 flex flex-col', $i18n.locale === 'en' ? 'p-5' : 'p-6' ]">
                  <div class="flex-1 flex flex-col justify-center gap-y-5">
                    <div v-for="(highlight, i) in fund2Highlights" :key="i" class="flex items-center gap-4">
                      <img :src="checkIcon" class="w-5 h-5 shrink-0 object-contain" alt="Check">
                      <p class="text-[13px] md:text-[15px] text-[#110C00] leading-relaxed font-medium">{{ highlight }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 5: Commitment -->
    <section class="py-20 md:py-24 px-4 md:px-6 relative bg-cover bg-center bg-no-repeat" :style="{ backgroundImage: `url(${commitmentBg})` }">
      <div class="max-w-7xl mx-auto relative z-10">
        <h2 class="section-title text-center">{{ $t('asset_mgmt.commitment') }}</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-20 mt-16 md:mt-24">
          <div v-for="(item, i) in commitments" :key="i" class="flex flex-row md:flex-col items-center md:text-center group gap-6 md:gap-0">
            <div class="shrink-0 w-16 h-16 md:w-24 md:h-24 flex items-center justify-center rounded-2xl bg-[#F8F9FA] transition-transform md:mb-8">
              <img :src="item.icon" class="w-10 h-10 md:w-14 md:h-14 object-contain" :alt="item.title">
            </div>
            <div class="flex-1">
              <h3 class="text-xl md:text-2xl font-bold text-gray-900 mb-2 md:mb-4 tracking-wide">{{ item.title }}</h3>
              <p class="text-gray-900 text-[13px] md:text-base leading-relaxed md:px-6" v-html="item.desc"></p>
            </div>
          </div>
        </div>
        <div class="mt-24">
          <h4 class="text-[#C1A768] font-bold mb-6 tracking-widest text-lg md:text-xl" v-html="$t('asset_mgmt.compliance_title')"></h4>
          <div class="p-8 md:p-12 rounded-2xl border border-gray-100 shadow-sm bg-[#C1A768]/5">
            <div class="compliance-text text-[11px] md:text-[13px] text-black space-y-4 leading-relaxed text-left">
              <p v-html="$t('asset_mgmt.compliance_p1')"></p>
              <p v-html="$t('asset_mgmt.compliance_p2')"></p>
              <p v-html="$t('asset_mgmt.compliance_p3')"></p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 6: CTA -->
    <section class="relative min-h-[160px] py-12 md:py-0 md:h-[180px] px-6 overflow-hidden flex items-center justify-center">
      <div class="absolute inset-0 z-0">
        <img :src="ctaBg" class="w-full h-full object-cover" alt="CTA Background">
        <div class="absolute inset-0 bg-gradient-to-r from-[#C1A768]/40 to-[#C1A768]/20 backdrop-blur-[1px]"></div>
      </div>
      <div class="max-w-4xl mx-auto relative z-10 text-center flex flex-col items-center justify-center gap-4">
        <h2 class="text-xl md:text-2xl font-bold text-white tracking-widest drop-shadow-lg mb-1">
          {{ $t('asset_mgmt.cta') }}
        </h2>
        <router-link to="/contact" class="inline-block bg-white text-gray-900 px-12 py-2.5 rounded-lg text-base font-bold transition-all shadow-xl">
          {{ $t('common.consult') }}
        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, EffectFade } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-fade'
import { useI18n } from 'vue-i18n'
import request from '../api/request'

const { t } = useI18n()

import heroBgStatic from '../assets/images/manage/6.png'
import whiteBg from '../assets/images/manage/white_bg.png'
import img1 from '../assets/images/manage/1.png'
import img3 from '../assets/images/manage/2.png'
import img2 from '../assets/images/manage/3.png'
import awardIcon from '../assets/images/manage/4.png'
import trendIcon from '../assets/images/manage/5.png'
import commitmentBg from '../assets/images/manage/6.png'
import iconMoney from '../assets/images/manage/8.png'
import iconGlass from '../assets/images/manage/9.png'
import iconShield from '../assets/images/manage/10.png'
import ctaBg from '../assets/images/manage/7.jpg'
import awardLeft from '../assets/images/manage/11.png'
import awardRight from '../assets/images/manage/12.png'
import checkIcon from '../assets/images/manage/13.png'

const activeIndex = ref(0)
const heroBg = ref(heroBgStatic)
const carouselImages = [img1, img2, img3]
const swiperInstance = ref(null)

const onSwiperInit = (swiper) => {
  swiperInstance.value = swiper
}

const handleTabHover = (index) => {
  activeIndex.value = index
  if (swiperInstance.value) {
    swiperInstance.value.slideToLoop(index)
  }
}

onMounted(async () => {
  try {
    const banners = await request.get('/public/banners?category=asset-management')
    if (banners && banners.length > 0) {
      heroBg.value = banners[0].image_url
    }
  } catch (err) {
    console.error('Failed to fetch asset-management banners', err)
  }
})

const reasons = computed(() => [
  { title: t('asset_mgmt.reason1_title'), desc: t('asset_mgmt.reason1_desc'), img: img1 },
  { title: t('asset_mgmt.reason2_title'), desc: t('asset_mgmt.reason2_desc'), img: img2 },
  { title: t('asset_mgmt.reason3_title'), desc: t('asset_mgmt.reason3_desc'), img: img3 }
])

const fund1Highlights = computed(() => [t('asset_mgmt.fund1.h1'), t('asset_mgmt.fund1.h2'), t('asset_mgmt.fund1.h3')])
const fund2Highlights = computed(() => [t('asset_mgmt.fund2.h1'), t('asset_mgmt.fund2.h2'), t('asset_mgmt.fund2.h3')])

const commitments = computed(() => [
  { title: t('asset_mgmt.comm_title1'), desc: t('asset_mgmt.comm_desc1'), icon: iconMoney },
  { title: t('asset_mgmt.comm_title2'), desc: t('asset_mgmt.comm_desc2'), icon: iconGlass },
  { title: t('asset_mgmt.comm_title3'), desc: t('asset_mgmt.comm_desc3'), icon: iconShield }
])

const onSlideChange = (swiper) => {
  activeIndex.value = swiper.realIndex % reasons.value.length
}
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
.delay-500 { animation-delay: 0.6s; }
</style>
