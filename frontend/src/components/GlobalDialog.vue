<template>
  <Transition name="fade">
    <div v-if="state.dialog.show" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-black/40 backdrop-blur-sm" @click="cancel"></div>
      
      <!-- Modal Body -->
      <div class="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden transform transition-all animate-modal-in">
        <div class="p-6">
          <div v-if="state.dialog.type === 'loading'" class="flex flex-col items-center py-4">
            <div class="w-12 h-12 border-4 border-yino-blue border-t-transparent rounded-full animate-spin mb-4"></div>
            <p class="text-gray-600 font-medium">{{ state.dialog.message }}</p>
          </div>
          
          <template v-else>
            <div class="flex items-center space-x-3 mb-4">
              <div class="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-yino-blue text-xl">
                {{ state.dialog.type === 'confirm' ? '❓' : '💡' }}
              </div>
              <h3 class="text-xl font-bold text-gray-800">{{ state.dialog.title }}</h3>
            </div>
            <p class="text-gray-600 leading-relaxed">{{ state.dialog.message }}</p>
          </template>
        </div>
        
        <!-- Actions (Hidden for loading) -->
        <div v-if="state.dialog.type !== 'loading'" class="px-6 py-4 bg-gray-50 flex justify-end space-x-3">
          <button 
            v-if="state.dialog.type === 'confirm'"
            @click="cancel" 
            class="px-5 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 transition"
          >
            {{ state.dialog.cancelText }}
          </button>
          <button 
            @click="confirm" 
            class="px-6 py-2 bg-yino-blue text-white text-sm font-bold rounded-lg shadow-lg shadow-blue-500/20 hover:bg-blue-800 transition transform active:scale-95"
          >
            {{ state.dialog.confirmText }}
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { useUIState, dialog } from '../utils/ui'

const state = useUIState()

const confirm = () => {
  dialog.handleAction(true)
}

const cancel = () => {
  if (state.dialog.type === 'confirm') {
    dialog.handleAction(false)
  } else {
    dialog.handleAction(true)
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

@keyframes modal-in {
  from { opacity: 0; transform: scale(0.9) translateY(20px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}
.animate-modal-in {
  animation: modal-in 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}
</style>
