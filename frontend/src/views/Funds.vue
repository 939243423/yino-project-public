<template>
  <div class="bg-[#F8F9FA] min-h-screen">
    <PageBanner category="products" :title="$t('products.title')" :subtitle="$t('products.subtitle_banner')" />
    
    <div class="py-24 px-6 max-w-6xl mx-auto">
      
      <!-- Top Cards section: 2 main strategy cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
        <!-- Strategy 1: Global Enhancement -->
        <div class="bg-white rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.04)] overflow-hidden border border-gray-100 flex flex-col hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] transition-all duration-500">
          <div class="bg-[#BCA669] text-white text-center py-4 text-xs tracking-[0.15em] font-medium">
            {{ $t('products.fund1_stat') }}
          </div>
          <div class="p-12 flex flex-col items-center flex-1">
            <h2 class="text-2xl font-bold text-[#1c1c1c] mb-10 tracking-widest">{{ $t('products.fund1_title') }}</h2>
            
            <div class="flex w-full justify-around mb-10 text-center pb-10 border-b border-dashed border-gray-200">
              <div>
                <div class="text-[#BCA669] text-5xl font-semibold mb-3">{{ $t('products.fund1_y') }}<span class="text-2xl ml-1">%</span></div>
                <div class="text-gray-500 text-sm tracking-wide">{{ $t('products.target_yield') }}</div>
              </div>
              <div>
                <div class="text-[#1c1c1c] text-5xl font-semibold mb-3"><span class="text-2xl mr-1">&lt;</span>5<span class="text-2xl ml-1">%</span></div>
                <div class="text-gray-500 text-sm tracking-wide">{{ $t('products.target_drawdown') }}</div>
              </div>
            </div>

            <div class="text-sm font-bold text-gray-900 tracking-widest mb-8 text-center">{{ $t('products.features_title') }}</div>
            
            <div class="w-full bg-[#f7f8f9] rounded-2xl p-10 space-y-8">
              <div class="flex items-start">
                <div class="text-[#BCA669] mr-5 mt-1">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <div>
                  <div class="font-bold text-gray-900 text-[15px] mb-1">{{ $t('products.f1_1_h') }}</div>
                  <div class="text-[13px] text-gray-500 font-medium">{{ $t('products.f1_1_b') }}</div>
                </div>
              </div>
              <div class="flex items-start">
                <div class="text-[#BCA669] mr-5 mt-1">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <div>
                  <div class="font-bold text-gray-900 text-[15px] mb-1">{{ $t('products.f1_2_h') }}</div>
                  <div class="text-[13px] text-gray-500 font-medium">{{ $t('products.f1_2_b') }}</div>
                </div>
              </div>
              <div class="flex items-start">
                <div class="text-[#BCA669] mr-5 mt-1">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <div>
                  <div class="font-bold text-gray-900 text-[15px] mb-1">{{ $t('products.f1_3_h') }}</div>
                  <div class="text-[13px] text-gray-500 font-medium">{{ $t('products.f1_3_b') }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Strategy 2: Heritage Steady -->
        <div class="bg-white rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.04)] overflow-hidden border border-gray-100 flex flex-col hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] transition-all duration-500">
          <div class="bg-[#BCA669] text-white text-center py-4 text-xs tracking-[0.15em] font-medium">
            {{ $t('products.fund2_stat') }}
          </div>
          <div class="p-12 flex flex-col items-center flex-1">
            <h2 class="text-2xl font-bold text-[#1c1c1c] mb-10 tracking-widest">{{ $t('products.fund2_title') }}</h2>
            
            <div class="flex w-full justify-around mb-10 text-center pb-10 border-b border-dashed border-gray-200">
              <div>
                <div class="text-[#BCA669] text-5xl font-semibold mb-3">{{ $t('products.fund2_y') }}<span class="text-2xl ml-1">%</span></div>
                <div class="text-gray-500 text-sm tracking-wide">{{ $t('products.target_yield') }}</div>
              </div>
              <div>
                <div class="text-[#1c1c1c] text-5xl font-semibold mb-3"><span class="text-2xl mr-1">&lt;</span>5<span class="text-2xl ml-1">%</span></div>
                <div class="text-gray-500 text-sm tracking-wide">{{ $t('products.target_drawdown') }}</div>
              </div>
            </div>

            <div class="text-sm font-bold text-gray-900 tracking-widest mb-8 text-center">{{ $t('products.features_title') }}</div>
            
            <div class="w-full bg-[#f7f8f9] rounded-2xl p-10 space-y-8">
              <div class="flex items-start">
                <div class="text-[#BCA669] mr-5 mt-1">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <div>
                  <div class="font-bold text-gray-900 text-[15px] mb-1">{{ $t('products.f2_1_h') }}</div>
                  <div class="text-[13px] text-gray-500 font-medium">{{ $t('products.f2_1_b') }}</div>
                </div>
              </div>
              <div class="flex items-start">
                <div class="text-[#BCA669] mr-5 mt-1">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <div>
                  <div class="font-bold text-gray-900 text-[15px] mb-1">{{ $t('products.f2_2_h') }}</div>
                  <div class="text-[13px] text-gray-500 font-medium">{{ $t('products.f2_2_b') }}</div>
                </div>
              </div>
              <div class="flex items-start">
                <div class="text-[#BCA669] mr-5 mt-1">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <div>
                  <div class="font-bold text-gray-900 text-[15px] mb-1">{{ $t('products.f2_3_h') }}</div>
                  <div class="text-[13px] text-gray-500 font-medium">{{ $t('products.f2_3_b') }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>

    <!-- White Background section for Fund Features & Risk Warning -->
    <div class="bg-white w-full py-24 px-6">
      <div class="max-w-6xl mx-auto">
        <h2 class="section-title text-center text-[#1c1c1c] mb-20 tracking-widest">{{ $t('products.highlights.title') }}</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-10 mb-24">
          <!-- Feature 1 -->
          <div class="bg-white border border-gray-100 rounded-2xl p-16 flex flex-col items-center text-center shadow-[0_12px_40px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.04)] transition-all duration-500 group">
            <div class="w-24 h-24 bg-[#f8f9fa] rounded-2xl flex items-center justify-center mb-10 group-hover:scale-105 transition-transform duration-500">
              <img :src="fund1" alt="Self-owned fund" class="w-14 h-14 object-contain" />
            </div>
            <h3 class="font-bold text-xl text-[#1c1c1c] mb-4 tracking-wider">{{ $t('products.highlights.h1_title') }}</h3>
            <p class="text-gray-400 text-sm font-medium tracking-wide">{{ $t('products.highlights.h1_desc') }}</p>
          </div>

          <!-- Feature 2 -->
          <div class="bg-white border border-gray-100 rounded-2xl p-16 flex flex-col items-center text-center shadow-[0_12px_40px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.04)] transition-all duration-500 group">
            <div class="w-24 h-24 bg-[#f8f9fa] rounded-2xl flex items-center justify-center mb-10 group-hover:scale-105 transition-transform duration-500">
              <img :src="fund2" alt="Transparent Disclosure" class="w-14 h-14 object-contain" />
            </div>
            <h3 class="font-bold text-xl text-[#1c1c1c] mb-4 tracking-wider">{{ $t('products.highlights.h2_title') }}</h3>
            <p class="text-gray-400 text-sm font-medium tracking-wide">{{ $t('products.highlights.h2_desc') }}</p>
          </div>

          <!-- Feature 3 -->
          <div class="bg-white border border-gray-100 rounded-2xl p-16 flex flex-col items-center text-center shadow-[0_12px_40px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.04)] transition-all duration-500 group">
            <div class="w-24 h-24 bg-[#f8f9fa] rounded-2xl flex items-center justify-center mb-10 group-hover:scale-105 transition-transform duration-500">
              <img :src="fund3" alt="Double Audit" class="w-14 h-14 object-contain" />
            </div>
            <h3 class="font-bold text-xl text-[#1c1c1c] mb-4 tracking-wider">{{ $t('products.highlights.h3_title') }}</h3>
            <p class="text-gray-400 text-sm font-medium tracking-wide">{{ $t('products.highlights.h3_desc') }}</p>
          </div>
        </div>

        <!-- Risk Warning Box -->
        <div class="mt-32">
          <div class="text-[#BCA669] text-[15px] font-bold tracking-widest mb-6">{{ $t('products.risk.title') }}</div>
          <div class="bg-[#F8F8F8] border border-gray-100 rounded-xl p-10 space-y-4">
            <p class="text-[13px] text-gray-500 leading-relaxed font-medium">{{ $t('products.risk.p1') }}</p>
            <p class="text-[13px] text-gray-500 leading-relaxed font-medium">{{ $t('products.risk.p2') }}</p>
            <p class="text-[13px] text-gray-500 leading-relaxed font-medium">{{ $t('products.risk.p3') }}</p>
          </div>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script setup>
import PageBanner from '../components/PageBanner.vue'
import fund1 from '../assets/images/funds/1.png'
import fund2 from '../assets/images/funds/2.png'
import fund3 from '../assets/images/funds/3.png'
</script>
