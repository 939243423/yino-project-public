<template>
  <div class="min-h-screen bg-gray-50 text-gray-900 font-sans relative">
    <!-- Global Loading Overlay -->
    <Transition name="fade-fast">
      <div v-if="appState.isInitialLoading" class="fixed inset-0 z-[9999] bg-[#f9fafb] flex flex-col items-center justify-center">
        <div class="w-12 h-12 border-[3px] border-gray-200 border-t-[#C5A059] rounded-full animate-spin mb-4"></div>
        <div class="text-gray-500 text-sm font-bold tracking-[0.2em] uppercase">YINO ASSET 一诺资产</div>
      </div>
    </Transition>

    <!-- Navbar -->
    <nav v-if="!isAdminRoute" class="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-[0_2px_20px_rgba(0,0,0,0.05)] border-b border-gray-100 px-6 md:px-12 py-4 flex justify-between items-center transition-all duration-300">
      <!-- Logo Area -->
      <div class="flex items-center md:w-56 shrink-0">
        <router-link to="/" class="flex items-center">
          <img :src="logo" alt="YINO ASSET" class="h-8 md:h-10 w-auto object-contain">
        </router-link>
      </div>
      
      <!-- Desktop Nav Links (Centered) -->
      <div class="hidden md:flex flex-1 justify-center space-x-8 font-bold text-[13px] text-gray-800 uppercase tracking-widest whitespace-nowrap h-full">
        <template v-for="link in navLinks" :key="link.key">
          <!-- Dropdown Parent -->
          <div v-if="link.children" class="relative group flex items-center h-full cursor-pointer">
            <span class="hover:text-yino-gold transition flex items-center space-x-1 py-4"
              :class="{ 'text-yino-gold border-b-2 border-yino-gold': link.children.some(sub => route.path === sub.path) }">
              <span>{{ $t(`nav.${link.key}`) }}</span>
              <svg class="w-3 h-3 text-gray-400 group-hover:text-yino-gold transition-transform group-hover:rotate-180" 
                :class="{ 'text-yino-gold': link.children.some(sub => route.path === sub.path) }"
                fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
            </span>
            <!-- Dropdown Menu -->
            <div class="absolute top-full left-1/2 -translate-x-1/2 min-w-[180px] w-max bg-white border border-gray-100 shadow-xl rounded-lg py-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0 z-[60]">
              <router-link v-for="sub in link.children" :key="sub.key" :to="sub.path" 
                class="block px-6 py-2.5 text-gray-600 hover:text-yino-gold hover:bg-gray-50 transition-colors text-[13px] first:rounded-t-lg last:rounded-b-lg font-bold tracking-widest whitespace-nowrap"
                active-class="text-yino-gold bg-gray-50">
                {{ $t(`nav.${sub.key}`) }}
              </router-link>
            </div>
          </div>
          
          <!-- Regular Link -->
          <router-link v-else :to="link.path" 
            class="hover:text-yino-gold transition flex items-center py-4"
            exact-active-class="text-yino-gold border-b-2 border-yino-gold">
            {{ $t(`nav.${link.key}`) }}
          </router-link>
        </template>
      </div>

      <!-- Actions & Hamburger (Right) -->
      <div class="flex items-center justify-end md:w-56 shrink-0 gap-4">
        <!-- Lang Toggle (Mobile & Desktop) -->
        <button @click="toggleLang" class="flex text-gray-700 hover:text-yino-gold text-[13px] font-bold transition items-center space-x-1.5 tracking-widest group">
          <svg class="w-4 h-4 opacity-70 group-hover:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <span class="ml-0.5 whitespace-nowrap">{{ locale === 'zh' ? 'EN' : 'CN' }}</span>
          <svg class="w-2.5 h-2.5 text-gray-400 group-hover:text-yino-gold transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
        </button>

        <!-- Hamburger Button -->
        <button @click="toggleMobileMenu" class="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5 focus:outline-none z-50">
          <span class="block w-6 h-0.5 bg-gray-800 transition-opacity duration-300" :class="{ 'opacity-0': showMobileMenu }"></span>
          <span class="block w-6 h-0.5 bg-gray-800 transition-transform duration-300" :class="{ 'rotate-45 translate-y-0': showMobileMenu }"></span>
          <span class="block w-6 h-0.5 bg-gray-800 transition-transform duration-300" :class="{ '-rotate-45 -translate-y-2': showMobileMenu }"></span>
        </button>
      </div>
    </nav>

    <!-- Mobile Menu Drawer -->
    <Transition name="drawer">
      <div v-if="showMobileMenu" class="fixed inset-0 z-[100] md:hidden pointer-events-none">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/20 backdrop-blur-sm pointer-events-auto" @click="showMobileMenu = false"></div>
        
        <!-- Drawer Content -->
        <div class="absolute top-0 right-0 h-full w-64 bg-white shadow-2xl pointer-events-auto flex flex-col pt-24">
          <div class="flex flex-col w-full text-[16px] font-bold text-gray-800">
            <template v-for="link in navLinks" :key="link.key">
              <!-- Mobile Dropdown Section (Accordion) -->
              <div v-if="link.children" class="w-full flex flex-col">
                <button @click="showServicesMobile = !showServicesMobile" 
                  class="flex justify-between items-center px-6 py-4 hover:bg-gray-50 transition border-b border-gray-50/50">
                  <span>{{ $t(`nav.${link.key}`) }}</span>
                  <svg :class="['w-4 h-4 transition-transform duration-300', showServicesMobile ? 'rotate-180 text-yino-gold' : 'text-gray-400']" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
                
                <div :class="['w-full overflow-hidden transition-all duration-500 bg-gray-100/50 flex flex-col', showServicesMobile ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0']">
                  <router-link v-for="sub in link.children" :key="sub.key" :to="sub.path" 
                    @click="showMobileMenu = false"
                    class="px-8 py-4 text-[14px] font-medium text-gray-600 hover:text-yino-gold border-b border-gray-100/50"
                    active-class="text-yino-gold bg-gray-200/40">
                    {{ $t(`nav.${sub.key}`) }}
                  </router-link>
                </div>
              </div>
              
              <!-- Mobile Regular Link -->
              <router-link v-else :to="link.path" 
                class="px-6 py-4 hover:bg-gray-50 transition border-b border-gray-50/50"
                active-class="text-yino-gold bg-gray-50/50"
                @click="showMobileMenu = false">
                {{ $t(`nav.${link.key}`) }}
              </router-link>
            </template>
          </div>
        </div>
      </div>
    </Transition>

    <router-view />

    <!-- Global UI Components -->
    <GlobalDialog />
    <GlobalToast />


    <!-- Navy Footer -->
    <footer v-if="!isAdminRoute" class="relative">
      <div class="bg-[#16182C] text-gray-400 min-h-[385px] flex flex-col justify-between pt-16 md:pt-20 pb-10 px-8 md:px-20 text-sm">
        <div class="max-w-7xl mx-auto w-full flex flex-col md:flex-row justify-between items-start mb-8 md:mb-16">
          
          <!-- Column 1: Logo & Slogan -->
          <div class="mb-10 md:mb-0 md:min-w-max flex flex-col items-center md:items-start w-full md:w-auto">
            <div class="flex items-center justify-center md:justify-start mb-3">
              <img :src="logo2" alt="YINO ASSET" class="h-10 w-auto object-contain">
            </div>
            <p :class="['text-white text-[13px] font-medium uppercase text-center md:text-left md:pl-1 whitespace-nowrap', locale === 'zh' ? 'tracking-[0.3em] md:tracking-[0.75em]' : 'tracking-[0.1em]']">
              {{ $t('footer.slogan') }}
            </p>
            <!-- Divider below slogan for mobile only -->
            <div class="w-full md:hidden h-px bg-gray-800/50 mt-10"></div>
          </div>

          <!-- Columns 2-4: Links & Contact -->
          <div class="flex flex-col md:flex-row justify-between w-full md:w-[65%] gap-y-10 md:gap-8 text-[14px]">
            <!-- Link Columns Grid -->
            <div class="grid grid-cols-2 md:flex md:flex-row md:justify-between md:flex-1 gap-8">
              <!-- Quick Links -->
              <div class="flex flex-col space-y-4 min-w-[120px]">
                <h4 class="text-white font-semibold mb-1 tracking-[0.15em] text-[15px]">{{ $t('footer.quick_links') }}</h4>
                <div class="flex flex-col space-y-2 opacity-80">
                  <router-link to="/wealth-management" class="hover:text-white transition tracking-widest">{{ $t('nav.wealth') }}</router-link>
                  <router-link to="/asset-management" class="hover:text-white transition tracking-widest">{{ $t('nav.assets') }}</router-link>
                  <router-link to="/family-office" class="hover:text-white transition tracking-widest">{{ $t('nav.family') }}</router-link>
                  <router-link to="/news" class="hover:text-white transition tracking-widest">{{ $t('nav.news') }}</router-link>
                  <router-link to="/join" class="hover:text-white transition tracking-widest">{{ $t('nav.join') }}</router-link>
                </div>
              </div>

              <!-- Global Offices -->
              <div class="flex flex-col space-y-4 min-w-[120px]">
                <h4 class="text-white font-semibold mb-1 tracking-[0.15em] text-[15px]">{{ $t('footer.global_offices') }}</h4>
                <div class="flex flex-col space-y-2 opacity-80">
                  <span class="hover:text-white transition cursor-default tracking-widest">{{ $t('home.office.sg') }}</span>
                  <span class="hover:text-white transition cursor-default tracking-widest">{{ $t('home.office.hk') }}</span>
                  <span class="hover:text-white transition cursor-default tracking-widest">{{ $t('home.office.hz') }}</span>
                </div>
              </div>
            </div>

            <!-- Contact Us -->
            <div class="flex flex-col space-y-4 min-w-[200px]">
              <h4 class="text-white font-semibold mb-1 tracking-[0.15em] text-[15px]">{{ $t('footer.contact_us') }}</h4>
              <div class="flex flex-col space-y-3 opacity-80">
                <div class="flex items-center gap-3">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                  <a href="mailto:info@yinoasset.com" class="hover:text-white transition">info@yinoasset.com</a>
                </div>
                <div class="flex items-center gap-3">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                  <a href="tel:+85237963525" class="hover:text-white transition">+852-37963525</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Copyright Bottom Row -->
        <div class="max-w-7xl mx-auto w-full pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-[13px] text-gray-500 tracking-wider gap-4 md:gap-0">
          <div class="opacity-60">{{ $t('footer.copyright') }}</div>
          
          <div class="flex items-center gap-2 opacity-60">
            <span>{{ $t('footer.license_no') }}: BUX837</span>
            <span class="mx-2">|</span>
            <span>{{ $t('footer.license_desc') }}</span>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import GlobalDialog from './components/GlobalDialog.vue'
import GlobalToast from './components/GlobalToast.vue'
import logo from './assets/images/logo.svg'
import logo2 from './assets/images/logo2.png'
import { appState } from './utils/appState'

const route = useRoute()
const { locale } = useI18n()

// Now safe to use computed because of router.isReady() in main.js
const isAdminRoute = computed(() => {
  return route.path ? route.path.startsWith('/admin') : false
})

// Initialize locale from localStorage if available
if (localStorage.getItem('yino_lang')) {
  locale.value = localStorage.getItem('yino_lang')
}

const toggleLang = () => {
  const newLocale = locale.value === 'zh' ? 'en' : 'zh'
  locale.value = newLocale
  localStorage.setItem('yino_lang', newLocale)
}

// Initial app-wide loading timeout to prevent stuck loader
onMounted(() => {
  if (route.path !== '/') {
    // If not on home page, close loader soon
    setTimeout(() => {
      appState.isInitialLoading = false
    }, 800)
  } else {
    // Safety timeout for Home page fallback
    setTimeout(() => {
      appState.isInitialLoading = false
    }, 5000)
  }
})

const showMobileMenu = ref(false)
const showServicesMobile = ref(false)
const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value
  if (!showMobileMenu.value) showServicesMobile.value = false // Reset when closing
}

// Close mobile menu on route change
watch(() => route.path, () => {
  showMobileMenu.value = false
})

const navLinks = [
  { key: 'home', path: '/' },
  { key: 'biz', children: [
    { key: 'wealth', path: '/wealth-management' },
    { key: 'assets', path: '/asset-management' },
    { key: 'family', path: '/family-office' }
  ]},
  { key: 'news', path: '/news' },
  { key: 'about', path: '/about' },
  { key: 'join', path: '/join' },
  { key: 'contact', path: '/contact' }
]
</script>

<style>
/* Global body background */
body {
  background-color: #F8F9FA;
}

/* Drawer Slide Transition */
.drawer-enter-active,
.drawer-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.drawer-enter-from,
.drawer-leave-to {
  opacity: 0;
}

.drawer-enter-from .absolute.right-0 {
  transform: translateX(100%);
}

.drawer-leave-to .absolute.right-0 {
  transform: translateX(100%);
}

.drawer-enter-to .absolute.right-0 {
  transform: translateX(0);
}

/* Fast Fade for Loader */
.fade-fast-enter-active,
.fade-fast-leave-active {
  transition: opacity 0.5s ease;
}

.fade-fast-enter-from,
.fade-fast-leave-to {
  opacity: 0;
}
</style>