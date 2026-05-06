<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center px-4 md:px-0">
    
    <!-- Auto Redirect Overlay removed since Router handles it -->

    <div class="bg-white p-6 md:p-10 rounded-2xl shadow-xl w-full max-w-md">
      <div class="text-center mb-8">
        <div class="flex justify-center mb-4">
          <img :src="logo" alt="YINO ASSET" class="h-10 md:h-12 w-auto object-contain">
        </div>
        <p class="text-gray-500 mt-2 text-sm font-medium">一诺资产可视化管理后台</p>
      </div>
      
      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">用户名</label>
          <input 
            v-model="username" 
            type="text" 
            required
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yino-blue focus:border-yino-blue outline-none transition"
            placeholder="请输入账号"
            :disabled="loading"
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">密码</label>
          <input 
            v-model="password" 
            type="password" 
            required
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yino-blue focus:border-yino-blue outline-none transition"
            placeholder="请输入密码"
            :disabled="loading"
          />
        </div>
        
        <div v-if="errorMsg" class="text-red-500 text-sm text-center bg-red-50 py-2 rounded">
          {{ errorMsg }}
        </div>
        
        <button 
          type="submit" 
          :disabled="loading"
          class="w-full bg-yino-blue hover:bg-blue-800 text-white font-bold py-3 px-4 rounded-lg transition duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {{ loading ? '登录中...' : '登 录' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import logo from '../assets/images/logo.png'
import request from '../api/request'

const router = useRouter()
const username = ref('')
const password = ref('')
const errorMsg = ref('')
const loading = ref(false)

const handleLogin = async () => {
  errorMsg.value = ''
  loading.value = true
  
  try {
    const res = await request.post('/auth/login', {
      username: username.value,
      password: password.value
    })
    localStorage.setItem('yino_admin_token', res.accessToken)
    localStorage.setItem('yino_admin_user', JSON.stringify({
      username: res.username,
      role: res.role
    }))
    router.push('/admin/dashboard')
  } catch (err) {
    if (err.response && err.response.data && err.response.data.message) {
      errorMsg.value = err.response.data.message
    } else {
      errorMsg.value = '网络或服务器错误'
    }
  } finally {
    loading.value = false
  }
}
</script>
