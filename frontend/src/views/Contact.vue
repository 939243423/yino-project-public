<template>
  <div class="bg-[#F8F9FA]">
    <PageBanner category="contact" :title="$t('nav.contact')" :subtitle="$t('contact.subtitle_banner')" />
    
    <!-- 1. 全球办公室 Global Offices -->
    <div class="py-10 md:py-24 px-6 max-w-6xl mx-auto">
      <h2 class="section-title text-center mb-10 md:mb-16">{{ $t('footer.global_offices') }}</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Singapore -->
        <div class="bg-white border border-gray-100 rounded-xl p-8 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-shadow duration-300">
          <div class="flex items-center mb-8">
            <img :src="contact1" alt="Singapore" class="w-14 h-14 mr-4 shrink-0" />
            <div>
              <div class="flex items-center gap-2 flex-wrap">
                <h3 class="text-xl font-bold text-gray-900 whitespace-nowrap">{{ $t('home.office.sg') }}</h3>
                <span class="text-[10px] text-[#BCA669] bg-[#BCA669]/10 px-2 py-0.5 rounded font-bold whitespace-nowrap">{{ $t('home.office.sg_tag') }}</span>
              </div>
              <p class="text-xs text-gray-500 mt-1">{{ $t('home.office.sg_desc') }}</p>
            </div>
          </div>
          <div class="border-t border-gray-100 mb-8"></div>
          <div class="text-xs text-gray-500 space-y-3">
            <p class="flex items-start gap-3"><img :src="contact7" class="w-4 h-4 mt-0.5 object-contain" alt="Location" /> {{ $t('contact.address_sg') }}</p>
            <p class="flex items-start gap-3"><img :src="contact9" class="w-4 h-4 mt-0.5 object-contain scale-x-[-1]" alt="Phone" /> <a href="tel:+85237963525" class="hover:text-[#BCA669] transition-colors font-medium text-gray-700">852-37963525</a></p>
            <p class="flex items-start gap-3"><img :src="contact8" class="w-4 h-4 mt-0.5 object-contain" alt="Email" /> <a href="mailto:info@yinoasset.com" class="hover:text-[#BCA669] transition-colors font-medium text-gray-700">info@yinoasset.com</a></p>
          </div>
        </div>

        <!-- Hong Kong -->
        <div class="bg-white border border-gray-100 rounded-xl p-8 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-shadow duration-300">
          <div class="flex items-center mb-8">
            <img :src="contact2" alt="Hong Kong" class="w-14 h-14 mr-4 shrink-0" />
            <div>
              <div class="flex items-center gap-2 flex-wrap">
                <h3 class="text-xl font-bold text-gray-900 whitespace-nowrap">{{ $t('home.office.hk') }}</h3>
                <span class="text-[10px] text-[#BCA669] bg-[#BCA669]/10 px-2 py-0.5 rounded font-bold whitespace-nowrap">{{ $t('home.office.hk_tag') }}</span>
              </div>
              <p class="text-xs text-gray-500 mt-1">{{ $t('home.office.hk_desc') }}</p>
            </div>
          </div>
          <div class="border-t border-gray-100 mb-8"></div>
          <div class="text-xs text-gray-500 space-y-3">
            <p class="flex items-start gap-3"><img :src="contact7" class="w-4 h-4 mt-0.5 object-contain" alt="Location" /> {{ $t('contact.address_hk') }}</p>
            <p class="flex items-start gap-3"><img :src="contact9" class="w-4 h-4 mt-0.5 object-contain scale-x-[-1]" alt="Phone" /> <a href="tel:+85237963525" class="hover:text-[#BCA669] transition-colors font-medium text-gray-700">852-37963525</a></p>
            <p class="flex items-start gap-3"><img :src="contact8" class="w-4 h-4 mt-0.5 object-contain" alt="Email" /> <a href="mailto:info@yinoasset.com" class="hover:text-[#BCA669] transition-colors font-medium text-gray-700">info@yinoasset.com</a></p>
          </div>
        </div>

        <!-- Hangzhou -->
        <div class="bg-white border border-gray-100 rounded-xl p-8 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-shadow duration-300">
          <div class="flex items-center mb-8">
            <img :src="contact3" alt="Hangzhou" class="w-14 h-14 mr-4 shrink-0" />
            <div>
              <div class="flex items-center gap-2 flex-wrap">
                <h3 class="text-xl font-bold text-gray-900 whitespace-nowrap">{{ $t('home.office.hz') }}</h3>
                <span class="text-[10px] text-[#BCA669] bg-[#BCA669]/10 px-2 py-0.5 rounded font-bold whitespace-nowrap">{{ $t('home.office.hz_tag') }}</span>
              </div>
              <p class="text-xs text-gray-500 mt-1">{{ $t('home.office.hz_desc') }}</p>
            </div>
          </div>
          <div class="border-t border-gray-100 mb-8"></div>
          <div class="text-xs text-gray-500 space-y-3">
            <p class="flex items-start gap-3"><img :src="contact7" class="w-4 h-4 mt-0.5 object-contain" alt="Location" /> {{ $t('contact.address_hz') }}</p>
            <p class="flex items-start gap-3"><img :src="contact9" class="w-4 h-4 mt-0.5 object-contain scale-x-[-1]" alt="Phone" /> <a href="tel:+86057181391810" class="hover:text-[#BCA669] transition-colors font-medium text-gray-700">0571-81391810</a></p>
            <p class="flex items-start gap-3"><img :src="contact8" class="w-4 h-4 mt-0.5 object-contain" alt="Email" /> <a href="mailto:info@yinoasset.com" class="hover:text-[#BCA669] transition-colors font-medium text-gray-700">info@yinoasset.com</a></p>
          </div>
        </div>
      </div>
    </div>

    <!-- 2. 在线咨询 Online Inquiry (Full Width) -->
    <div class="w-full relative py-16 md:py-24 mb-12">
      <div class="absolute inset-0 z-0">
        <!-- Background image of someone writing/working -->
        <img :src="contact4" class="w-full h-full object-cover" alt="Consultation">
      </div>
      
      <div class="max-w-5xl mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between">
        <!-- Left Text -->
        <div class="w-full md:w-[45%] mb-12 md:mb-0">
          <h2 class="section-title mb-4 text-left">{{ $t('contact.inquiry_title') }}</h2>
          <div class="w-12 h-1 bg-[#BCA669] mb-8"></div>
          <p class="section-subtitle text-left">{{ $t('contact.inquiry_subtitle') }}</p>
        </div>
        
        <!-- Right Form -->
        <div class="w-full md:w-[50%] bg-white p-10 md:p-12 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-gray-100">
          <h3 class="text-lg font-bold text-gray-900 mb-8 border-b border-gray-100 pb-4">{{ $t('contact.form_title') }}</h3>
          <form @submit.prevent="submitForm" class="space-y-6">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-medium text-gray-700 mb-2">{{ $t('contact.form.name') }} <span class="text-red-500">*</span></label>
                <input v-model="form.name" required type="text" :placeholder="$t('contact.form.name_placeholder')" class="w-full px-4 py-2.5 bg-white border border-gray-200 rounded outline-none focus:border-[#BCA669] transition text-sm text-gray-800 placeholder-gray-300" />
              </div>
              <div>
                <label class="block text-xs font-medium text-gray-700 mb-2">{{ $t('contact.form.phone') }}</label>
                <input v-model="form.phone" type="text" :placeholder="$t('contact.form.phone_placeholder')" class="w-full px-4 py-2.5 bg-white border border-gray-200 rounded outline-none focus:border-[#BCA669] transition text-sm text-gray-800 placeholder-gray-300" />
              </div>
            </div>
            
            <div>
              <label class="block text-xs font-medium text-gray-700 mb-2">{{ $t('contact.form.email') }} <span class="text-red-500">*</span></label>
              <input v-model="form.email" required type="email" :placeholder="$t('contact.form.email_placeholder')" class="w-full px-4 py-2.5 bg-white border border-gray-200 rounded outline-none focus:border-[#BCA669] transition text-sm text-gray-800 placeholder-gray-300" />
            </div>
            
            <div>
              <label class="block text-xs font-medium text-gray-700 mb-2">{{ $t('contact.form.content') }} <span class="text-red-500">*</span></label>
              <textarea v-model="form.content" required rows="4" :placeholder="$t('contact.form.content_placeholder')" class="w-full px-4 py-3 bg-white border border-gray-200 rounded outline-none focus:border-[#BCA669] transition text-sm text-gray-800 placeholder-gray-300"></textarea>
            </div>
            
            <button :disabled="loading" class="w-full bg-[#BCA669] text-white py-3 rounded hover:bg-[#a38a58] transition font-bold shadow disabled:opacity-50">
              {{ loading ? $t('contact.form.submitting') : $t('contact.form.submit') }}
            </button>
          </form>
        </div>
      </div>
    </div>

    <!-- 3. 其他联系方式 Other Contacts -->
    <div class="py-16 px-6 max-w-4xl mx-auto pb-32">
      <h2 class="section-title text-center mb-12">{{ $t('contact.other_title') }}</h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="bg-white border border-gray-100 p-10 rounded-2xl flex flex-col items-center justify-center hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-shadow">
          <img :src="contact5" alt="Business Cooperation" class="w-16 h-16 mb-4" />
          <div class="text-sm text-gray-500 mb-2">{{ $t('contact.biz_coop') }}</div>
          <a href="mailto:info@yinoasset.com" class="font-bold text-gray-900 hover:text-[#BCA669] transition text-lg">info@yinoasset.com</a>
        </div>
        
        <div class="bg-white border border-gray-100 p-10 rounded-2xl flex flex-col items-center justify-center hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-shadow">
          <img :src="contact6" alt="Talent Recruitment" class="w-16 h-16 mb-4" />
          <div class="text-sm text-gray-500 mb-2">{{ $t('contact.hr') }}</div>
          <a href="mailto:info@yinoasset.com" class="font-bold text-gray-900 hover:text-[#BCA669] transition text-lg">info@yinoasset.com</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import PageBanner from '../components/PageBanner.vue'
import contact1 from '../assets/images/contact/1.png'
import contact2 from '../assets/images/contact/2.png'
import contact3 from '../assets/images/contact/3.png'
import contact4 from '../assets/images/contact/4.jpg'
import contact5 from '../assets/images/contact/5.png'
import contact6 from '../assets/images/contact/6.png'
import contact7 from '../assets/images/contact/7.png'
import contact8 from '../assets/images/contact/8.png'
import contact9 from '../assets/images/contact/9.png'
import request from '../api/request'
import { dialog } from '../utils/ui'

const loading = ref(false)
const form = ref({
  name: '',
  phone: '',
  email: '',
  content: ''
})

const submitForm = async () => {
  if (!form.value.name || !form.value.email || !form.value.content) {
    return
  }
  
  loading.value = true
  try {
    const res = await request.post('/public/inquiry', form.value)
    await dialog.alert('感谢您的咨询', res.message || '我们会尽快处理您的请求')
    // Reset form
    form.value = {
      name: '',
      phone: '',
      email: '',
      content: ''
    }
  } catch (err) {
    console.error('Inquiry submission failed', err)
    dialog.alert('提交失败', err.response?.data?.message || '请检查您的网络连接并重试')
  } finally {
    loading.value = false
  }
}
</script>
