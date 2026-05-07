import { reactive } from 'vue'

export const appState = reactive({
  isInitialLoading: true,
  bannersLoaded: false,
  homeBanners: []
})
