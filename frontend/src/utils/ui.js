import { reactive } from 'vue'

const state = reactive({
  dialog: {
    show: false,
    title: '',
    message: '',
    confirmText: '确定',
    cancelText: '取消',
    resolve: null,
    type: 'confirm' // 'confirm', 'alert', or 'loading'
  },
  toasts: []
})

export const dialog = {
  confirm(title, message, options = {}) {
    state.dialog.title = title
    state.dialog.message = message
    state.dialog.confirmText = options.confirmText || '确定'
    state.dialog.cancelText = options.cancelText || '取消'
    state.dialog.type = 'confirm'
    state.dialog.show = true
    
    return new Promise((resolve) => {
      state.dialog.resolve = resolve
    })
  },
  
  alert(title, message, options = {}) {
    state.dialog.title = title
    state.dialog.message = message
    state.dialog.confirmText = options.confirmText || '知道了'
    state.dialog.type = 'alert'
    state.dialog.show = true
    
    return new Promise((resolve) => {
      state.dialog.resolve = resolve
    })
  },
  
  loading(message) {
    state.dialog.title = '请稍候'
    state.dialog.message = message
    state.dialog.type = 'loading'
    state.dialog.show = true
    
    return {
      close: () => {
        state.dialog.show = false
      }
    }
  },
  
  toast(message, type = 'success', duration = 3000) {
    const id = Date.now()
    state.toasts.push({ id, message, type })
    setTimeout(() => {
      state.toasts = state.toasts.filter(t => t.id !== id)
    }, duration)
  },

  handleAction(result) {
    state.dialog.show = false
    if (state.dialog.resolve) {
      state.dialog.resolve(result)
      state.dialog.resolve = null
    }
  }
}

export const useUIState = () => state
