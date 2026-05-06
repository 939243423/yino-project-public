<template>
  <div class="bg-white min-h-screen">
    <PageBanner category="about" :title="$t('about.title')" :subtitle="$t('about.subtitle_banner')" />
    
    <div class="space-y-32">
      <!-- 1. Company Intro (公司简介) -->
      <section class="relative overflow-hidden bg-white py-16 md:py-32 md:min-h-[700px] w-full flex items-center px-6">
        <!-- Desktop Background Skyscraper -->
        <div class="hidden md:block absolute inset-0 z-0 pointer-events-none">
          <img :src="about1" class="absolute inset-0 w-full h-full object-cover" alt="Building Background">
        </div>

        <div class="relative z-10 max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <!-- Desktop Spacer -->
          <div class="hidden md:block md:w-4/12 lg:w-5/12 xl:w-6/12 transition-all duration-700"></div>

          <!-- Content Area -->
          <div class="w-full md:w-8/12 lg:w-7/12 xl:w-6/12 flex flex-col items-start text-left transition-all duration-700">
            <h2 :class="['section-title tracking-widest text-[#1c1c1c] mb-6 md:mb-10 w-full', $i18n.locale === 'en' ? 'text-2xl' : 'text-3xl']">{{ $t('about.intro_title') }}</h2>
            
            <div class="space-y-4 md:space-y-6 text-[15px] md:text-base text-gray-700 leading-relaxed font-medium mb-10 md:mb-12">
              <p class="text-gray-900 leading-normal"><span class="text-[#BCA669] font-bold text-lg">{{ $t('home.hero.title') }}<template v-if="$i18n.locale !== 'en'"> (YINO ASSET)</template></span> {{ $t('about.intro_p1') }}</p>
              <p>{{ $t('about.intro_p2') }}</p>
              <p>{{ $t('about.intro_p3') }}</p>
              <p>{{ $t('about.intro_p4') }}</p>
            </div>

            <!-- Feature Cards Container -->
            <div class="w-full">
              <!-- Mobile View (Figure 6 style) -->
              <div class="md:hidden flex flex-col gap-6 md:flex-row relative">
                <!-- Building image for mobile (Figure 6) -->
                <div class="md:hidden absolute -left-20 top-0 bottom-0 w-[80%] z-0 opacity-80 pointer-events-none">
                  <img :src="about15" class="w-full h-full object-cover object-left-bottom" alt="Building">
                </div>

                <!-- Feature Cards -->
                <div class="w-full md:max-w-lg z-10">
                  <div class="flex flex-col gap-5 items-end relative">
                    <div v-for="feat in [{t:$t('about.features.vision'), i:about2}, {t:$t('about.features.compliance'), i:about3}, {t:$t('about.features.perspective'), i:about4}]" 
                         :key="feat.t"
                         class="bg-white/95 border border-gray-100/50 rounded-lg p-5 flex flex-col items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.05)] w-[140px] h-[140px]">
                      <img :src="feat.i" class="w-8 h-8 mb-4 object-contain" />
                      <span :class="['font-bold tracking-widest text-center whitespace-nowrap text-[#1c1c1c]', $i18n.locale === 'en' ? 'text-[9px]' : 'text-sm']">{{ feat.t }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Desktop View (Grid) -->
              <div class="hidden md:grid grid-cols-3 gap-6">
                <div v-for="feat in [{t:$t('about.features.vision'), i:about2}, {t:$t('about.features.compliance'), i:about3}, {t:$t('about.features.perspective'), i:about4}]" 
                     :key="feat.t"
                     class="bg-white/80 backdrop-blur-sm border border-gray-100 rounded-2xl p-10 flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-shadow">
                  <img :src="feat.i" class="w-16 h-16 mb-6 object-contain" />
                  <span :class="['font-bold tracking-widest text-center whitespace-nowrap text-[#1c1c1c]', $i18n.locale === 'en' ? 'text-xs' : 'text-lg']">{{ feat.t }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 2. Company History (公司历程) - Constrained to max-w-5xl -->
      <section class="text-center overflow-hidden max-w-5xl mx-auto px-6 mb-20 md:mb-32">
        <h2 :class="['section-title tracking-widest text-[#1c1c1c] mb-10 md:mb-20', $i18n.locale === 'en' ? 'text-2xl' : 'text-3xl']">{{ $t('about.history.title') }}</h2>
        
        <!-- Desktop View: Carousel -->
        <div class="hidden md:flex relative w-full items-center justify-center mb-16 px-4">
          <!-- Left Arrow -->
          <button @click="prev" class="absolute left-0 w-10 h-10 bg-[#4A5568] hover:bg-[#2D3748] text-white flex items-center justify-center transition-colors shadow-md z-20 shrink-0">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
          </button>
          
          <Transition name="fade-slide" mode="out-in">
            <div :key="activeIndex" class="flex-1 flex flex-col md:flex-row items-center justify-between text-left gap-8 md:gap-12 px-12">
              <div class="flex-1">
                <div class="text-[56px] md:text-[64px] font-bold text-[#BCA669] leading-none mb-4 tracking-tighter">{{ historyItems[activeIndex].year }}</div>
                <h4 class="text-xl font-bold text-gray-900 mb-4 tracking-wider">{{ historyItems[activeIndex].title }}</h4>
                <p class="text-gray-500 text-sm leading-relaxed max-w-sm">{{ historyItems[activeIndex].desc }}</p>
              </div>
              <div class="w-full md:w-[380px] shrink-0">
                <img :src="historyItems[activeIndex].image" class="w-full h-[240px] object-cover shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-100 rounded-sm" :alt="historyItems[activeIndex].year">
              </div>
            </div>
          </Transition>

          <!-- Right Arrow -->
          <button @click="next" class="absolute right-0 w-10 h-10 bg-[#4A5568] hover:bg-[#2D3748] text-white flex items-center justify-center transition-colors shadow-md z-20 shrink-0">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
          </button>
        </div>

        <!-- Desktop View: Timeline Axis -->
        <div class="hidden md:block w-full max-w-4xl mx-auto relative pt-12 pb-8 px-4">
          <!-- The continuous dotted line -->
          <div class="absolute top-[68px] left-[5%] right-[5%] border-t-[1.5px] border-dashed border-gray-300"></div>
          
          <div class="flex justify-between items-end relative z-10">
            <div v-for="(item, index) in historyItems" :key="index" 
                 @click="setIndex(index)"
                 class="group flex flex-col items-center cursor-pointer transition-all duration-300"
                 :class="{'active-year -mt-10': activeIndex === index}">
              
              <!-- Year Text -->
              <span :class="['mb-4 transition-all duration-300 font-bold', 
                             activeIndex === index ? 'text-xl text-gray-800' : 'text-xs text-transparent group-hover:text-gray-400']">
                {{ item.year }}
              </span>
              
              <!-- Indicator -->
              <div v-if="activeIndex === index" class="w-0 h-0 border-x-4 border-x-transparent border-b-[6px] border-b-[#BCA669] mb-3"></div>
              <div v-else class="w-1.5 h-1.5 rounded-full bg-gray-400 mb-3 group-hover:bg-[#BCA669] transition-colors"></div>
              
              <!-- Bottom Label (Fixed Year) -->
              <span :class="['text-xs font-medium transition-colors', activeIndex === index ? 'text-[#BCA669]' : 'text-gray-500']">
                {{ item.year }}
              </span>
            </div>
          </div>
        </div>

        <!-- Mobile View: Vertical Timeline -->
        <div class="md:hidden flex flex-col items-center text-left pt-8 pb-12">
          <div v-for="(item, index) in historyItems" :key="index" class="flex w-full px-4 group">
            <!-- Left: Year -->
            <div class="w-20 shrink-0 text-right pr-6 pt-0.5">
              <span class="text-2xl font-bold text-[#BCA669] leading-none">{{ item.year }}</span>
            </div>

            <!-- Center: Axis line & dots -->
            <div class="relative flex flex-col items-center shrink-0">
              <div class="w-5 h-5 rounded-full border-[3px] border-[#BCA669]/20 bg-white flex items-center justify-center z-10">
                <div class="w-2.5 h-2.5 rounded-full bg-[#BCA669]/20"></div>
              </div>
              <!-- Vertical Line connecting dots -->
              <div v-if="index !== historyItems.length - 1" class="absolute top-5 w-[1.5px] h-full bg-[#E2E8F0]"></div>
            </div>

            <!-- Right: Content -->
            <div class="flex-1 pl-8 pb-16">
              <h4 class="text-xl font-bold text-gray-900 mb-3 tracking-wide">{{ item.title }}</h4>
              <p class="text-[13px] text-gray-400 leading-relaxed font-medium">
                {{ item.desc }}
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- 3. Promise Section (千金一诺) -->
      <section class="py-16 md:py-24 px-6 max-w-6xl mx-auto text-center">
        <h2 :class="['section-title tracking-widest text-[#1c1c1c] mb-4', $i18n.locale === 'en' ? 'text-2xl' : 'text-3xl']">{{ $t('about.answer.title') }}</h2>
        <p class="section-subtitle mb-16 px-4 leading-relaxed max-w-2xl mx-auto">{{ $t('about.answer.subtitle') }}</p>

        <!-- Desktop View: 4 Image panels with Accordion Effect -->
        <div class="hidden md:flex overflow-hidden h-[450px] shadow-2xl border-x border-white/10">
          <div v-for="(panel, index) in answerPanels" :key="panel.title"
               class="group relative flex-1 cursor-pointer overflow-hidden transition-all duration-700"
               :class="[
                 {'flex-[3.5]': activeAnswer === panel.title},
                 index !== answerPanels.length - 1 ? 'border-r border-white/30' : ''
               ]"
               @mouseenter="activeAnswer = panel.title">
            <img :src="panel.img" class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" :alt="panel.title">
            <div :class="['absolute inset-0 transition-opacity duration-700', activeAnswer === panel.title ? 'bg-black/20' : 'bg-black/50']"></div>
            
            <div class="absolute inset-0 flex flex-col p-10 text-white overflow-hidden">
              <!-- Title: Top-left when expanded, Centered when collapsed -->
              <div :class="['transition-all duration-700', activeAnswer === panel.title ? 'mb-4' : 'flex-1 flex items-center justify-center']">
                <h3 class="font-bold tracking-widest whitespace-nowrap transition-all duration-700"
                    :class="activeAnswer === panel.title ? 'text-[28px] text-left' : 'text-xl text-center opacity-80 group-hover:opacity-100'">
                  {{ panel.title }}
                </h3>
              </div>
              
              <!-- Content at the bottom for expanded panel -->
              <div class="mt-auto max-w-lg transition-all duration-700 text-left"
                   :class="activeAnswer === panel.title ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'">
                <div v-show="activeAnswer === panel.title">
                  <div class="text-white font-bold text-2xl mb-3 tracking-wider leading-tight">{{ panel.subtitle }}</div>
                  <p class="text-[14px] text-white/90 leading-relaxed font-medium">{{ panel.desc }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Mobile View: Stacked Cards -->
        <div class="md:hidden flex flex-col gap-6">
          <div v-for="(panel, index) in answerPanels" :key="index" class="group relative h-56 rounded-2xl overflow-hidden shadow-xl">
            <img :src="panel.img" class="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" :alt="panel.title">
            <div class="absolute inset-0 bg-black/40 backdrop-blur-[1px] flex flex-col justify-center p-8 text-left">
              <h3 class="text-2xl font-bold text-white mb-2 tracking-wider">{{ panel.title }}</h3>
              <div class="mb-3">
                <span class="text-[#BCA669] font-bold text-base">{{ panel.subtitle }}</span>
              </div>
              <p class="text-white/80 text-xs leading-relaxed line-clamp-4">
                {{ panel.desc }}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- 4. Professional Foundation (专业根基) -->
    <section class="bg-white pt-32 md:pt-40 pb-16">
      <h2 :class="['section-title tracking-[0.3em] text-[#1c1c1c] text-center', $i18n.locale === 'en' ? 'text-2xl' : 'text-3xl']">{{ $t('about.foundation.title') }}</h2>
    </section>

    <section class="relative py-24 overflow-hidden min-h-[700px] flex flex-col items-center foundation-section">
      <!-- Full Background (Hidden on Mobile, handled via CSS on Desktop) -->

      <!-- Responsive Container: Cleanly separates PC and Mobile -->
      <div class="max-w-6xl mx-auto px-6 relative z-10 w-full">
        
        <!-- 1. PC View (Exactly as manually restored by user) -->
        <div class="hidden md:block">
          <!-- Centered Titles Container -->
          <div class="flex  gap-x-20 lg:gap-x-48 mb-16">
            <h3 :class="['font-bold text-[#BCA669] ml-56', $i18n.locale === 'en' ? 'text-2xl tracking-wider' : 'text-3xl tracking-[0.4em]']">{{ $t('about.foundation.compliance') }}</h3>
            <h3 :class="['font-bold text-[#BCA669] ml-48', $i18n.locale === 'en' ? 'text-2xl tracking-wider' : 'text-3xl tracking-[0.4em]']">{{ $t('about.foundation.global_network') }}</h3>
          </div>

        <div class="flex flex-col lg:flex-row gap-8 items-start justify-between">
          
          <!-- Column 1: Certificate -->
          <div class="flex flex-col items-center lg:items-start w-full lg:w-[340px]">
            <!-- Cert Frame -->
            <div class="bg-white/5 backdrop-blur-sm rounded shadow-2xl shrink-0 w-full transform hover:scale-105 transition-transform duration-700 mx-auto lg:mx-0">
              <!-- <img :src="about5" class="w-full h-auto object-contain" alt="SFC Certificate" /> -->
            </div>
          </div>

          <!-- Column 2: License Details -->
          <div class="flex flex-col w-full lg:w-1/3">
            <h4 class="text-2xl font-bold text-white mb-8 tracking-wide text-center">
              {{ $t('about.foundation.sfc') }}
            </h4>
            
            <div class="space-y-2">
              <div v-for="lic in [{n:'1',t:$t('about.foundation.l1')}, {n:'4',t:$t('about.foundation.l4')}, {n:'9',t:$t('about.foundation.l9')}]" :key="lic.n"
                   class="relative p-3 rounded-xl flex items-center overflow-hidden h-20"
                   :style="{ backgroundImage: `url(${about10})`, backgroundSize: 'cover', backgroundPosition: 'center' }">
                
                <!-- Left side: Iconic Number -->
                <div class="relative z-10 flex items-center gap-2 shrink-0">
                  <span class="text-5xl font-bold italic text-white leading-none drop-shadow-2xl mb-2">{{ lic.n }}</span>
                  <span class="text-[14px] font-bold text-white tracking-widest pt-4 whitespace-nowrap">{{ $t('about.foundation.license') }}</span>
                </div>

                <!-- Right side: Description -->
                <div class="relative z-10 flex-1 pl-4 text-right md:text-left">
                  <span class="text-[13px] text-white font-medium tracking-[0.2em] whitespace-nowrap">
                    {{ lic.t }}
                  </span>
                </div>
              </div>
            </div>

            <div class="mt-8 space-y-2 text-[11px] text-white/90 tracking-widest font-medium">
              <p>{{ $t('about.foundation.license_no') }}：<span class="text-white ml-2">BUX837</span></p>
              <p>{{ $t('about.foundation.query_url') }}：<span class="text-white/80 ml-2">https://www.sfc.hk/</span></p>
            </div>
          </div>

          <!-- Column 3: Global Network -->
          <div class="flex flex-col w-full lg:w-[42%] lg:pl-12">
            <div class="flex flex-col gap-16">
              <div v-for="loc in networkLocations" :key="loc.t" class="flex gap-8 items-start group">
                  <img :src="loc.i" alt="Location" class="w-[70px] h-[70px] object-contain shrink-0">
                <div class="flex flex-col pt-1">
                  <h4 class="text-xl font-bold text-white mb-2 tracking-wide transition-colors">{{ loc.t }}</h4>
                  <p class="text-[13px] text-gray-400 leading-relaxed max-w-xl transition-colors">{{ loc.d }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

        <!-- 2. Mobile View (1:1 M-site Optimization per Figure 5) -->
        <div class="md:hidden flex flex-col items-center">
          <!-- Compliance Module -->
          <div class="mb-20 text-center -mx-6 w-[calc(100%+3rem)]">
            <div class="space-y-6">
              <img :src="about16" class="w-full h-auto object-contain" alt="Compliance Licenses">
            </div>
          </div>

          <!-- Network Module -->
          <div class="w-full text-center">
            <h3 class="text-xl font-bold text-[#BCA669] tracking-[0.4em] mb-10">{{ $t('about.foundation.global_network') }}</h3>
            <div class="flex flex-col gap-10">
              <div v-for="loc in networkLocations" :key="loc.t" class="flex flex-row items-center gap-6 px-4 text-left">
                <!-- Direct icon usage as before -->
                <img :src="loc.i" alt="Location" class="w-[70px] h-[70px] object-contain shrink-0">
                <div class="flex flex-col">
                  <h4 class="text-lg font-bold text-white mb-1 tracking-wide">{{ loc.t }}</h4>
                  <p class="text-[11px] text-gray-400 leading-relaxed">{{ loc.d }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>


  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import PageBanner from '../components/PageBanner.vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
import about1 from '../assets/images/about/1.png'
import about15 from '../assets/images/about/15.png'
import about2 from '../assets/images/about/2.png'
import about3 from '../assets/images/about/3.png'
import about4 from '../assets/images/about/4.png'
import about5 from '../assets/images/about/5.jpg'
import about6 from '../assets/images/about/6.png'
import about7 from '../assets/images/about/7.png'
import about8 from '../assets/images/about/8.png'
import about9 from '../assets/images/about/9.jpg'
import about10 from '../assets/images/about/10.png'
import about11 from '../assets/images/about/11.jpg'
import about12 from '../assets/images/about/12.jpg'
import about13 from '../assets/images/about/13.jpg'
import about14 from '../assets/images/about/14.jpg'
import about16 from '../assets/images/about/16.png'

const activeIndex = ref(1) // 2023 by default
const activeAnswer = ref('千域布局')

const answerPanels = computed(() => [
  { title: t('about.answer.p1_title'), subtitle: t('about.answer.p1_subtitle'), desc: t('about.answer.p1_desc'), img: about11 },
  { title: t('about.answer.p2_title'), subtitle: t('about.answer.p2_subtitle'), desc: t('about.answer.p2_desc'), img: about12 },
  { title: t('about.answer.p3_title'), subtitle: t('about.answer.p3_subtitle'), desc: t('about.answer.p3_desc'), img: about13 },
  { title: t('about.answer.p4_title'), subtitle: t('about.answer.p4_subtitle'), desc: t('about.answer.p4_desc'), img: about14 },
])
const historyItems = computed(() => [
  {
    year: '2016',
    title: t('about.history.items.2016_title'),
    desc: t('about.history.items.2016_desc'),
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop'
  },
  {
    year: '2023',
    title: t('about.history.items.2023_title'),
    desc: t('about.history.items.2023_desc'),
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=800&auto=format&fit=crop'
  },
  {
    year: '2024',
    title: t('about.history.items.2024_title'),
    desc: t('about.history.items.2024_desc'),
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop'
  },
  {
    year: '2025',
    title: t('about.history.items.2025_title'),
    desc: t('about.history.items.2025_desc'),
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop'
  },
  {
    year: 'Future',
    title: t('about.history.items.future_title'),
    desc: t('about.history.items.future_desc'),
    image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=800&auto=format&fit=crop'
  }
])

const networkLocations = computed(() => [
  {t: t('about.foundation.sg_title'), d: t('about.foundation.sg_desc'), i: about6},
  {t: t('about.foundation.hk_title'), d: t('about.foundation.hk_desc'), i: about7},
  {t: t('about.foundation.hz_title'), d: t('about.foundation.hz_desc'), i: about8}
])

let timer = null
const startTimer = () => {
  timer = setInterval(() => {
    activeIndex.value = (activeIndex.value + 1) % historyItems.value.length
  }, 5000)
}

const stopTimer = () => {
  if (timer) clearInterval(timer)
}

const next = () => {
  stopTimer()
  activeIndex.value = (activeIndex.value + 1) % historyItems.value.length
  startTimer()
}

const prev = () => {
  stopTimer()
  activeIndex.value = (activeIndex.value - 1 + historyItems.value.length) % historyItems.value.length
  startTimer()
}

const setIndex = (i) => {
  stopTimer()
  activeIndex.value = i
  startTimer()
}

onMounted(() => {
  startTimer()
})

onUnmounted(() => {
  stopTimer()
})
</script>

<style scoped>
.foundation-section {
  background-color: black;
  /* 移除导致重叠的负边距，改用 cover 彻底消除黑边 */
  margin-bottom: 0;
}

@media (min-width: 768px) {
  .foundation-section {
    /* 设置最小宽度基准，防止高缩放倍率下布局坍塌 */
    /* min-width: 1440px; */
    background-image: url('../assets/images/about/17.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
}

@media (max-width: 768px) {
  .foundation-section {
    background-color: #010507;
  }
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.5s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

.active-year {
  transform: translateY(-8px);
}

@keyframes fadeInShort {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fadeInShort {
  animation: fadeInShort 0.5s ease-out forwards;
}
</style>

