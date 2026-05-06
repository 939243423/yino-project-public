<template>
  <div class="w-full overflow-x-hidden relative">

    <!-- Hero Banner Section with Swiper Carousel -->
    <section class="relative w-full h-[600px] md:h-auto md:aspect-[1920/660] md:min-h-[480px] bg-[#111827] overflow-hidden">
      <swiper v-if="slides.length > 0"
        :modules="[Autoplay, Pagination, Navigation]"
        :slides-per-view="1"
        :space-between="0"
        :loop="true"
        :autoplay="{
          delay: 5000,
          disableOnInteraction: false,
        }"
        :pagination="{ clickable: true }"
        :navigation="false"
        class="h-full w-full"
      >
        <swiper-slide v-for="(slide, index) in slides" :key="index" class="relative group">
          <component 
            :is="slide.link ? 'router-link' : 'div'" 
            :to="slide.link" 
            class="block h-full w-full"
            :class="slide.link ? 'cursor-pointer' : 'cursor-default'"
          >
            <div class="absolute inset-0 z-0 overflow-hidden bg-[#111827]">
              <img :src="slide.image" 
                   class="w-full h-full object-cover transition-opacity duration-700" 
                   :class="slide.isFallback ? 'opacity-40' : 'opacity-100'"
                   :alt="slide.title" />
            </div>

            <!-- Slide 0: Centered layout (Optional title/desc overlay) -->
            <div v-if="index === 0" class="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 pt-16">
              <div class="opacity-0 animate-[fadeInUp_1s_ease-out_0.2s_forwards] mb-8">
                <img :src="locale === 'en' ? home19 : home11" class="h-8 md:h-10 w-auto object-contain" alt="License Tag 1" />
              </div>
              <h1 class="opacity-0 animate-[fadeInUp_1s_ease-out_0.5s_forwards] text-[19px] md:text-6xl font-bold text-white mb-6 tracking-wider drop-shadow-lg max-w-4xl whitespace-nowrap">
                {{ slide.title }}
              </h1>
              <p class="opacity-0 animate-[fadeInUp_1s_ease-out_0.8s_forwards] text-sm md:text-base text-gray-200 max-w-3xl mx-auto leading-relaxed drop-shadow mb-10">
                {{ slide.description }}
              </p>
              <div v-if="slide.link" class="opacity-0 animate-[fadeInUp_1s_ease-out_1.1s_forwards] flex space-x-4">
                <div class="btn-yino-primary">{{ slide.buttonText || $t('common.more') }}</div>
              </div>
            </div>
            
            <!-- Other Slides: Optional overlay for consistent feel -->
            <div v-else class="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 pt-16">
              <h1 v-if="slide.title" class="opacity-0 animate-[fadeInUp_1s_ease-out_0.5s_forwards] text-[19px] md:text-6xl font-bold text-white mb-6 tracking-wider drop-shadow-lg max-w-4xl">
                {{ slide.title }}
              </h1>
              <p v-if="slide.description" class="opacity-0 animate-[fadeInUp_1s_ease-out_0.8s_forwards] text-sm md:text-base text-gray-200 max-w-3xl mx-auto leading-relaxed drop-shadow mb-10">
                {{ slide.description }}
              </p>
            </div>
          </component>
        </swiper-slide>
      </swiper>
    </section>

    <!-- Cycle & Wealth Stats Section -->
    <section class="py-10 md:py-20 px-6 relative bg-white overflow-hidden flex flex-col justify-center yino-bg-pattern" v-intersection-observer="onIntersectStats">
      <!-- Background Image -->
      <div class="absolute inset-0 z-0">
        <img :src="home13" class="w-full h-full object-cover opacity-100" alt="Background" />
        <div class="absolute inset-0 bg-white/60"></div>
      </div>
      
      <!-- Decorator graphic in background (simulating the paper stack) -->
      <div class="absolute -left-20 top-40 opacity-30 pointer-events-none transform -rotate-12 z-10">
         <!-- <img src="https://images.unsplash.com/photo-1568667256549-094345857637?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" class="w-96 grayscale rounded-xl shadow-2xl mix-blend-multiply" /> -->
      </div>

      <div class="max-w-5xl mx-auto relative z-10 text-center w-full">
        <h2 :class="['text-3xl md:text-4xl font-bold tracking-wider mb-4 transition-all duration-1000 transform', statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10']">
          <span class="text-[#1c1c1c]">{{ $t('home.stats.title_main') }}</span><span class="text-[#BCA669]">{{ $t('home.stats.title_gold') }}</span>
        </h2>
        <p :class="['text-gray-500 mb-8 md:mb-16 transition-all duration-1000 delay-200 transform', statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10']">
          {{ $t('home.stats.subtitle') }}
        </p>

        <!-- Stats Card -->
        <div :class="['bg-white shadow-md border border-gray-100 rounded-xl p-8 md:p-12 flex flex-col md:flex-row justify-between items-center mb-10 md:mb-16 transition-all duration-1000 delay-300 transform', statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10']">
          <div class="text-sm text-gray-400 font-medium mb-8 md:mb-0 text-center md:text-left md:w-40 shrink-0">
            {{ $t('home.stats.source') }}
          </div>
          
          <div class="flex-1 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 w-full mt-6 md:mt-0">
            <div class="text-center px-4">
              <div class="text-4xl md:text-5xl font-bold text-[#1c1c1c] mb-2">24<span class="text-xl">{{ $t('home.stats.value1_unit') }}</span></div>
              <div class="text-xs text-gray-500 uppercase tracking-widest">{{ $t('home.stats.label1') }}</div>
            </div>
            <div class="text-center px-4">
              <div class="text-4xl md:text-5xl font-bold text-[#1c1c1c] mb-2">30<span class="text-xl">%</span></div>
              <div class="text-xs text-gray-500 uppercase tracking-widest">{{ $t('home.stats.label2') }}</div>
            </div>
            <div class="text-center px-4">
              <div class="text-4xl md:text-5xl font-bold text-[#1c1c1c] mb-2">13<span class="text-xl">%</span></div>
              <div class="text-xs text-gray-500 uppercase tracking-widest">{{ $t('home.stats.label3') }}</div>
            </div>
            <div class="text-center px-4">
              <div class="text-4xl md:text-5xl font-bold text-[#1c1c1c] mb-2">5<span class="text-xl">%</span></div>
              <div class="text-xs text-gray-500 uppercase tracking-widest">{{ $t('home.stats.label4') }}</div>
            </div>
          </div>
        </div>

        <p :class="['text-sm text-gray-600 mb-4 transition-all duration-1000 delay-500 transform', statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10']">{{ $t('home_new.stats_footer') }}</p>
        <h3 :class="['text-2xl font-bold text-yino-gold mb-8 transition-all duration-1000 delay-700 transform', statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10']">{{ $t('home_new.curse_text') }}</h3>
      </div>
    </section>

    <!-- Services System Section -->
    <section class="py-10 md:py-24 px-6 bg-white flex flex-col justify-center yino-bg-pattern" v-intersection-observer="onIntersectServices">
      <div class="max-w-[1140px] mx-auto text-center w-full">
        <h2 :class="['section-title transition-all duration-1000 transform mb-4', servicesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10']">{{ $t('home.services.title') }}</h2>
        <p :class="['section-subtitle transition-all duration-1000 delay-200 transform mb-10 md:mb-16', servicesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10']">{{ $t('home.services.subtitle') }}</p>

        <!-- Desktop View (Large Screens) -->
        <div class="hidden md:flex flex-col md:flex-row gap-6 h-auto md:h-[480px]">
          <!-- Card 1: Wealth Management -->
          <router-link to="/wealth-management" :class="['relative flex-1 overflow-hidden group cursor-pointer transition-all duration-1000 delay-300 transform rounded-lg', servicesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10']">
            <img :src="home14" class="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-all duration-700" :alt="$t('nav.wealth')" />
            <div class="absolute inset-0 bg-[#11141D]/70 group-hover:bg-[#BCA669]/85 transition-all duration-500"></div>
            <div class="relative z-10 h-full flex flex-col items-center justify-center p-8 text-white">
              <img :src="home1" class="w-16 h-16 mb-8 object-contain brightness-0 invert" alt="Icon" />
              <h3 class="text-2xl font-bold mb-4 tracking-widest">{{ $t('nav.wealth') }}</h3>
              <p class="text-sm text-white/80 font-light tracking-wide mb-8">{{ $t('home.services.wealth_tag') }}</p>
              <div class="absolute bottom-24 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                <svg class="w-16 h-10 animate-pulse-horizontal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
              </div>
            </div>
          </router-link>

          <!-- Card 2: Asset Management -->
          <router-link to="/asset-management" :class="['relative flex-1 overflow-hidden group cursor-pointer transition-all duration-1000 delay-500 transform rounded-lg', servicesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10']">
            <img :src="home16" class="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-all duration-700" :alt="$t('nav.assets')" />
            <div class="absolute inset-0 bg-[#11141D]/70 group-hover:bg-[#BCA669]/85 transition-all duration-500"></div>
            <div class="relative z-10 h-full flex flex-col items-center justify-center p-8 text-white">
              <img :src="home2" class="w-16 h-16 mb-8 object-contain brightness-0 invert" alt="Icon" />
              <h3 class="text-2xl font-bold mb-4 tracking-widest">{{ $t('nav.assets') }}</h3>
              <p class="text-sm text-white/80 font-light tracking-wide mb-8">{{ $t('home.services.asset_tag') }}</p>
              <div class="absolute bottom-24 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                <svg class="w-16 h-10 animate-pulse-horizontal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
              </div>
            </div>
          </router-link>

          <!-- Card 3: Family Office -->
          <router-link to="/family-office" :class="['relative flex-1 overflow-hidden group cursor-pointer transition-all duration-1000 delay-700 transform rounded-lg', servicesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10']">
            <img :src="home15" class="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-all duration-700" :alt="$t('nav.family')" />
            <div class="absolute inset-0 bg-[#11141D]/70 group-hover:bg-[#BCA669]/85 transition-all duration-500"></div>
            <div class="relative z-10 h-full flex flex-col items-center justify-center p-8 text-white">
              <img :src="home3" class="w-16 h-16 mb-8 object-contain brightness-0 invert" alt="Icon" />
              <h3 class="text-2xl font-bold mb-4 tracking-widest">{{ $t('nav.family') }}</h3>
              <p class="text-sm text-white/80 font-light tracking-wide mb-8">{{ $t('home.services.family_tag') }}</p>
              <div class="absolute bottom-24 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                <svg class="w-16 h-10 animate-pulse-horizontal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
              </div>
            </div>
          </router-link>
        </div>

        <!-- Mobile View (Stacked Cards) -->
        <div class="md:hidden flex flex-col gap-6 px-4">
          <router-link v-for="s in [
            {to: '/wealth-management', img: home14, icon: home1, title: $t('nav.wealth'), desc: $t('home.services.wealth_tag')},
            {to: '/asset-management', img: home16, icon: home2, title: $t('nav.assets'), desc: $t('home.services.asset_tag')},
            {to: '/family-office', img: home15, icon: home3, title: $t('nav.family'), desc: $t('home.services.family_tag')}
          ]" :key="s.to" :to="s.to" 
          class="relative block h-40 overflow-hidden rounded-xl group">
            <!-- Background Image -->
            <img :src="s.img" class="absolute inset-0 w-full h-full object-cover" :alt="s.title" />
            <!-- Overlay -->
            <div class="absolute inset-0 bg-black/40 group-active:bg-black/60 transition-colors"></div>
            
            <!-- Content Container -->
            <div class="relative z-10 h-full flex items-center justify-between px-6">
              <div class="flex items-center gap-4">
                <!-- Icon -->
                <div class="w-12 h-12 flex items-center justify-center shrink-0">
                  <img :src="s.icon" class="w-10 h-10 object-contain brightness-0 invert" alt="Icon" />
                </div>
                <!-- Text -->
                <div class="flex flex-col text-left">
                  <h3 class="text-xl font-bold text-white tracking-widest">{{ s.title }}</h3>
                  <p class="text-[11px] text-white/90 font-medium tracking-wide mt-1">{{ s.desc }}</p>
                </div>
              </div>
              
              <!-- Arrow -->
              <div class="text-white opacity-80">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Global Layout -->
    <section class="py-10 md:py-24 bg-white relative overflow-hidden w-full flex flex-col" v-intersection-observer="onIntersectMap">
      <!-- Main Layout: Map (Bottom) + Labels (Top on Mobile) -->
      <div class="relative w-full overflow-hidden flex flex-col items-center min-h-[600px] md:min-h-[700px]">
        <!-- Top Title - Moved Inside Map Area -->
        <div class="relative md:absolute md:top-10 md:left-1/2 md:-translate-x-1/2 z-40 text-center px-6 w-full pointer-events-none mb-8 md:mb-0">
          <h2 class="section-title mb-4">{{ $t('home.layout_title') }}</h2>
          <p class="section-subtitle">{{ $t('home.layout_subtitle') }}</p>
        </div>
        
        <div class="relative z-30 flex flex-col items-center lg:items-end justify-center w-full max-w-[1100px] mx-auto px-6 mb-12 lg:mb-0 lg:h-[700px]">
          <!-- Location Information Stack -->
          <div class="w-full lg:w-[280px] flex flex-col gap-8 md:gap-12 shrink-0">
            <div v-for="(loc, index) in [
              {k:'sg', i:home4, tag: $t('home.office.sg_tag')},
              {k:'hk', i:home5, tag: $t('home.office.hk_tag')},
              {k:'hz', i:home6, tag: $t('home.office.hz_tag')}
            ]" :key="loc.k"
                 :class="['flex items-center gap-5 md:gap-6 transition-all duration-1000 transform', mapVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12']"
                 :style="{ transitionDelay: (0.2 + index * 0.3) + 's' }">
              
              <!-- Icon Container -->
              <div class="w-14 h-14 md:w-[80px] md:h-[80px] shrink-0">
                <img :src="loc.i" class="w-full h-full object-contain" alt="Icon" />
              </div>
              
              <div class="flex items-center flex-wrap gap-x-3 gap-y-1 text-left">
                <div class="flex items-center gap-2">
                  <span class="text-lg md:text-xl font-bold text-[#1c1c1c] tracking-widest whitespace-nowrap">{{ $t(`home.office.${loc.k}`) }}</span>
                  <span class="text-[9px] md:text-[10px] font-bold text-[#BCA669] px-2 py-0.5 rounded bg-[#BCA669]/10 whitespace-nowrap">{{ loc.tag }}</span>
                </div>
                <div class="text-[12px] md:text-[13px] text-gray-400 font-medium whitespace-nowrap">{{ $t(`home.office.${loc.k}_desc`) }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Map Container -->
        <!-- On mobile, this will be below the labels in the flex flow -->
        <div class="relative lg:absolute lg:inset-0 z-0 w-full h-[350px] md:h-full flex items-center justify-center mt-6 md:mt-0">
          <div :class="['relative w-[150%] md:w-full h-full transition-all duration-1000 delay-300 transform scale-[1.5] md:scale-100 -translate-x-[-22%] md:translate-x-0', mapVisible ? 'opacity-100' : 'opacity-0']">
            <!-- Map Image -->
            <img :src="homeMap" alt="Global Map" class="w-full h-full object-cover object-center block pointer-events-none select-none opacity-80 md:opacity-100" />
            
            <svg class="absolute inset-0 w-full h-full z-10 pointer-events-none overflow-visible" viewBox="0 0 3840 1320" preserveAspectRatio="xMidYMid slice">
              <g v-if="mapVisible">
                <!-- Arcs anchored to major dots -->
                <g class="lines-layer">
                  <path v-for="(p, i) in [
                    'M1800,650 Q1600,350 1500,500',
                    'M1800,650 Q1950,550 2050,600'
                  ]" :key="'hz-'+i" :d="p" 
                  class="fill-none stroke-[#BCA669]/40 draw-path"
                  stroke-width="2"
                   :style="{ animationDelay: (0.5 + i * 0.3) + 's' }" />

                  <path v-for="(p, i) in [
                    'M1770,670 Q1450,620 1150,660',
                    'M1770,670 Q1300,450 1000,500'
                  ]" :key="'hk-'+i" :d="p" 
                  class="fill-none stroke-[#BCA669]/40 draw-path"
                  stroke-width="2"
                   :style="{ animationDelay: (1.5 + i * 0.3) + 's' }" />

                  <path v-for="(p, i) in [
                    'M1650,760 Q1200,680 900,760',
                    'M1650,760 Q1750,800 1800,910'
                  ]" :key="'sg-'+i" :d="p" 
                  class="fill-none stroke-[#BCA669]/40 draw-path"
                  stroke-width="2"
                   :style="{ animationDelay: (2.5 + i * 0.3) + 's' }" />
                </g>

                <!-- Markers Layer -->
                <g class="markers-layer">
                  <!-- Detection: iOS uses native SVG image/text, others use high-fidelity HTML -->
                  
                  <!-- 1. 杭州 (HZ) -->
                  <g v-if="isIOS" class="animate-marker-in" style="animation-delay: 0.5s;">
                    <circle cx="1800" cy="650" r="10" fill="#BCA669" />
                    <image :xlink:href="home17" x="1776" y="626" width="48" height="48" />
                    <text x="1836" y="662" font-size="28" font-weight="bold" fill="#1c1c1c" style="letter-spacing: 0.1em;">{{ $t('home.office.hz') }}</text>
                  </g>
                  <foreignObject v-else x="1776" y="626" width="600" height="150" overflow="visible">
                    <div class="flex items-center gap-4 h-[48px] animate-marker-in" style="animation-delay: 0.5s;">
                      <div class="relative flex h-12 w-12 shrink-0">
                         <span class="animate-ping-seq absolute inline-flex h-full w-full rounded-full bg-[#BCA669] opacity-75"></span>
                        <img :src="home17" class="relative inline-flex rounded-full w-12 h-12 object-contain shadow-2xl bg-white/10 ring-1 ring-white/20" />
                      </div>
                      <span class="text-[28px] font-bold text-[#1c1c1c] tracking-widest whitespace-nowrap [text-shadow:0_4px_12px_rgba(255,255,255,0.9)]">{{ $t('home.office.hz') }}</span>
                    </div>
                  </foreignObject>

                  <!-- 2. 香港 (HK) -->
                  <g v-if="isIOS" class="animate-marker-in" style="animation-delay: 1.5s;">
                    <circle cx="1770" cy="670" r="10" fill="#BCA669" />
                    <image :xlink:href="home17" x="1746" y="646" width="48" height="48" />
                    <text x="1726" y="682" font-size="28" font-weight="bold" fill="#1c1c1c" text-anchor="end" style="letter-spacing: 0.1em;">{{ $t('home.office.hk') }}</text>
                  </g>
                  <foreignObject v-else x="1446" y="646" width="348" height="150" overflow="visible">
                    <div class="flex items-center justify-end gap-4 h-[48px] w-full animate-marker-in" style="animation-delay: 1.5s;">
                      <span class="text-[28px] font-bold text-[#1c1c1c] tracking-widest whitespace-nowrap [text-shadow:0_4px_12px_rgba(255,255,255,0.9)]">{{ $t('home.office.hk') }}</span>
                      <div class="relative flex h-12 w-12 shrink-0">
                         <span class="animate-ping-seq absolute inline-flex h-full w-full rounded-full bg-[#BCA669] opacity-75"></span>
                        <img :src="home17" class="relative inline-flex rounded-full w-12 h-12 object-contain shadow-2xl bg-white/10 ring-1 ring-white/20" />
                      </div>
                    </div>
                  </foreignObject>

                  <!-- 3. 新加坡 (SG) -->
                  <g v-if="isIOS" class="animate-marker-in" style="animation-delay: 2.5s;">
                    <circle cx="1650" cy="760" r="10" fill="#BCA669" />
                    <image :xlink:href="home17" x="1626" y="736" width="48" height="48" />
                    <text x="1686" y="772" font-size="28" font-weight="bold" fill="#1c1c1c" style="letter-spacing: 0.1em;">{{ $t('home.office.sg') }}</text>
                  </g>
                  <foreignObject v-else x="1626" y="736" width="600" height="150" overflow="visible">
                    <div class="flex items-center gap-4 h-[48px] animate-marker-in" style="animation-delay: 2.5s;">
                      <div class="relative flex h-12 w-12 shrink-0">
                         <span class="animate-ping-seq absolute inline-flex h-full w-full rounded-full bg-[#BCA669] opacity-75"></span>
                        <img :src="home17" class="relative inline-flex rounded-full w-12 h-12 object-contain shadow-2xl bg-white/10 ring-1 ring-white/20" />
                      </div>
                      <span class="text-[28px] font-bold text-[#1c1c1c] tracking-widest whitespace-nowrap [text-shadow:0_4px_12px_rgba(255,255,255,0.9)]">{{ $t('home.office.sg') }}</span>
                    </div>
                  </foreignObject>
                </g>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </section>




    <!-- Core Values Section -->
    <section class="py-10 md:py-20 bg-gray-50 flex flex-col justify-center" v-intersection-observer="onIntersectValues">
      <div class="max-w-[1140px] mx-auto text-center w-full px-4">
        <h2 :class="['section-title transition-all duration-1000 transform mb-4', valuesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10']">{{ $t('home.values.title') }}</h2>
        <p :class="['section-subtitle transition-all duration-1000 delay-200 transform mb-10 md:mb-16', valuesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10']">{{ $t('home.values.subtitle') }}</p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          <!-- Value 1 -->
          <div :class="['relative h-48 md:h-[240px] overflow-hidden rounded-xl group transition-all duration-1000 delay-300 transform', valuesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10']">
            <img :src="home7" class="absolute w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity"></div>
            <div class="absolute bottom-6 left-6 text-left pr-6">
              <h3 class="text-3xl font-bold text-white mb-2">{{ $t('home.values.v1_title') }}</h3>
              <p class="text-gray-100 text-sm max-w-xs leading-relaxed transition-all duration-500 transform translate-y-0 opacity-100 md:opacity-0 md:translate-y-4 md:group-hover:opacity-100 md:group-hover:translate-y-0">{{ $t('home.values.v1_desc') }}</p>
            </div>
          </div>
          
          <!-- Value 2 -->
          <div :class="['relative h-48 md:h-[240px] overflow-hidden rounded-xl group transition-all duration-1000 delay-500 transform', valuesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10']">
            <img :src="home8" class="absolute w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity"></div>
            <div class="absolute bottom-6 left-6 text-left pr-6">
              <h3 class="text-3xl font-bold text-white mb-1">{{ $t('home.values.v2_title') }}</h3>
              <p class="text-gray-200 text-sm max-w-xs leading-relaxed transition-all duration-500 transform translate-y-0 opacity-100 md:opacity-0 md:translate-y-4 md:group-hover:opacity-100 md:group-hover:translate-y-0">{{ $t('home.values.v2_desc') }}</p>
            </div>
          </div>

          <!-- Value 3 -->
          <div :class="['relative h-48 md:h-[240px] overflow-hidden rounded-xl group transition-all duration-1000 delay-500 transform', valuesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10']">
            <img :src="home10" class="absolute w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity"></div>
            <div class="absolute bottom-6 left-6 text-left pr-6">
              <h3 class="text-3xl font-bold text-white mb-1">{{ $t('home.values.v3_title') }}</h3>
              <p class="text-gray-200 text-sm max-w-xs leading-relaxed transition-all duration-500 transform translate-y-0 opacity-100 md:opacity-0 md:translate-y-4 md:group-hover:opacity-100 md:group-hover:translate-y-0">{{ $t('home.values.v3_desc') }}</p>
            </div>
          </div>

          <!-- Value 4 -->
          <div :class="['relative h-48 md:h-[240px] overflow-hidden rounded-xl group transition-all duration-1000 delay-700 transform', valuesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10']">
            <img :src="home9" class="absolute w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity"></div>
            <div class="absolute bottom-6 left-6 text-left pr-6">
              <h3 class="text-3xl font-bold text-white mb-1">{{ $t('home.values.v4_title') }}</h3>
              <p class="text-gray-200 text-sm max-w-xs leading-relaxed transition-all duration-500 transform translate-y-0 opacity-100 md:opacity-0 md:translate-y-4 md:group-hover:opacity-100 md:group-hover:translate-y-0">{{ $t('home.values.v4_desc') }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Partners Section -->
    <section class="py-10 md:py-24 px-4 md:px-6 bg-white flex flex-col justify-center" v-intersection-observer="onIntersectPartners">
      <div class="max-w-6xl mx-auto text-center w-full">
        <h2 :class="['section-title transition-all duration-1000 transform flex flex-wrap justify-center items-center gap-y-2', partnersVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10']" v-html="partnersTitleHtml"></h2>
        <p :class="['text-gray-400 text-[13px] md:text-[15px] leading-[1.6] transition-all duration-1000 delay-200 transform text-center mb-12', partnersVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10']" v-html="$t('home_new.partners_desc_v2')"></p>

        <div :class="['grid grid-cols-6 md:grid-cols-6 gap-2 md:gap-8 transition-all duration-1000 delay-400 transform items-center justify-items-center', partnersVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10']">
          <div v-for="p in partners" :key="p.name" class="group h-10 md:h-16 flex flex-col items-center justify-center transition-all duration-500 cursor-pointer hover:-translate-y-2 relative">
            <img :src="p.logo" 
                 :alt="p.name"
                 class="max-h-full max-w-full object-contain relative z-10 transition-transform duration-500"
                 @error="(e) => (e.target.style.display = 'none')">
          </div>
        </div>

        <!-- Bottom Disclaimer -->
        <div :class="['mt-10 text-right transition-all duration-1000 delay-600 transform', partnersVisible ? 'opacity-60 translate-y-0' : 'opacity-0 translate-y-4']">
          <span class="text-[10px] md:text-[12px] text-gray-400 font-medium tracking-wider">
            {{ $t('home_new.partners_disclaimer') }}
          </span>
        </div>
      </div>
    </section>

    <!-- Gold Ribbon – Homepage only -->
    <div 
      class="w-full py-10 md:py-6 text-white text-lg md:text-base font-bold text-center tracking-wider px-8 flex items-center justify-center overflow-hidden" 
      :style="{ 
        backgroundColor: '#BCA669', 
        backgroundImage: `url(${home18})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }"
    >
      <div class="max-w-[280px] md:max-w-none leading-relaxed">
        {{ $t('home_new.ribbon') }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import request from '../api/request'
import { useI18n } from 'vue-i18n'
import { appState } from '../utils/appState'

const { t, locale } = useI18n()
import home1 from '../assets/images/home/1.png'
import home2 from '../assets/images/home/2.png'
import home3 from '../assets/images/home/3.png'
import home4 from '../assets/images/home/4.png'
import home5 from '../assets/images/home/5.png'
import home6 from '../assets/images/home/6.png'
import home7 from '../assets/images/home/7.png'
import home8 from '../assets/images/home/8.png'
import home9 from '../assets/images/home/9.png'
import home10 from '../assets/images/home/10.png'
import home11 from '../assets/images/home/11.png'
import home12 from '../assets/images/home/12.png'
import home13 from '../assets/images/home/13.jpg'
import home14 from '../assets/images/home/14.png'
import home15 from '../assets/images/home/15.png'
import home16 from '../assets/images/home/16.png'
import homeMap from '../assets/images/home/map.jpg'
import home17 from '../assets/images/home/17.png'
import home18 from '../assets/images/home/18.jpg'
import home19 from '../assets/images/home/19.png'
import home20 from '../assets/images/home/20.jpg'

// Intersection Observer States for scroll animations
const statsVisible = ref(false)
const servicesVisible = ref(false)
const mapVisible = ref(false)
const valuesVisible = ref(false)
const partnersVisible = ref(false)

const isIOS = ref(false)
onMounted(() => {
  isIOS.value = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
})

const partnersTitleHtml = computed(() => {
  let text = t('home_new.partners_title_v2')
  
  // Defensive check: if i18n key is missing or returns old value, use hardcoded fallback
  if (!text || text.includes('partners_title') || text === '合作伙伴') {
    text = t('home_new.partners_title_v2') === 'home_new.partners_title_v2' || !t('home_new.partners_title_v2').includes('|')
      ? '合作伙伴 | 信任背书' 
      : t('home_new.partners_title_v2')
  }

  const separatorHtml = '<span class="text-gray-300 font-light mx-3 md:mx-6">|</span>'
  const parts = text.split(/[|｜]/)
  
  if (parts.length > 1) {
    return `<span>${parts[0].trim()}</span>${separatorHtml}<span>${parts[1].trim()}</span>`
  }
  return `<span>${text}</span>`
})

const slides = computed(() => {
  if (apiSlides.value.length > 0) {
    const isEn = locale.value === 'en'
    return apiSlides.value.map((b, index) => ({
      image: b.image_url,
      title: (isEn ? b.title_en : b.title_zh) || b.title || (index === 0 ? t('home.banner_title_fallback') : ''),
      description: (isEn ? b.description_en : b.description_zh) || (
        index === 0
          ? t('home.about_intro_fallback')
          : ''
      ),
      link: b.link || (index === 0 ? '/about' : ''),
      buttonText: t('common.more'),
      isFallback: false
    }))
  }
  
  // Fallback slide if API fails or is empty
  return [{
    image: home20,
    title: t('home.banner_title_fallback'),
    description: t('home.about_intro_fallback'),
    link: '/about',
    buttonText: t('common.more'),
    isFallback: true
  }]
})

const apiSlides = ref([])

onMounted(async () => {
  try {
    const banners = await request.get('/public/banners?category=home')
    if (banners && banners.length > 0) {
      apiSlides.value = banners
    }
  } catch (err) {
    console.error('Failed to fetch banners', err)
  } finally {
    // Crucial: Hide global loader after banners are ready
    appState.isInitialLoading = false
  }
})

// Custom directive to handle Intersection Observer logic
const vIntersectionObserver = {
  mounted: (el, binding) => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          binding.value(true)
          observer.unobserve(el) // Only trigger once
        }
      })
    }, {
      rootMargin: '0px 0px -100px 0px', // Trigger slightly before it comes into view
      threshold: 0.1
    })
    observer.observe(el)
  }
}

// Handlers mapping intersection events to reactive state ref
const onIntersectStats = (isVisible) => { statsVisible.value = isVisible }
const onIntersectServices = (isVisible) => { servicesVisible.value = isVisible }
const onIntersectMap = (isVisible) => { mapVisible.value = isVisible }
const onIntersectValues = (isVisible) => { valuesVisible.value = isVisible }
const onIntersectPartners = (isVisible) => { partnersVisible.value = isVisible }

const getLogo = (row, file) => new URL(`../assets/images/home/row${row}/${file}.png`, import.meta.url).href

const partners = [
  { name: '中信证券', logo: getLogo(1, 1) },
  { name: 'HSBC', logo: getLogo(1, 2) },
  { name: 'UBS', logo: getLogo(1, 3) },
  { name: 'DBS BANK', logo: getLogo(1, 4) },
  { name: 'Citibank', logo: getLogo(1, 5) },
  { name: 'Standard Chartered', logo: getLogo(1, 6) },
  { name: '中信证券经纪香港', logo: getLogo(2, 1) },
  { name: 'CITIC CLSA', logo: getLogo(2, 2) },
  { name: 'JPMorgan Chase & Co.', logo: getLogo(2, 3) },
  { name: 'Julius Bär', logo: getLogo(2, 4) },
  { name: 'Union Bancaire Privée', logo: getLogo(2, 5) },
  { name: 'UOB', logo: getLogo(2, 6) },
  { name: '中金财富', logo: getLogo(3, 1) },
  { name: '金杜律师事务所', logo: getLogo(3, 2) },
  { name: 'LGT Private Banking', logo: getLogo(3, 3) },
  { name: 'NOAH 诺亚正行', logo: getLogo(3, 4) },
  { name: 'EY 安永', logo: getLogo(3, 5) },
  { name: 'IQ-EQ', logo: getLogo(3, 6) },
  { name: 'Bank of Singapore', logo: getLogo(4, 1) },
  { name: 'Point72', logo: getLogo(4, 2) },
  { name: 'millennium', logo: getLogo(4, 3) },
  { name: 'ANTARCTICA', logo: getLogo(4, 4) },
  { name: 'Bloomberg', logo: getLogo(4, 5) },
  { name: 'Win.d', logo: getLogo(4, 6) },
  { name: 'Partner 25', logo: getLogo(5, 1) },
  { name: 'Partner 26', logo: getLogo(5, 2) },
  { name: 'Partner 27', logo: getLogo(5, 3) },
  { name: 'Partner 28', logo: getLogo(5, 4) },
  { name: 'Partner 29', logo: getLogo(5, 5) },
  { name: 'Partner 30', logo: getLogo(5, 6) },
  { name: 'Partner 31', logo: getLogo(6, 1) },
  { name: 'Partner 32', logo: getLogo(6, 2) },
  { name: 'Partner 33', logo: getLogo(6, 3) },
  { name: 'Partner 34', logo: getLogo(6, 4) },
  { name: 'Partner 35', logo: getLogo(6, 5) },
  { name: 'Partner 36', logo: getLogo(6, 6) }
]

</script>

<style scoped>
/* Swiper Pagination Customization - Bars/Strips Style */
:deep(.swiper-pagination) {
  bottom: 60px !important;
  left: auto !important;
  right: 10% !important;
  width: auto !important;
  display: flex !important;
  align-items: center !important;
  gap: 8px !important;
}

:deep(.swiper-pagination-bullet) {
  width: 20px !important;
  height: 2px !important;
  border-radius: 0 !important;
  background: rgba(255, 255, 255, 0.4) !important;
  opacity: 1 !important;
  margin: 0 !important;
  transition: all 0.5s ease-in-out !important;
}

:deep(.swiper-pagination-bullet-active) {
  width: 60px !important;
  background: #fff !important;
}

@keyframes pulseHorizontal {
  0% { transform: translateX(0); }
  50% { transform: translateX(10px); }
  100% { transform: translateX(0); }
}

.animate-pulse-horizontal {
  animation: pulseHorizontal 1.5s ease-in-out infinite;
}

@keyframes ping-sequential {
  0% { transform: scale(1); opacity: 0.8; }
  33% { transform: scale(2.4); opacity: 0; }
  100% { transform: scale(1); opacity: 0; }
}

.animate-ping-seq {
  animation: ping-sequential 6s cubic-bezier(0, 0, 0.2, 1) infinite;
}
.yino-bg-pattern {
  background-image: radial-gradient(#BCA669 0.5px, transparent 0.5px);
  background-size: 30px 30px;
  background-attachment: local;
}


.draw-path {
  stroke-dasharray: 4000;
  stroke-dashoffset: 4000;
  opacity: 0;
  animation: drawLine 6s cubic-bezier(0.2, 0, 0.3, 1) forwards;
}

@keyframes markerFadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-marker-in {
  opacity: 0;
  animation: markerFadeIn 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

@keyframes drawLine {
  0% {
    stroke-dashoffset: 4000;
    opacity: 0;
  }
  1% {
    opacity: 1;
  }
  100% {
    stroke-dashoffset: 0;
    opacity: 1;
  }
}
:deep(.force-br) {
  display: none;
}

@media (min-width: 768px) {
  :deep(.force-br) {
    display: block;
    height: 0;
  }
}
</style>