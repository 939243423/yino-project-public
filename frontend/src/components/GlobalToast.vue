<template>
  <div class="fixed top-6 left-1/2 -translate-x-1/2 z-[110] flex flex-col items-center space-y-3 pointer-events-none">
    <TransitionGroup name="toast">
      <div 
        v-for="toast in state.toasts" 
        :key="toast.id"
        :class="[
          'px-6 py-3 rounded-full shadow-2xl flex items-center space-x-3 pointer-events-auto transform transition-all backdrop-blur-md border border-white/20',
          toast.type === 'success' ? 'bg-green-500/90 text-white' : 'bg-red-500/90 text-white'
        ]"
      >
        <span class="text-lg">
          {{ toast.type === 'success' ? '✅' : '❌' }}
        </span>
        <span class="text-sm font-bold tracking-wide">{{ toast.message }}</span>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup>
import { useUIState } from '../utils/ui'
const state = useUIState()
</script>

<style scoped>
.toast-enter-active, .toast-leave-active {
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.toast-enter-from {
  opacity: 0;
  transform: translateY(-20px) scale(0.8);
}
.toast-leave-to {
  opacity: 0;
  transform: translateY(-20px) scale(0.8);
}
</style>
