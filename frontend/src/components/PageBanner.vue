<template>
  <div class="relative w-full h-[200px] md:h-auto md:aspect-[1920/400] bg-gray-900 overflow-hidden flex items-center justify-center">
    <!-- Banner Image Overlay -->
    <Transition name="fade">
      <div v-if="bannerUrl" class="absolute inset-0">
        <img :src="bannerUrl" class="w-full h-full object-cover opacity-80" :alt="category">
        <div class="absolute inset-0"></div>
      </div>
    </Transition>

    <!-- Content -->
    <div class="relative z-10 text-center px-6 max-w-4xl">
      <h1 class="text-4xl md:text-5xl font-bold text-white tracking-widest mb-4 opacity-0 animate-slide-up">
        {{ title }}
      </h1>

      <p v-if="subtitle" class="mt-4 md:mt-6 text-gray-300 text-sm md:text-lg tracking-widest opacity-0 animate-slide-up delay-300">
        {{ subtitle }}
      </p>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import request from '../api/request'

const props = defineProps({
  category: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    default: ''
  }
})

const bannerUrl = ref('')

onMounted(async () => {
  try {
    const banners = await request.get(`/public/banners?category=${props.category}`)
    if (banners && banners.length > 0) {
      // Pick the first one (sort_order handled by backend)
      bannerUrl.value = banners[0].image_url
    }
  } catch (err) {
    console.error(`Failed to fetch banner for ${props.category}`, err)
  }
})
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 1.5s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

@keyframes slide-up {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-slide-up {
  animation: slide-up 1s cubic-bezier(0.23, 1, 0.32, 1) forwards;
}

.delay-200 { animation-delay: 0.2s; }
.delay-300 { animation-delay: 0.4s; }
</style>
