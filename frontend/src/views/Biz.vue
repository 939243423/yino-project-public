<template>
  <div class="bg-[#F8F9FA] min-h-screen">
    <PageBanner category="services" :title="$t('nav.biz')" :subtitle="$t('biz.banner_subtitle')" />

    <!-- ① 面对的挑战 - Full Width with Mountain Background -->
    <section class="relative py-24 px-6 overflow-hidden min-h-[700px] flex items-center bg-[#F8F9FA]">
      <!-- Background Image (Mountain) -->
      <div class="absolute inset-0 z-0 pointer-events-none">
        <img :src="biz9" class="w-full h-full object-cover opacity-60" alt="Mountain Background">
        <!-- Overlay for transition and readability -->
        <div class="absolute inset-0 bg-gradient-to-r from-white/40 via-transparent to-transparent"></div>
      </div>

      <div class="max-w-6xl mx-auto w-full relative z-10">
        <!-- Top Title -->
        <div class="text-center mb-0 md:mb-8">
          <h2 class="section-title mb-3 tracking-widest">{{ $t('biz.challenges.title') }}</h2>
          <p class="section-subtitle tracking-wide">{{ $t('biz.challenges.subtitle') }}</p>
        </div>

        <!-- Bubbles Area (Responsive Diagonal Layout) -->
        <div class="relative w-full h-[400px] md:h-[500px]">
          <!-- SVG connector lines (Diagonal Path) -->
          <svg class="absolute inset-0 w-full h-full hidden md:block" viewBox="0 0 1000 500" fill="none" preserveAspectRatio="none">
            <path d="M150 400 L380 300 L620 200 L850 100" stroke="#BCA669" stroke-width="1" stroke-dasharray="8 6" opacity="0.15"/>
          </svg>

          <!-- Bubble: 全球变局 (Bottom Left) -->
          <div @click="setChallenge(0)" 
               :class="['absolute cursor-pointer flex items-center justify-center rounded-full font-medium transition-all duration-700 select-none group',
                        activeChallenge === 0 
                          ? 'w-32 h-32 md:w-44 md:h-44 bg-[#BCA669] text-white shadow-[0_20px_60px_rgba(188,166,105,0.4)] scale-110 z-30' 
                          : 'w-24 h-24 md:w-36 md:h-36 bg-white/80 backdrop-blur-sm text-gray-700 shadow-lg border border-white/50 hover:border-[#BCA669]/40 z-10']"
               style="left: 5%; bottom: 5%;">
            <span :class="activeChallenge === 0 ? 'text-lg font-bold' : 'text-sm md:text-base font-bold'">{{ $t('biz.challenges.c1_title') }}</span>
          </div>

          <!-- Bubble: 配置困境 (Mid Left) -->
          <div @click="setChallenge(1)"
               :class="['absolute cursor-pointer flex items-center justify-center rounded-full font-medium transition-all duration-700 select-none group',
                        activeChallenge === 1 
                          ? 'w-32 h-32 md:w-44 md:h-44 bg-[#BCA669] text-white shadow-[0_20px_60px_rgba(188,166,105,0.4)] scale-110 z-30' 
                          : 'w-24 h-24 md:w-36 md:h-36 bg-white/80 backdrop-blur-sm text-gray-700 shadow-lg border border-white/50 hover:border-[#BCA669]/40 z-10']"
               style="left: 30%; bottom: 25%;">
            <span :class="activeChallenge === 1 ? 'text-lg font-bold' : 'text-sm md:text-base font-bold'">{{ $t('biz.challenges.c2_title') }}</span>
          </div>

          <!-- Bubble: 传承焦虑 (Center High) -->
          <div @click="setChallenge(2)"
               :class="['absolute cursor-pointer flex items-center justify-center rounded-full font-medium transition-all duration-700 select-none group',
                        activeChallenge === 2 
                          ? 'w-32 h-32 md:w-44 md:h-44 bg-[#BCA669] text-white shadow-[0_20px_60px_rgba(188,166,105,0.4)] scale-110 z-30' 
                          : 'w-24 h-24 md:w-36 md:h-36 bg-white/80 backdrop-blur-sm text-gray-700 shadow-lg border border-white/50 hover:border-[#BCA669]/40 z-10']"
               style="left: 55%; bottom: 45%;">
            <span :class="activeChallenge === 2 ? 'text-lg font-bold' : 'text-sm md:text-base font-bold'">{{ $t('biz.challenges.c3_title') }}</span>
          </div>

          <!-- Bubble: 信任缺失 (Top Right) -->
          <div @click="setChallenge(3)"
               :class="['absolute cursor-pointer flex items-center justify-center rounded-full font-medium transition-all duration-700 select-none group',
                        activeChallenge === 3 
                          ? 'w-32 h-32 md:w-44 md:h-44 bg-[#BCA669] text-white shadow-[0_20px_60px_rgba(188,166,105,0.4)] scale-110 z-30' 
                          : 'w-24 h-24 md:w-36 md:h-36 bg-white/80 backdrop-blur-sm text-gray-700 shadow-lg border border-white/50 hover:border-[#BCA669]/40 z-10']"
               style="left: 80%; bottom: 65%;">
            <span :class="activeChallenge === 3 ? 'text-lg font-bold' : 'text-sm md:text-base font-bold'">{{ $t('biz.challenges.c4_title') }}</span>
          </div>
        </div>

        <!-- Bottom Content Area -->
        <div class="max-w-xl mx-auto text-center mt-[-40px] md:mt-[-80px]">
          <Transition name="challenge-fade" mode="out-in">
            <div :key="activeChallenge" class="space-y-4">
              <h4 class="text-3xl font-bold text-gray-900 tracking-widest">{{ challenges[activeChallenge].title }}</h4>
              <p class="text-gray-500 text-sm leading-relaxed max-w-lg mx-auto">{{ challenges[activeChallenge].desc }}</p>
            </div>
          </Transition>
        </div>
      </div>
    </section>





    <!-- ③ 内循环 财富管理 -->
    <section id="wealth-management" class="py-20 bg-white">
      <div class="max-w-5xl mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="section-title mb-3">{{ $t('biz.wealth.title') }}</h2>
          <p class="section-subtitle">{{ $t('biz.wealth.subtitle') }}</p>
        </div>

        <!-- 三层筛选机制 -->
        <h3 class="text-center text-lg font-bold text-gray-700 mb-8 tracking-widest">{{ $t('biz.wealth.mechanism') }}</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div v-for="card in wealthCards" :key="card.title" class="bg-white rounded-xl p-10 flex flex-col items-center text-center shadow-[0_10px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-gray-50 transition-all duration-500 group">
            <div class="w-20 h-20 mb-8 flex items-center justify-center bg-gray-50 rounded-full group-hover:bg-[#BCA669]/5 transition-colors duration-500">
              <img :src="card.icon" class="w-12 h-12 object-contain" :alt="card.title" />
            </div>
            <h4 class="text-lg font-bold text-gray-900 mb-4">{{ card.title }}</h4>
            <p class="text-sm text-gray-500 leading-relaxed px-2">{{ card.desc }}</p>
          </div>
        </div>

        <!-- 基金特色 -->
        <h3 class="text-center text-lg font-bold text-gray-700 mb-8 tracking-widest">{{ $t('biz.wealth.features_title') }}</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div v-for="f in wealthFeatures" :key="f.title" class="border border-[#BCA669]/10 rounded-xl p-8 flex flex-col items-center text-center bg-gradient-to-b from-[#FFFBF5] to-white hover:shadow-xl transition-all duration-500 group">
            <h4 class="text-base font-bold text-[#BCA669] mb-4 group-hover:scale-110 transition-transform">{{ f.title }}</h4>
            <p class="text-xs text-gray-500 leading-relaxed">{{ f.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ④ 外循环 资产管理 -->
    <section id="asset-management" class="py-20 px-6 max-w-5xl mx-auto">
      <div class="text-center mb-16">
        <h2 class="section-title mb-3">{{ $t('biz.asset.title') }}</h2>
        <p class="section-subtitle">{{ $t('biz.asset.subtitle') }}</p>
      </div>

      <!-- Fund Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <!-- Fund 1 -->
        <div class="relative rounded-2xl bg-white shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col pt-2">
          <!-- Gold Top Bar -->
          <div class="absolute top-0 inset-x-0 h-1.5 bg-[#BCA669]"></div>
          
          <div class="p-10 flex flex-col flex-1">
            <h4 class="text-2xl font-bold text-gray-900 mb-3 text-center md:text-left">{{ $t('biz.asset.fund1_title') }}</h4>
            <p class="text-sm text-gray-400 mb-8 text-center md:text-left">{{ $t('biz.asset.fund1_subtitle') }}</p>
            
            <!-- Dashed Line -->
            <div class="border-b border-dashed border-gray-200 mb-8 w-full"></div>
            
            <div class="bg-[#F8F9FA] rounded-2xl p-8 space-y-5">
              <div v-for="f in [$t('biz.asset.fund1_f1'),$t('biz.asset.fund1_f2'),$t('biz.asset.fund1_f3')]" :key="f" class="flex items-center gap-4 text-sm text-gray-700 font-bold">
                <span class="w-6 h-6 rounded-full bg-[#BCA669]/20 flex items-center justify-center text-[#BCA669] font-bold text-sm">✓</span>{{ f }}
              </div>
            </div>
          </div>
        </div>
        
        <!-- Fund 2 -->
        <div class="relative rounded-2xl bg-white shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col pt-2">
          <!-- Gold Top Bar -->
          <div class="absolute top-0 inset-x-0 h-1.5 bg-[#BCA669]"></div>
          
          <div class="p-10 flex flex-col flex-1">
            <h4 class="text-2xl font-bold text-gray-900 mb-3 text-center md:text-left">{{ $t('biz.asset.fund2_title') }}</h4>
            <p class="text-sm text-gray-400 mb-8 text-center md:text-left">{{ $t('biz.asset.fund2_subtitle') }}</p>
            
            <!-- Dashed Line -->
            <div class="border-b border-dashed border-gray-200 mb-8 w-full"></div>
            
            <div class="bg-[#F8F9FA] rounded-2xl p-8 space-y-5">
              <div v-for="f in [$t('biz.asset.fund2_f1'),$t('biz.asset.fund2_f2'),$t('biz.asset.fund2_f3')]" :key="f" class="flex items-center gap-4 text-sm text-gray-700 font-bold">
                <span class="w-6 h-6 rounded-full bg-[#BCA669]/20 flex items-center justify-center text-[#BCA669] font-bold text-sm">✓</span>{{ f }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 基金特色 -->
      <h3 class="text-center text-lg font-bold text-gray-700 mb-8 tracking-widest">{{ $t('biz.asset.features_title') }}</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div v-for="f in assetFeatures" :key="f.title" class="border border-[#BCA669]/10 rounded-xl p-8 flex flex-col items-center text-center bg-gradient-to-b from-[#FFFBF5] to-white hover:shadow-xl transition-all duration-500 group">
          <h4 class="text-base font-bold text-[#BCA669] mb-4 group-hover:scale-110 transition-transform">{{ f.title }}</h4>
          <p class="text-xs text-gray-500 leading-relaxed">{{ f.desc }}</p>
        </div>
      </div>
    </section>

    <!-- ⑤ 生态支撑 家办服务 -->
    <section id="family-service" class="py-20 bg-white">
      <div class="max-w-5xl mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="section-title mb-3">{{ $t('biz.family.title') }}</h2>
          <p class="section-subtitle">{{ $t('biz.family.subtitle') }}</p>
        </div>

        <!-- 2x2 Image Grid -->
        <div class="grid grid-cols-2 gap-2 rounded-2xl overflow-hidden shadow-lg">
          <div v-for="card in familyCards" :key="card.title" class="group relative h-56 overflow-hidden cursor-pointer">
            <img :src="card.img" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" :alt="card.title">
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
            <div class="absolute bottom-5 left-5 text-white">
              <h4 class="text-lg font-bold">{{ card.title }}</h4>
              <p v-if="card.desc" class="text-xs text-white/80 mt-1">{{ card.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ⑥ 客户案例 -->
    <section id="client-cases" class="py-24 px-6 max-w-5xl mx-auto overflow-visible">
      <div class="text-center mb-16">
        <h2 class="section-title mb-3 tracking-widest">{{ $t('biz.case.title') }}</h2>
        <p class="section-subtitle">{{ $t('biz.case.subtitle') }}</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start">
        <!-- Left: Profile Card -->
        <div class="flex flex-col items-center">
          <h4 class="text-2xl font-bold text-gray-800 mb-10 w-full text-center">{{ $t('biz.case.profile_title') }}</h4>
          <div class="relative bg-white rounded-xl shadow-xl border border-gray-50 flex flex-col pt-0 w-full max-w-[360px]">
            <!-- Overlapping Avatar Row -->
            <div class="flex items-center gap-6 -ml-10 p-8 pt-10">
              <div class="w-24 h-24 rounded-full border-4 border-white shadow-xl overflow-hidden shrink-0 bg-gray-100">
                <img :src="biz8" class="w-full h-full object-cover" :alt="$t('biz.case.name')">
              </div>
              <div class="flex items-baseline gap-3">
                <span class="text-3xl font-bold text-gray-900 whitespace-nowrap">{{ $t('biz.case.name') }}</span>
                <span class="text-lg text-[#BCA669]/60 font-medium whitespace-nowrap">{{ $t('biz.case.age') }}</span>
              </div>
            </div>
            
            <!-- Info Table Rows -->
            <div class="flex flex-col border-t border-gray-50">
              <div class="bg-gray-100/50 py-3 text-center text-sm text-gray-400 font-medium tracking-widest uppercase">{{ $t('contact.info_name') }}</div>
              <div class="py-4 text-center text-xl font-bold text-[#BCA669] bg-white">{{ $t('biz.case.role') }}</div>
              <div class="bg-gray-100/50 py-3 text-center text-sm text-gray-400 font-medium tracking-widest uppercase border-t border-gray-50">{{ $t('biz.case.profile_title') }}</div>
              <div class="py-4 text-center text-xl font-bold text-[#BCA669] bg-white rounded-b-xl">{{ $t('biz.case.family_status') }}</div>
            </div>
          </div>
        </div>

        <!-- Right: Pain Points -->
        <div class="flex flex-col">
          <h4 class="text-2xl font-bold text-gray-800 mb-10 text-center md:text-left">{{ $t('biz.case.pain_points') }}</h4>
          <div class="space-y-12">
            <div v-for="pt in painPoints" :key="pt.label" class="flex flex-col gap-4">
              <div class="flex justify-center md:justify-start">
                <span class="inline-block px-5 py-2 text-base text-white rounded-lg font-bold shadow-sm shadow-[#BCA669]/30 bg-[#BCA669]">
                  {{ pt.label }}
                </span>
              </div>
              <p class="text-sm text-gray-600 leading-relaxed font-medium text-center md:text-left">{{ pt.desc }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Double Arrow -->
      <div class="flex justify-center pt-6">
        <img :src="arrowIcon" class="w-10 h-10 object-contain animate-bounce-down cursor-pointer" alt="scroll down" />
      </div>
    </section>

    <!-- ⑦ 专属定制方案 - Full Width with Image 10 -->
    <section class="relative py-24 overflow-hidden min-h-[600px] flex items-center bg-gray-50">
      <!-- Full Width Background Image -->
      <div class="absolute inset-0 z-0">
        <img :src="biz10" class="w-full h-full object-cover opacity-30" alt="Solution Background">
      </div>

      <div class="max-w-6xl mx-auto px-6 w-full relative z-10">
        <div class="text-center mb-16">
          <h2 class="section-title mb-4 tracking-widest">{{ $t('biz.case.strategy_title') }}</h2>
          <p class="section-subtitle max-w-3xl mx-auto leading-relaxed">{{ $t('biz.case.strategy_subtitle') }}</p>
        </div>

        <div class="flex flex-col md:flex-row gap-12 items-stretch">
          <!-- Sidebar Tabs -->
          <div class="flex flex-col gap-4 md:w-48 shrink-0">
            <button v-for="(s, i) in strategies" :key="i" @click="activeStrategy = i"
                    :class="['px-6 py-4 rounded-xl text-base font-bold text-center transition-all duration-500 shadow-sm border', 
                             activeStrategy === i 
                               ? 'bg-[#BCA669] text-white border-[#BCA669] shadow-[0_10px_30px_rgba(188,166,105,0.3)] scale-105' 
                               : 'bg-white text-gray-400 border-gray-100 hover:border-[#BCA669]/30 hover:text-[#BCA669] hover:bg-gray-50']">
              {{ s.tab }}
            </button>
          </div>

          <!-- Content Card -->
          <div class="flex-1 flex flex-col gap-4">
            <div class="bg-white rounded-2xl p-12 md:p-16 shadow-[0_20px_80px_rgba(0,0,0,0.06)] border border-gray-50 relative overflow-hidden flex flex-col min-h-[400px]">
              <Transition name="challenge-fade" mode="out-in">
                <div :key="activeStrategy" class="flex-1">
                  <div class="flex items-center gap-6 mb-12">
                    <h3 class="text-2xl font-bold text-[#BCA669] shrink-0 whitespace-nowrap">{{ strategies[activeStrategy].title }}</h3>
                    <div class="h-[1px] bg-gradient-to-r from-gray-200 to-transparent w-full"></div>
                  </div>
                  
                  <div class="space-y-10">
                    <div v-for="block in strategies[activeStrategy].blocks" :key="block.head" class="group">
                      <h4 class="text-lg font-bold text-gray-900 mb-3 flex items-center gap-3">
                        <span class="w-1.5 h-1.5 rounded-full bg-[#BCA669]"></span>
                        {{ block.head }}
                      </h4>
                      <p class="text-base text-gray-500 leading-relaxed pl-4 line-clamp-3 md:line-clamp-none">{{ block.body }}</p>
                    </div>
                  </div>
                </div>
              </Transition>
            </div>
            <p class="text-xs text-gray-400 text-right italic px-4">{{ $t('biz.case.privacy_note') }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ⑧ CTA -->
    <section class="w-full py-24 relative overflow-hidden">
      <div class="absolute inset-0 z-0">
        <img :src="biz11" class="w-full h-full object-cover" alt="CTA Background">
        <!-- Overlay to ensure text readability while maintaining brand gold feel -->
        <div class="absolute inset-0 bg-[#BCA669]/60 backdrop-blur-[2px]"></div>
      </div>
      <div class="relative z-10 text-center px-6">
        <h2 class="section-title text-white mb-6 tracking-widest">{{ $t('biz.cta_title') }}</h2>
        <p class="section-subtitle text-white/90 mb-12 tracking-wide">{{ $t('biz.cta_subtitle') }}</p>
        <router-link to="/contact" class="inline-block bg-white text-gray-900 px-14 py-4 rounded-xl text-lg font-bold hover:bg-gray-50 hover:scale-105 transition-all duration-300 shadow-xl">
          {{ $t('common.consult') }}
        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import PageBanner from '../components/PageBanner.vue'
import biz1 from '../assets/images/biz/1.png'
import biz2 from '../assets/images/biz/2.png'
import biz3 from '../assets/images/biz/3.png'
import biz4 from '../assets/images/biz/4.png'
import biz5 from '../assets/images/biz/5.png'
import biz6 from '../assets/images/biz/6.png'
import biz7 from '../assets/images/biz/7.png'
import biz8 from '../assets/images/biz/8.png'
import biz9 from '../assets/images/biz/9.jpg'
import biz10 from '../assets/images/biz/10.jpg'
import biz11 from '../assets/images/biz/11.jpg'
import arrowIcon from '../assets/images/biz/arrow.png'

const { locale } = useI18n()

// ——— 面对的挑战: interactive auto-rotating bubbles ———
const challenges = computed(() => [
  { title: t('biz.challenges.c1_title'), desc: t('biz.challenges.c1_desc') },
  { title: t('biz.challenges.c2_title'), desc: t('biz.challenges.c2_desc') },
  { title: t('biz.challenges.c3_title'), desc: t('biz.challenges.c3_desc') },
  { title: t('biz.challenges.c4_title'), desc: t('biz.challenges.c4_desc') },
])
const activeChallenge = ref(2) // default: 传承焦虑
let autoTimer = null

const setChallenge = (index) => {
  activeChallenge.value = index
  // Reset auto-rotation timer when manually clicked
  clearInterval(autoTimer)
  autoTimer = setInterval(() => {
    activeChallenge.value = (activeChallenge.value + 1) % challenges.length
  }, 5000)
}

onMounted(() => {
  autoTimer = setInterval(() => {
    activeChallenge.value = (activeChallenge.value + 1) % challenges.length
  }, 5000)
})

onUnmounted(() => {
  clearInterval(autoTimer)
})



const wealthCards = computed(() => [
  { icon: biz1, title: t('biz.wealth.m1_title'), desc: t('biz.wealth.m1_desc') },
  { icon: biz2, title: t('biz.wealth.m2_title'), desc: t('biz.wealth.m2_desc') },
  { icon: biz3, title: t('biz.wealth.m3_title'), desc: t('biz.wealth.m3_desc') },
])

const wealthFeatures = computed(() => [
  { title: t('biz.wealth.f1_title'), desc: t('biz.wealth.f1_desc') },
  { title: t('biz.wealth.f2_title'), desc: t('biz.wealth.f2_desc') },
  { title: t('biz.wealth.f3_title'), desc: t('biz.wealth.f3_desc') },
])

const assetFeatures = computed(() => [
  { title: t('biz.asset.f1_title'), desc: t('biz.asset.f1_desc') },
  { title: t('biz.asset.f2_title'), desc: t('biz.asset.f2_desc') },
  { title: t('biz.asset.f3_title'), desc: t('biz.asset.f3_desc') },
])

const familyCards = computed(() => [
  { title: t('biz.family.c1_title'), desc: t('biz.family.c1_desc'), img: biz4 },
  { title: t('biz.family.c2_title'), desc: '', img: biz5 },
  { title: t('biz.family.c3_title'), desc: '', img: biz6 },
  { title: t('biz.family.c4_title'), desc: '', img: biz7 },
])

const painPoints = computed(() => [
  { label: t('biz.case.p1_label'), color: '#BCA669', desc: t('biz.case.p1_desc') },
  { label: t('biz.case.p2_label'), color: '#BCA669', desc: t('biz.case.p2_desc') },
  { label: t('biz.case.p3_label'), color: '#BCA669', desc: t('biz.case.p3_desc') },
])

const activeStrategy = ref(0)
const strategies = computed(() => [
  {
    tab: t('biz.case.s1_tab'),
    title: t('biz.case.s1_title'),
    blocks: [
      { head: t('biz.case.s1_b1_head'), body: t('biz.case.s1_b1_body') },
      { head: t('biz.case.s1_b2_head'), body: t('biz.case.s1_b2_body') },
    ],
  },
  {
    tab: t('biz.case.s2_tab'),
    title: t('biz.case.s2_title'),
    blocks: [
      { head: t('biz.case.s2_b1_head'), body: t('biz.case.s2_b1_body') },
      { head: t('biz.case.s2_b2_head'), body: t('biz.case.s2_b2_body') },
    ],
  },
  {
    tab: t('biz.case.s3_tab'),
    title: t('biz.case.s3_title'),
    blocks: [
      { head: t('biz.case.s3_b1_head'), body: t('biz.case.s3_b1_body') },
      { head: t('biz.case.s3_b2_head'), body: t('biz.case.s3_b2_body') },
    ],
  },
])
</script>

<style scoped>
/* Fade transition for challenge text switching */
.challenge-fade-enter-active,
.challenge-fade-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}
.challenge-fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.challenge-fade-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

@keyframes bounce-down {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(10px); }
}
.animate-bounce-down {
  animation: bounce-down 1.5s ease-in-out infinite;
}
</style>
