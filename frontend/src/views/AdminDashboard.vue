<template>
  <div class="min-h-screen flex bg-gray-100 font-sans">
    <!-- Mobile Sidebar Overlay -->
    <div v-if="isSidebarOpen" @click="isSidebarOpen = false" class="fixed inset-0 bg-black/50 z-40 lg:hidden"></div>

    <!-- Sidebar -->
    <aside :class="['fixed inset-y-0 left-0 z-50 bg-gray-900 text-white flex flex-col transition-all duration-300 transform lg:translate-x-0 lg:static lg:inset-0 shadow-2xl lg:shadow-none', 
       isSidebarOpen ? 'translate-x-0' : '-translate-x-full',
       isSidebarCollapsed ? 'lg:w-[72px]' : 'lg:w-64']">
      <div class="h-16 flex items-center px-4 md:px-6 border-b border-gray-800 relative">
        <div class="flex items-center overflow-hidden">
          <img :src="logo" alt="YINO Admin" class="h-7 md:h-8 w-auto object-contain brightness-0 invert shrink-0">
          <span v-if="!isSidebarCollapsed" class="ml-2 text-[10px] md:text-xs font-bold text-gray-500 tracking-tighter self-end mb-1 hidden sm:inline-block animate-[fadeIn_0.3s]">Admin</span>
        </div>
        <!-- Collapse Toggle Button (PC) -->
        <button @click="toggleSidebarCollapse" 
          class="hidden lg:flex absolute -right-3 top-8 -translate-y-1/2 w-6 h-6 bg-gray-800 rounded-full items-center justify-center border border-gray-700 text-gray-400 hover:text-white transition shadow-lg z-[60] focus:outline-none">
          <span class="text-[10px] transition-transform duration-300" :class="{ 'rotate-180': isSidebarCollapsed }">❮</span>
        </button>
        <!-- Close button on mobile -->
        <button @click="isSidebarOpen = false" class="lg:hidden absolute right-1 top-0 text-gray-400 hover:text-white p-1">
          <span class="text-2xl leading-none">&times;</span>
        </button>
      </div>
      
      <nav class="flex-1 overflow-y-auto py-4 scrollbar-hide">
        <ul class="space-y-1">
          <li v-for="link in [
            { id: 'banners', icon: '🖼️', label: 'Banners', path: '/admin/dashboard/banners' },
            { id: 'news', icon: '📰', label: '新闻动态', path: '/admin/dashboard/news' },
            { id: 'jobs', icon: '👥', label: '人才招聘', path: '/admin/dashboard/jobs' },
            { id: 'accounts', icon: '🔐', label: '账号管理', path: '/admin/dashboard/accounts' },
            { id: 'inquiries', icon: '💬', label: '咨询管理', path: '/admin/dashboard/inquiries' }
          ]" :key="link.id">
            <router-link :to="link.path" 
               @click="isSidebarOpen = false"
               :class="['flex items-center py-3 transition-all duration-300 relative group overflow-hidden', 
                isSidebarCollapsed ? 'px-0 justify-center' : 'px-6',
                currentTab === link.id ? 'bg-yino-blue text-white' : 'text-gray-400 hover:bg-gray-800']">
              <div v-if="currentTab === link.id" class="absolute left-0 top-0 bottom-0 w-1 bg-blue-400"></div>
              <span class="text-xl shrink-0" :class="{ 'mx-0': isSidebarCollapsed, 'mr-3': !isSidebarCollapsed }">{{ link.icon }}</span>
              <span v-if="!isSidebarCollapsed" class="whitespace-nowrap font-medium text-sm animate-[fadeIn_0.3s]">{{ link.label }}</span>
              
              <!-- Tooltip for collapsed mode -->
              <div v-if="isSidebarCollapsed" class="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50">
                {{ link.label }}
              </div>
            </router-link>
          </li>
        </ul>
      </nav>
      
      <div class="p-4 border-t border-gray-800 overflow-hidden">
        <div class="flex items-center mb-4 transition-all duration-300" :class="{ 'justify-center': isSidebarCollapsed }">
          <img src="https://ui-avatars.com/api/?name=Admin&background=0D8ABC&color=fff&rounded=true" alt="Admin Avatar" class="w-10 h-10 rounded-full shrink-0 border-2 border-gray-700">
          <div v-if="!isSidebarCollapsed" class="ml-3 animate-[fadeIn_0.3s] overflow-hidden whitespace-nowrap">
            <div class="text-sm font-bold truncate">{{ adminUsername }}</div>
            <div class="text-xs text-gray-400 truncate">{{ adminRole === 'admin' ? '超级管理员' : '普通用户' }}</div>
          </div>
        </div>
        <button @click="logout" class="w-full flex items-center justify-center p-2 bg-gray-800 hover:bg-red-600 text-white rounded transition-all duration-300 group relative">
          <span class="text-xl">🚪</span>
          <span v-if="!isSidebarCollapsed" class="ml-2 text-sm whitespace-nowrap animate-[fadeIn_0.3s]">退出登录</span>
          <!-- Tooltip for collapsed mode -->
          <div v-if="isSidebarCollapsed" class="absolute left-full ml-4 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50">
            退出登录
          </div>
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 flex flex-col overflow-hidden">
      <!-- Header -->
      <header class="h-16 bg-white shadow-sm flex items-center justify-between px-4 md:px-8 z-10">
        <div class="flex items-center">
          <!-- Mobile Menu Toggle -->
          <button @click="isSidebarOpen = true" class="mr-4 text-gray-600 hover:text-yino-blue lg:hidden">
            <span class="text-2xl">☰</span>
          </button>
          <h2 class="text-lg md:text-xl font-semibold text-gray-800 truncate">{{ tabTitle }}</h2>
        </div>
        <div class="flex items-center text-sm text-gray-500">
          <span class="hidden md:inline">{{ adminRole === 'admin' ? '超级管理员' : '普通用户' }}</span>
        </div>
      </header>
      
      <!-- Content Area -->
      <div class="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50">
        <!-- Banners Tab -->
        <div v-if="currentTab === 'banners'" class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div class="flex justify-between items-center mb-6">
               <h3 class="text-lg font-bold">Banner 管理</h3>
               <button @click="openModal('banner')" class="bg-yino-blue text-white px-4 py-2 rounded hover:bg-blue-800 transition">新增 Banner</button>
            </div>
            <!-- Category Filter -->
            <div class="mb-6 flex space-x-2 overflow-x-auto pb-2">
              <button 
                v-for="cat in bannerCategories" 
                :key="cat.value"
                @click="bannerCategoryFilter = cat.value"
                :class="['px-4 py-1.5 rounded-full text-sm font-medium transition whitespace-nowrap', 
                  bannerCategoryFilter === cat.value ? 'bg-yino-blue text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300']"
              >
                {{ cat.label }}
              </button>
            </div>

            <!-- Management Hint -->
            <div v-if="bannerCategoryFilter === 'home'" class="mb-6 p-4 bg-blue-50 border-l-4 border-blue-400 text-blue-700 text-sm">
              <p class="font-bold mb-1">💡 首页 Banner 说明：</p>
              <ul class="list-disc list-inside space-y-1">
                <li>首页前两张 Banner 默认锁定，修改前需要二次确认解锁。</li>
                <li><strong>展示顺序</strong>：按“排序”数值从小到大排列（建议设置 0-10）。</li>
                <li><strong>轮播容量</strong>：首页支持最多显示 10 张轮播 Banner。</li>
              </ul>
            </div>

            <div class="overflow-x-auto -mx-6 md:mx-0">
              <table class="w-full text-left border-collapse min-w-[600px] md:min-w-0">
                <thead>
                  <tr class="bg-gray-50 text-gray-600 border-b">
                    <th class="p-2 md:p-4 rounded-tl-lg">ID</th>
                    <th class="p-2 md:p-4">图片</th>
                    <th class="p-2 md:p-4">标题</th>
                    <th class="p-2 md:p-4 text-center">排序</th>
                    <th class="p-2 md:p-4 text-center">状态</th>
                    <th class="p-2 md:p-4 rounded-tr-lg text-right">操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in filteredBanners" :key="item.id" class="border-b hover:bg-gray-50 transition">
                    <td class="p-2 md:p-4 text-sm">{{ index + 1 }}</td>
                    <td class="p-2 md:p-4">
                      <img :src="item.image_url" 
                           @click="openPreview(item.image_url)"
                           class="h-10 w-16 md:h-12 md:w-20 object-cover rounded shadow-sm cursor-zoom-in hover:opacity-80 transition" />
                    </td>
                    <td class="p-2 md:p-4">
                      <div class="flex flex-col text-sm md:text-base">
                        <div class="flex items-center font-medium">
                          <span v-if="isLocked(item, index)" class="mr-1 text-orange-500" title="首页核心位已锁定">🔒</span>
                          {{ item.title_zh || item.title || '（未命名）' }}
                        </div>
                        <div v-if="item.description_zh" class="text-[10px] text-gray-400 truncate max-w-[250px]">
                          {{ item.description_zh }}
                        </div>
                      </div>
                    </td>
                    <td class="p-2 md:p-4 text-xs md:text-sm text-center">{{ item.sort_order }}</td>
                    <td class="p-2 md:p-4 text-center">
                      <span :class="item.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'" class="px-1.5 py-0.5 md:px-2 md:py-1 rounded text-[10px] md:text-xs font-medium">
                        {{ item.is_active ? '启用' : '禁用' }}
                      </span>
                    </td>
                    <td class="p-2 md:p-4 text-right space-x-1 md:space-x-2 whitespace-nowrap">
                      <template v-if="isLocked(item, index)">
                        <button @click="unlockItem(item.id)" class="text-xs md:text-sm text-orange-600 hover:text-orange-800">解锁</button>
                      </template>
                      <template v-else>
                        <button @click="editItem('banner', item)" class="text-xs md:text-sm text-blue-600 hover:text-blue-800">编辑</button>
                        <button @click="deleteItem('banner', item.id)" class="text-xs md:text-sm text-red-600 hover:text-red-800">删除</button>
                      </template>
                    </td>
                  </tr>
                  <tr v-if="filteredBanners.length === 0">
                    <td colspan="6" class="p-8 text-center text-gray-400">暂无数据</td>
                  </tr>
                </tbody>
              </table>
           </div>
        </div>

        <!-- News Tab -->
        <div v-if="currentTab === 'news'" class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
           <div class="flex justify-between items-center mb-6">
              <h3 class="text-lg font-bold">新闻管理</h3>
              <button @click="openModal('news')" class="bg-yino-blue text-white px-4 py-2 rounded hover:bg-blue-800 transition">新增新闻</button>
           </div>
           <!-- Category Filter -->
           <div class="mb-6 flex space-x-2 overflow-x-auto pb-2">
             <button 
               v-for="cat in newsCategories" 
               :key="cat.value"
               @click="newsCategoryFilter = cat.value"
               :class="['px-4 py-1.5 rounded-full text-sm font-medium transition whitespace-nowrap', 
                 newsCategoryFilter === cat.value ? 'bg-yino-blue text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300']"
             >
               {{ cat.label }}
             </button>
           </div>
           <div class="overflow-x-auto -mx-4 md:mx-0">
             <table class="w-full text-left border-collapse min-w-[700px] md:min-w-0">
               <thead>
                 <tr class="bg-gray-50 text-gray-600 border-b">
                   <th class="p-2 md:p-4 rounded-tl-lg">ID</th>
                   <th class="p-2 md:p-4">封面</th>
                   <th class="p-2 md:p-4">中文标题</th>
                   <th class="p-2 md:p-4">英文标题</th>
                   <th class="p-2 md:p-4">状态</th>
                   <th class="p-2 md:p-4 rounded-tr-lg text-right">操作</th>
                 </tr>
               </thead>
               <tbody>
                 <tr v-for="(item, index) in filteredNews" :key="item.id" class="border-b hover:bg-gray-50 transition">
                   <td class="p-2 md:p-4 text-sm">{{ index + 1 }}</td>
                   <td class="p-2 md:p-4 text-sm">
                     <img v-if="item.cover_url" :src="item.cover_url" 
                          @click="openPreview(item.cover_url)"
                          class="h-10 w-16 object-cover rounded shadow-sm cursor-zoom-in hover:opacity-80 transition" />
                     <span v-else class="text-gray-300 text-xs">无封面</span>
                   </td>
                   <td class="p-2 md:p-4 text-sm max-w-xs truncate">{{ item.title_zh }}</td>
                   <td class="p-2 md:p-4 text-sm max-w-xs truncate">{{ item.title_en }}</td>
                   <td class="p-2 md:p-4 text-sm">
                     <span :class="item.is_published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'" class="px-2 py-1 rounded text-xs font-medium">
                       {{ item.is_published ? '已发布' : '草稿' }}
                     </span>
                   </td>
                   <td class="p-2 md:p-4 text-sm text-right space-x-2">
                     <button @click="editItem('news', item)" class="text-blue-600 hover:text-blue-800">编辑</button>
                     <button @click="deleteItem('news', item.id)" class="text-red-600 hover:text-red-800">删除</button>
                   </td>
                 </tr>
                 <tr v-if="news.length === 0">
                   <td colspan="6" class="p-8 text-center text-gray-400">暂无数据</td>
                 </tr>
               </tbody>
             </table>
           </div>
        </div>

        <!-- Jobs Tab -->
        <div v-if="currentTab === 'jobs'" class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
           <div class="flex justify-between items-center mb-6">
              <h3 class="text-lg font-bold">招聘管理</h3>
              <button @click="openModal('job')" class="bg-yino-blue text-white px-4 py-2 rounded hover:bg-blue-800 transition">新增职位</button>
           </div>
           <div class="overflow-x-auto -mx-4 md:mx-0">
             <table class="w-full text-left border-collapse min-w-[700px] md:min-w-0">
               <thead>
                 <tr class="bg-gray-50 text-gray-600 border-b">
                   <th class="p-2 md:p-4 rounded-tl-lg">职位名称 (中/英)</th>
                   <th class="p-2 md:p-4">部门</th>
                   <th class="p-2 md:p-4">地点</th>
                   <th class="p-2 md:p-4">状态</th>
                   <th class="p-2 md:p-4 rounded-tr-lg text-right">操作</th>
                 </tr>
               </thead>
               <tbody>
                 <tr v-for="item in jobs" :key="item.id" class="border-b hover:bg-gray-50 transition">
                   <td class="p-2 md:p-4 text-sm">
                     <div class="font-medium text-gray-900">{{ item.title_zh }}</div>
                     <div class="text-xs text-gray-500">{{ item.title_en }}</div>
                   </td>
                   <td class="p-2 md:p-4 text-sm">
                      {{ item.department_zh }}<br>
                      <span class="text-xs text-gray-500">{{ item.department_en }}</span>
                   </td>
                   <td class="p-2 md:p-4 text-sm">
                      {{ item.location_zh }}<br>
                      <span class="text-xs text-gray-500">{{ item.location_en }}</span>
                   </td>
                   <td class="p-2 md:p-4 text-sm">
                     <span :class="item.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'" class="px-2 py-1 rounded text-xs font-medium">
                       {{ item.is_active ? '启招' : '停招' }}
                     </span>
                   </td>
                   <td class="p-2 md:p-4 text-sm text-right space-x-2">
                     <button @click="editItem('job', item)" class="text-blue-600 hover:text-blue-800">编辑</button>
                     <button @click="deleteItem('job', item.id)" class="text-red-600 hover:text-red-800">删除</button>
                   </td>
                 </tr>
                 <tr v-if="jobs.length === 0">
                   <td colspan="5" class="p-8 text-center text-gray-400">暂无数据</td>
                 </tr>
               </tbody>
             </table>
           </div>
        </div>

        <!-- Accounts Tab -->
        <div v-if="currentTab === 'accounts'" class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
           <div class="flex justify-between items-center mb-6">
              <h3 class="text-lg font-bold">账号管理</h3>
              <button v-if="adminRole === 'admin'" @click="openModal('account')" class="bg-yino-blue text-white px-4 py-2 rounded hover:bg-blue-800 transition">注册新账号</button>
           </div>
           <div class="overflow-x-auto -mx-4 md:mx-0">
             <table class="w-full text-left border-collapse min-w-[700px] md:min-w-0">
               <thead>
                  <tr class="bg-gray-50 text-gray-600 border-b">
                    <th class="p-2 md:p-4 rounded-tl-lg">ID</th>
                    <th class="p-2 md:p-4">用户名</th>
                    <th class="p-2 md:p-4">角色</th>
                    <th class="p-2 md:p-4">创建时间</th>
                    <th class="p-2 md:p-4 rounded-tr-lg text-right">操作</th>
                  </tr>
                </thead>
               <tbody>
                 <tr v-for="(item, index) in accounts" :key="item.id" class="border-b hover:bg-gray-50 transition">
                   <td class="p-2 md:p-4 text-sm">{{ index + 1 }}</td>
                   <td class="p-2 md:p-4 text-sm font-medium">
                      {{ item.username }}
                      <span v-if="item.username === adminUsername" class="ml-2 text-xs text-yino-blue font-normal">(当前账号)</span>
                    </td>
                   <td class="p-2 md:p-4 text-sm">
                     <span :class="item.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'" class="px-2 py-1 rounded text-xs font-medium">
                       {{ item.role === 'admin' ? '管理员' : '普通用户' }}
                     </span>
                   </td>
                   <td class="p-2 md:p-4 text-sm text-gray-500">{{ new Date(item.created_at).toLocaleString() }}</td>
                    <td class="p-2 md:p-4 text-sm text-right space-x-2">
                      <button v-if="canEditAccount(item)" @click="editItem('account', item)" class="text-blue-600 hover:text-blue-800">编辑</button>
                      <button v-if="canDeleteAccount(item)" @click="deleteItem('account', item.id)" class="text-red-600 hover:text-red-800">删除</button>
                    </td>
                  </tr>
                 <tr v-if="accounts.length === 0">
                   <td colspan="5" class="p-8 text-center text-gray-400">暂无数据</td>
                 </tr>
               </tbody>
             </table>
           </div>
        </div>

        <!-- Inquiries Tab -->
        <div v-if="currentTab === 'inquiries'" class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
           <div class="flex justify-between items-center mb-6">
              <h3 class="text-lg font-bold">在线咨询管理</h3>
              <div class="text-sm text-gray-500">共 {{ inquiries.length }} 条咨询</div>
           </div>
           <div class="overflow-x-auto -mx-4 md:mx-0">
             <table class="w-full text-left border-collapse min-w-[800px] md:min-w-0">
               <thead>
                  <tr class="bg-gray-50 text-gray-600 border-b">
                    <th class="p-2 md:p-4 rounded-tl-lg">姓名</th>
                    <th class="p-2 md:p-4">手机号</th>
                    <th class="p-2 md:p-4">邮箱</th>
                    <th class="p-2 md:p-4">咨询内容</th>
                    <th class="p-2 md:p-4">提交时间</th>
                    <th class="p-2 md:p-4 rounded-tr-lg text-right">操作</th>
                  </tr>
                </thead>
               <tbody>
                 <tr v-for="item in inquiries" :key="item.id" class="border-b hover:bg-gray-50 transition">
                   <td class="p-2 md:p-4 text-sm font-medium">{{ item.name }}</td>
                   <td class="p-2 md:p-4 text-sm">{{ item.phone || '-' }}</td>
                   <td class="p-2 md:p-4 text-sm text-blue-600">{{ item.email }}</td>
                   <td class="p-2 md:p-4 text-sm max-w-md">
                     <div class="whitespace-pre-line text-gray-600">{{ item.content }}</div>
                   </td>
                   <td class="p-2 md:p-4 text-sm text-gray-500">{{ new Date(item.created_at).toLocaleString() }}</td>
                    <td class="p-2 md:p-4 text-sm text-right">
                      <button @click="deleteItem('inquiry', item.id)" class="text-red-600 hover:text-red-800 font-medium">删除</button>
                    </td>
                  </tr>
                 <tr v-if="inquiries.length === 0">
                   <td colspan="6" class="p-8 text-center text-gray-400">暂无咨询数据</td>
                 </tr>
               </tbody>
             </table>
           </div>
        </div>
      </div>
    </main>
    
    <!-- Modal -->
    <Transition name="fade">
      <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" @click="closeModal"></div>
        
        <!-- Modal Content -->
        <div class="relative bg-white rounded-xl shadow-2xl w-full md:max-w-2xl max-h-[95vh] md:max-h-[90vh] overflow-y-auto transform transition-all animate-modal-in">
          <div class="px-6 py-4 border-b flex justify-between items-center bg-gray-50 rounded-t-xl sticky top-0 z-10">
            <h3 class="text-xl font-bold text-gray-800">{{ isEditing ? '编辑' : '新增' }} {{ modalTypeTitle }}</h3>
            <button @click="closeModal" class="text-gray-400 hover:text-gray-600 transition text-2xl leading-none">&times;</button>
          </div>
        
        <form @submit.prevent="submitForm" class="p-6 space-y-4">
          
          <!-- Banner Form -->
          <template v-if="modalType === 'banner'">
            <div class="grid grid-cols-1 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">展示分类</label>
                <select v-model="formData.category" class="w-full rounded-md border-gray-300 shadow-sm focus:border-yino-blue focus:ring-yino-blue px-3 py-2 border outline-none bg-white">
                  <option v-for="cat in bannerCategories" :key="cat.value" :value="cat.value">{{ cat.label }}</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">图片 (必需)</label>
                <input type="file" @change="handleFileUpload" class="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/>
                <img v-if="formData.image_url" :src="formData.image_url" class="mt-2 h-24 object-cover rounded border" />
              </div>

              <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0">
                <div class="flex-1 sm:mr-4">
                  <label class="block text-sm font-medium text-gray-700 mb-1">主标题 (中文)</label>
                  <input v-model="formData.title_zh" type="text" 
                         :placeholder="bannerIndex === 0 ? '（默认：专注资产配置...）' : '输入 Banner 中文主标题...'" 
                         class="w-full rounded-md border-gray-300 shadow-sm focus:border-yino-blue focus:ring-yino-blue px-3 py-2 border outline-none text-sm font-bold" />
                </div>
                <button type="button" @click="autoTranslateBanner" class="sm:mt-5 px-4 py-2 bg-yino-gold/10 text-yino-gold rounded-lg hover:bg-yino-gold/20 transition text-sm font-bold flex items-center justify-center">
                  <span class="mr-1">✨</span> 翻译内容
                </button>
              </div>

              <div class="mt-4">
                <label class="block text-sm font-medium text-gray-700 mb-1">副标题/描述 (中文)</label>
                <textarea v-model="formData.description_zh" rows="2" 
                          :placeholder="bannerIndex === 0 ? '（默认：以买方视角为核心...）' : (bannerIndex === 1 ? '（默认：成功案例）' : '输入 Banner 中文副标题...')" 
                          class="w-full rounded-md border-gray-300 shadow-sm focus:border-yino-blue focus:ring-yino-blue px-3 py-2 border outline-none text-sm"></textarea>
              </div>

              <!-- Translation Toggle -->
              <div class="flex items-center space-x-2 py-2 mt-2">
                <input v-model="showTranslationForm" type="checkbox" id="banner-trans" class="rounded text-yino-blue focus:ring-yino-blue" />
                <label for="banner-trans" class="text-sm font-medium text-gray-600 cursor-pointer">管理英文翻译 (手动微调)</label>
              </div>

              <div v-if="showTranslationForm" class="space-y-4 p-4 bg-gray-50 rounded-lg border border-dashed border-gray-300 animate-[fadeIn_0.3s_ease-out]">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Main Title (EN)</label>
                  <input v-model="formData.title_en" type="text" placeholder="Enter Banner English title..." class="w-full rounded-md border-gray-300 shadow-sm focus:border-yino-blue focus:ring-yino-blue px-3 py-2 border outline-none text-sm font-medium" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Subtitle/Description (EN)</label>
                  <textarea v-model="formData.description_en" rows="2" placeholder="Enter Banner English subtitle..." class="w-full rounded-md border-gray-300 shadow-sm focus:border-yino-blue focus:ring-yino-blue px-3 py-2 border outline-none text-sm"></textarea>
                </div>
              </div>

              <div class="mt-4">
                <label class="block text-sm font-medium text-gray-700 mb-1">跳转设置</label>
                <!-- Link Type Toggle -->
                <div class="flex items-center space-x-6 mb-3 p-2 bg-gray-50 rounded-lg max-w-fit">
                  <label class="flex items-center cursor-pointer group">
                    <input type="radio" v-model="bannerLinkType" value="custom" class="w-4 h-4 text-yino-blue border-gray-300 focus:ring-yino-blue">
                    <span class="ml-2 text-sm text-gray-600 group-hover:text-gray-900 transition">自定义链接</span>
                  </label>
                  <label class="flex items-center cursor-pointer group">
                    <input type="radio" v-model="bannerLinkType" value="news" class="w-4 h-4 text-yino-blue border-gray-300 focus:ring-yino-blue">
                    <span class="ml-2 text-sm text-gray-600 group-hover:text-gray-900 transition">链接至新闻</span>
                  </label>
                </div>

                <!-- News Selector Dropdown -->
                <div v-if="bannerLinkType === 'news'" class="space-y-2 animate-[fadeIn_0.3s_ease-out]">
                  <select v-model="selectedNewsId" class="w-full rounded-md border-gray-300 shadow-sm focus:border-yino-blue focus:ring-yino-blue px-3 py-2 border outline-none bg-white text-sm">
                    <option value="" disabled>请选择目标新闻...</option>
                    <option v-for="n in news" :key="n.id" :value="n.id">
                      [{{ n.category === 'insight' ? '洞察' : '新闻' }}] {{ n.title_zh }}
                    </option>
                  </select>
                  <p class="text-[10px] text-gray-400 pl-1 italic">
                    自动填充链接: <span class="text-yino-blue">{{ formData.link || '未选择' }}</span>
                  </p>
                </div>

                <!-- Custom Link Input -->
                <input v-else v-model="formData.link" type="text" 
                       placeholder="请输入跳转地址 (如: /about 或 https://...)"
                       class="w-full rounded-md border-gray-300 shadow-sm focus:border-yino-blue focus:ring-yino-blue px-3 py-2 border outline-none text-sm transition-all" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">排序优先级</label>
                <input v-model.number="formData.sort_order" type="number" class="w-full rounded-md border-gray-300 shadow-sm focus:border-yino-blue focus:ring-yino-blue px-3 py-2 border outline-none" />
              </div>
               <div>
                <label class="flex items-center space-x-2">
                  <input v-model="formData.is_active" type="checkbox" class="rounded text-yino-blue focus:ring-yino-blue" />
                  <span class="text-sm font-medium text-gray-700">启用该Banner</span>
                </label>
              </div>
            </div>
          </template>

          <!-- News Form -->
          <template v-if="modalType === 'news'">
             <div class="grid grid-cols-1 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">内容分类</label>
                <select v-model="formData.category" class="w-full rounded-md border-gray-300 shadow-sm focus:border-yino-blue focus:ring-yino-blue px-3 py-2 border outline-none bg-white">
                  <option v-for="cat in newsCategories.filter(c => c.value !== 'all')" :key="cat.value" :value="cat.value">{{ cat.label }}</option>
                </select>
              </div>
              <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0">
                <div class="flex-1 sm:mr-4">
                  <label class="block text-sm font-medium text-gray-700 mb-1">标题</label>
                  <input v-model="formData.title_zh" required type="text" class="w-full rounded-md border-gray-300 shadow-sm focus:border-yino-blue focus:ring-yino-blue px-3 py-2 border outline-none" placeholder="输入中文标题" />
                </div>
                <button type="button" @click="autoTranslateNews" class="sm:mt-5 px-4 py-2 bg-yino-gold/10 text-yino-gold rounded-lg hover:bg-yino-gold/20 transition text-sm font-bold flex items-center justify-center">
                  <span class="mr-1">✨</span> 一键翻译
                </button>
              </div>

              <!-- Translation Management Toggle -->
              <div class="flex items-center space-x-2 py-2">
                <input v-model="showTranslationForm" type="checkbox" id="manage-trans" class="rounded text-yino-blue focus:ring-yino-blue" />
                <label for="manage-trans" class="text-sm font-medium text-gray-600 cursor-pointer">管理英文翻译 (手动微调)</label>
              </div>

              <div v-if="showTranslationForm">
                <label class="block text-sm font-medium text-gray-700 mb-1">英文标题</label>
                <input v-model="formData.title_en" type="text" class="w-full rounded-md border-gray-300 shadow-sm focus:border-yino-blue focus:ring-yino-blue px-3 py-2 border outline-none font-medium" />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">摘要/描述</label>
                <textarea v-model="formData.description_zh" rows="2" class="w-full rounded-md border-gray-300 shadow-sm focus:border-yino-blue focus:ring-yino-blue px-3 py-2 border outline-none" placeholder="输入中文摘要..."></textarea>
              </div>

              <div v-if="showTranslationForm">
                <label class="block text-sm font-medium text-gray-700 mb-1">英文摘要</label>
                <textarea v-model="formData.description_en" rows="2" class="w-full rounded-md border-gray-300 shadow-sm focus:border-yino-blue focus:ring-yino-blue px-3 py-2 border outline-none"></textarea>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">正文内容 (支持 Word/网页格式粘贴)</label>
                <RichEditor ref="editorZh" v-model="formData.content_zh" placeholder="输入具体新闻内容..." />
              </div>

              <div v-if="showTranslationForm">
                <label class="block text-sm font-medium text-gray-700 mb-1">英文正文</label>
                <RichEditor ref="editorEn" v-model="formData.content_en" />
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">编写日期</label>
                  <input v-model="formData.created_at" type="date" class="w-full rounded-md border-gray-300 shadow-sm focus:border-yino-blue focus:ring-yino-blue px-3 py-2 border outline-none" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">封面图 (可选)</label>
                  <input type="file" @change="handleFileUpload" class="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/>
                </div>
              </div>

               <div class="flex items-center justify-between">
                <label class="flex items-center space-x-2">
                  <input v-model="formData.is_published" type="checkbox" class="rounded text-yino-blue focus:ring-yino-blue" />
                  <span class="text-sm font-medium text-gray-700">直接发布</span>
                </label>
                <img v-if="formData.cover_url" :src="formData.cover_url" class="h-10 w-16 object-cover rounded border" />
              </div>
             </div>
          </template>

          <!-- Jobs Form -->
          <template v-if="modalType === 'job'">
             <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">职位名称 (中文)</label>
                <input v-model="formData.title_zh" required type="text" class="w-full rounded-md border-gray-300 shadow-sm px-3 py-2 border outline-none" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">薪资范围</label>
                <input v-model="formData.salary" type="text" class="w-full rounded-md border-gray-300 shadow-sm px-3 py-2 border outline-none" placeholder="如: 50-80K" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">部门 (中文)</label>
                <input v-model="formData.department_zh" type="text" class="w-full rounded-md border-gray-300 shadow-sm px-3 py-2 border outline-none" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">工作地点 (中文)</label>
                <input v-model="formData.location_zh" type="text" class="w-full rounded-md border-gray-300 shadow-sm px-3 py-2 border outline-none" />
              </div>

              <!-- Hiding English fields for Jobs (Auto-translated on save) -->
              <template v-if="false">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">职位名称 (英文)</label>
                  <input v-model="formData.title_en" type="text" class="w-full rounded-md border-gray-300 shadow-sm px-3 py-2 border outline-none" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">部门 (英文)</label>
                  <input v-model="formData.department_en" type="text" class="w-full rounded-md border-gray-300 shadow-sm px-3 py-2 border outline-none" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">工作地点 (英文)</label>
                  <input v-model="formData.location_en" type="text" class="w-full rounded-md border-gray-300 shadow-sm px-3 py-2 border outline-none" />
                </div>
              </template>
              
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-1">职位描述 (中文)</label>
                <textarea v-model="formData.description_zh" rows="3" class="w-full rounded-md border border-gray-300 px-3 py-2 outline-none"></textarea>
              </div>
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-1">岗位要求 (中文)</label>
                <textarea v-model="formData.requirements_zh" rows="3" class="w-full rounded-md border border-gray-300 px-3 py-2 outline-none"></textarea>
              </div>

               <div class="md:col-span-2">
                <label class="flex items-center space-x-2">
                  <input v-model="formData.is_active" type="checkbox" class="rounded text-yino-blue focus:ring-yino-blue" />
                  <span class="text-sm font-medium text-gray-700">启用招聘</span>
                </label>
              </div>
             </div>
          </template>

          <!-- Account Form -->
          <template v-if="modalType === 'account'">
             <div class="grid grid-cols-1 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">用户名</label>
                <input v-model="formData.username" required type="text" class="w-full rounded-md border-gray-300 shadow-sm px-3 py-2 border outline-none" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">密码 {{ isEditing ? '(留空不修改)' : '(必需)' }}</label>
                <input v-model="formData.password" :required="!isEditing" type="password" class="w-full rounded-md border-gray-300 shadow-sm px-3 py-2 border outline-none" />
              </div>
              <div v-if="adminRole === 'admin' && formData.username !== 'admin'">
                <label class="block text-sm font-medium text-gray-700 mb-1">角色权限</label>
                <select v-model="formData.role" class="w-full rounded-md border-gray-300 shadow-sm px-3 py-2 border outline-none bg-white">
                  <option value="user">普通用户</option>
                  <option value="admin">管理员</option>
                </select>
              </div>
             </div>
          </template>
          
          <div class="mt-6 pt-4 border-t flex justify-end space-x-3">
            <button type="button" @click="closeModal" :disabled="isSubmitting" class="px-5 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition disabled:opacity-50">取消</button>
            <button type="submit" :disabled="isSubmitting" class="px-5 py-2.5 bg-yino-blue text-white rounded-lg hover:bg-blue-800 transition shadow-sm flex items-center justify-center min-w-[100px] disabled:opacity-75 disabled:cursor-not-allowed">
              <svg v-if="isSubmitting" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ isSubmitting ? '保存中...' : (isEditing ? '保存修改' : '确认新增') }}
            </button>
          </div>
        </form>
        </div>
      </div>
    </Transition>

    <!-- Image Preview Modal -->
    <Transition name="fade">
      <div v-if="showPreview" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/80 backdrop-blur-md" @click="closePreview"></div>
        
        <!-- Preview Content -->
        <div class="relative max-w-5xl max-h-[90vh] overflow-hidden rounded-lg shadow-2xl animate-modal-in">
          <button @click="closePreview" class="absolute top-4 right-4 text-white text-3xl hover:text-gray-300 z-10 leading-none">&times;</button>
          <img :src="previewUrl" class="max-w-full max-h-[90vh] object-contain" />
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRouter, useRoute, onBeforeRouteLeave } from 'vue-router'
import request from '../api/request'
import axios from 'axios'
import { dialog } from '../utils/ui'
import RichEditor from '../components/RichEditor.vue'
import logo from '../assets/images/logo.png'


const router = useRouter()
const route = useRoute()
const currentTab = ref(route.params.tab || 'banners')
const banners = ref([])
const news = ref([])
const jobs = ref([])
const accounts = ref([])
const inquiries = ref([])

const adminUsername = ref('Admin')
const adminRole = ref('admin')
const adminUserId = ref(null)
const editorZh = ref(null)
const editorEn = ref(null)

const showModal = ref(false)
const modalType = ref('banner')
const isEditing = ref(false)
const bannerIndex = ref(-1) // Track index for placeholders
const showTranslationForm = ref(false) // Toggle for English fields
const formData = ref({})
const isSidebarOpen = ref(false)
const isSidebarCollapsed = ref(localStorage.getItem('yino_admin_sidebar_collapsed') === 'true')
const bannerCategoryFilter = ref('home')
const newsCategoryFilter = ref('all')
const unlockedBannerIds = ref([])
const showPreview = ref(false)
const previewUrl = ref('')
const toggleSidebarCollapse = () => {
  isSidebarCollapsed.value = !isSidebarCollapsed.value
  localStorage.setItem('yino_admin_sidebar_collapsed', isSidebarCollapsed.value)
}

const isSubmitting = ref(false)

// Banner Link Type Tracking
const bannerLinkType = ref('custom') // 'custom' or 'news'
const selectedNewsId = ref('')

watch(selectedNewsId, (newId) => {
  if (modalType.value === 'banner' && bannerLinkType.value === 'news' && newId) {
    formData.value.link = `/news/${newId}`
  }
})

watch(bannerLinkType, (newType) => {
  if (modalType.value === 'banner') {
    if (newType === 'custom') {
      // Keep existing link or clear if it was a news link
      if (formData.value.link && formData.value.link.startsWith('/news/')) {
        // Option: clear or keep. Let's keep for now but allow editing.
      }
    } else if (newType === 'news' && selectedNewsId.value) {
      formData.value.link = `/news/${selectedNewsId.value}`
    }
  }
})

const openPreview = (url) => {
  if (!url) return
  previewUrl.value = url
  showPreview.value = true
}

const closePreview = () => {
  showPreview.value = false
}

const newsCategories = [
  { label: '全部', value: 'all' },
  { label: '一诺洞察', value: 'insight' },
  { label: '新闻资讯', value: 'news' }
]

const bannerCategories = [
  { label: '首页', value: 'home' },
  { label: '财富管理', value: 'wealth-management' },
  { label: '资产管理', value: 'asset-management' },
  { label: '家族办公室', value: 'family-office' },
  { label: '新闻中心', value: 'news' },
  { label: '关于我们', value: 'about' },
  { label: '加入我们', value: 'join' },
  { label: '联系我们', value: 'contact' }
]

const filteredBanners = computed(() => {
  return banners.value.filter(b => b.category === bannerCategoryFilter.value)
})

const filteredNews = computed(() => {
  if (newsCategoryFilter.value === 'all') return news.value
  return news.value.filter(n => n.category === newsCategoryFilter.value)
})

const isLocked = (item, index) => {
  if (item.category !== 'home') return false
  if (index >= 2) return false
  return !unlockedBannerIds.value.includes(item.id)
}

const unlockItem = async (id) => {
  if (await dialog.confirm('解锁确认', '该首页 Banner 目前处于锁定状态，确定要解锁以进行修改吗？')) {
    unlockedBannerIds.value.push(id)
  }
}

// We will store the File object here before uploading to preview
const selectedFile = ref(null)


const tabTitle = computed(() => {
  const map = { banners: 'Banner 轮播管理', news: '新闻动态管理', jobs: '人才招聘管理', accounts: '系统账号管理', inquiries: '在线咨询管理' }
  return map[currentTab.value]
})

const modalTypeTitle = computed(() => {
  const map = { banner: 'Banner', news: '新闻', job: '职位', account: '账号' }
  return map[modalType.value]
})

const canEditAccount = (user) => {
  if (adminUsername.value === 'admin') return true
  if (user.username === adminUsername.value) return true
  if (adminRole.value === 'admin' && user.role === 'user') return true
  return false
}

const canDeleteAccount = (user) => {
  if (user.username === adminUsername.value) return false
  if (user.username === 'admin') return false
  if (adminUsername.value === 'admin') return true
  if (adminRole.value === 'admin' && user.role === 'user') return true
  return false
}

const isLoggingOut = ref(false)

onMounted(() => {
  const userStr = localStorage.getItem('yino_admin_user')
  if (userStr) {
    const user = JSON.parse(userStr)
    adminUsername.value = user.username
    adminRole.value = user.role
  }
  fetchData()

  // Add beforeunload listener for browser level navigation (refresh, tab close)
  window.addEventListener('beforeunload', handleBeforeUnload)
})

onUnmounted(() => {
  // Clean up listener
  window.removeEventListener('beforeunload', handleBeforeUnload)
})

const handleBeforeUnload = (event) => {
  if (showModal.value) {
    // Most modern browsers ignore the custom message and show a standard one
    event.preventDefault()
    event.returnValue = ''
  }
}

// Vue Router guard for internal navigation (back button, link clicks)
onBeforeRouteLeave((to, from, next) => {
  if (isLoggingOut.value || !showModal.value) {
    next()
    return
  }
  
  // Only confirm if a modal is open (meaning user is likely adding/editing)
  const answer = window.confirm('您正在编辑内容，确定要离开吗？未保存的数据将会丢失。')
  if (answer) {
    next()
  } else {
    next(false)
  }
})


watch(currentTab, (newTab) => {
  router.push(`/admin/dashboard/${newTab}`)
  fetchData()
})

watch(() => route.params.tab, (newTab) => {
  if (newTab && newTab !== currentTab.value) {
    currentTab.value = newTab
    fetchData()
  }
})


const fetchData = async () => {
  try {
    if (currentTab.value === 'banners') {
      banners.value = await request.get('/admin/banners')
    } else if (currentTab.value === 'news') {
      news.value = await request.get('/admin/news')
    } else if (currentTab.value === 'jobs') {
      jobs.value = await request.get('/admin/jobs')
    } else if (currentTab.value === 'accounts') {
      accounts.value = await request.get('/admin/users')
    } else if (currentTab.value === 'inquiries') {
      inquiries.value = await request.get('/admin/inquiries')
    }
  } catch (err) {
    if (err.response && err.response.status === 401) {
      localStorage.removeItem('yino_admin_token')
      localStorage.removeItem('yino_admin_user')
      router.push('/admin/login')
    }
    console.error('Failed to fetch data', err)
  }
}

const logout = async () => {
  if (!(await dialog.confirm('提示', '确定要退出登录吗？'))) return
  isLoggingOut.value = true
  localStorage.removeItem('yino_admin_token')
  localStorage.removeItem('yino_admin_user')
  router.push('/admin/login')
}


const getBlankForm = (type) => {
  if (type === 'banner') {
    formData.value = { 
      title_zh: '', title_en: '', description_zh: '', description_en: '',
      image_url: '', link: '', category: bannerCategoryFilter.value, sort_order: 0, is_active: true 
    }
    bannerLinkType.value = 'custom'
    selectedNewsId.value = ''
    showTranslationForm.value = false
    return formData.value
  }
  if (type === 'news') return { 
    title_zh: '', title_en: '', 
    description_zh: '', description_en: '',
    content_zh: '', content_en: '', 
    cover_url: '', category: newsCategoryFilter.value === 'all' ? 'news' : newsCategoryFilter.value, is_published: true,
    created_at: new Date().toISOString().split('T')[0]
  }

  if (type === 'job') return { title_zh: '', title_en: '', department_zh: '', department_en: '', location_zh: '', location_en: '', description_zh: '', description_en: '', requirements_zh: '', requirements_en: '', salary: '', is_active: true }
  if (type === 'account') return { username: '', password: '', role: 'user' }
  return {}
}

const openModal = async (type) => {
  modalType.value = type
  isEditing.value = false
  bannerIndex.value = -1
  selectedFile.value = null
  formData.value = getBlankForm(type)
  selectedFile.value = null // reset file
  
  if (type === 'banner') {
    bannerLinkType.value = 'custom'
    selectedNewsId.value = ''
    // Ensure we have news list for the dropdown
    if (news.value.length === 0) {
      try {
        news.value = await request.get('/admin/news')
      } catch (e) { console.error(e) }
    }
  }
  
  showModal.value = true
}

const editItem = async (type, item) => {
  modalType.value = type
  isEditing.value = true
  selectedFile.value = null // reset file
  formData.value = JSON.parse(JSON.stringify(item))
  
  if (type === 'banner') {
    // Find index for placeholder logic
    bannerIndex.value = filteredBanners.value.findIndex(b => b.id === item.id)
    
    formData.value.is_active = !!formData.value.is_active
    
    // Migration for old data: if localized fields are empty, use the legacy title
    if (!formData.value.title_zh && formData.value.title) {
      formData.value.title_zh = formData.value.title
    }
    
    // Infer link type
    if (formData.value.link && formData.value.link.startsWith('/news/')) {
      bannerLinkType.value = 'news'
      selectedNewsId.value = formData.value.link.replace('/news/', '')
    } else {
      bannerLinkType.value = 'custom'
      selectedNewsId.value = ''
    }
    
    // Ensure we have news list
    if (news.value.length === 0) {
      try {
        news.value = await request.get('/admin/news')
      } catch (e) { console.error(e) }
    }
  }
  
  if(type==='news') {
    formData.value.is_published = !!formData.value.is_published
    // Format date string for input: "YYYY-MM-DD"
    if (formData.value.created_at) {
      formData.value.created_at = formData.value.created_at.split(' ')[0]
    }
  }
  if(type==='job') formData.value.is_active = !!formData.value.is_active
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}

const handleFileUpload = (e) => {
  const file = e.target.files[0]
  if (!file) return
  selectedFile.value = file
  
  // Local preview without uploading
  const previewUrl = URL.createObjectURL(file)
  if (modalType.value === 'banner') {
    formData.value.image_url = previewUrl
  } else if (modalType.value === 'news') {
    formData.value.cover_url = previewUrl
  }
}

const uploadImagePending = async () => {
  if (!selectedFile.value) return null
  
  const form = new FormData()
  form.append('file', selectedFile.value)
  
  try {
    const token = localStorage.getItem('yino_admin_token')
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      }
    }
    // Remove direct baseURL mapping. Allow it to hit the relative path so Vite proxy catches it
    const res = await axios.post('/api/admin/upload', form, config)
    return res.data.url
  } catch (err) {
    console.error('Upload real image failed', err)
    if (err.response && (err.response.status === 413 || (err.response.status === 500 && err.response.data?.message?.includes('File too large')))) {
      throw new Error('文件过大请压缩再上传')
    }
    throw new Error('Image upload failed')
  }
}

const autoTranslateBanner = async () => {
  if (!formData.value.title_zh && !formData.value.description_zh) {
    dialog.toast('请先输入中文标题或描述', 'info')
    return
  }
  
  try {
    const texts = [formData.value.title_zh || '', formData.value.description_zh || '']
    const res = await request.post('/admin/translate', { text: texts, to: 'en' })
    if (res.translated && res.translated.length === 2) {
      if (formData.value.title_zh) formData.value.title_en = res.translated[0]
      if (formData.value.description_zh) formData.value.description_en = res.translated[1]
      showTranslationForm.value = true
      dialog.toast('翻译及同步成功', 'success')
    }
  } catch (err) {
    dialog.toast('翻译失败，请检查网络或重试', 'error')
  }
}

const autoTranslateNews = async () => {
  if (!formData.value.title_zh && !formData.value.description_zh && !formData.value.content_zh) {
    dialog.alert('提示', '请先填写中文内容')
    return
  }

  const loading = dialog.loading('正在智能生成英文内容...')
  try {
    // Collect texts to translate (using array to save API calls)
    const texts = [
      formData.value.title_zh || '',
      formData.value.description_zh || '',
      formData.value.content_zh || ''
    ]
    
    // We send them to our backend proxy to avoid CORS/API key issues
    const res = await request.post('/admin/translate', { text: texts, to: 'en' })
    const results = res.translated
    
    if (results && results.length === 3) {
      formData.value.title_en = results[0]
      formData.value.description_en = results[1]
      formData.value.content_en = results[2]
      showTranslationForm.value = true
      dialog.toast('翻译完成！')
    }
  } catch (err) {
    console.error('Auto translate failed', err)
    dialog.alert('失败', '智能翻译服务暂不可用，请稍后再试或手动填写。')
  } finally {
    loading.close()
  }
}

const submitForm = async () => {
  if (isSubmitting.value) return
  isSubmitting.value = true
  
  try {
    // Auto translate for Jobs
    if (modalType.value === 'job') {
      const texts = [
        formData.value.title_zh || '',
        formData.value.department_zh || '',
        formData.value.location_zh || '',
        formData.value.description_zh || '',
        formData.value.requirements_zh || ''
      ]
      try {
        const res = await request.post('/admin/translate', { text: texts, to: 'en' })
        if (res.translated && res.translated.length === 5) {
          formData.value.title_en = res.translated[0]
          formData.value.department_en = res.translated[1]
          formData.value.location_en = res.translated[2]
          formData.value.description_en = res.translated[3]
          formData.value.requirements_en = res.translated[4]
        }
      } catch (err) {
        console.error('Job auto translation failed:', err)
      }
    }

    // Auto translate for News if title_en is empty but zh content exists
    if (modalType.value === 'news' && !formData.value.title_en && formData.value.title_zh) {
      if (editorZh.value) {
        formData.value.content_zh = await editorZh.value.uploadAndGetContent()
      }
      const texts = [
        formData.value.title_zh || '',
        formData.value.description_zh || '',
        formData.value.content_zh || ''
      ]
      try {
        // Translation loading state is not handled here to avoid blocking the submit logic UI flow, 
        // but since it's within wait/try-catch it will effectively block the submission until done.
        const res = await request.post('/admin/translate', { text: texts, to: 'en' })
        if (res.translated && res.translated.length === 3) {
          formData.value.title_en = res.translated[0]
          formData.value.description_en = res.translated[1]
          formData.value.content_en = res.translated[2]
          showTranslationForm.value = true
        }
      } catch (err) {
        console.error('News auto translation failed on submit:', err)
      }
    }

    // If a new file is selected, upload it FIRST before saving data
    if (selectedFile.value) {
       const uploadedUrl = await uploadImagePending()
       if(uploadedUrl) {
         if (modalType.value === 'banner') {
            formData.value.image_url = uploadedUrl
         } else if (modalType.value === 'news') {
            formData.value.cover_url = uploadedUrl
         }
       } else {
         // If uploadImagePending returns null (meaning an error occurred and was handled there),
         // we should stop the submission process.
         return 
       }
    }

    // For news, trigger image uploads in RichEditor
    if (modalType.value === 'news') {
      if (editorZh.value) {
        formData.value.content_zh = await editorZh.value.uploadAndGetContent()
      }
      if (editorEn.value && showTranslationForm.value) {
        formData.value.content_en = await editorEn.value.uploadAndGetContent()
      }
    }

    const endpointMap = {
      'banner': '/admin/banners',
      'news': '/admin/news',
      'job': '/admin/jobs',
      'account': isEditing.value ? '/admin/users' : '/auth/register'
    }
    const endpoint = endpointMap[modalType.value]
    const payload = { ...formData.value }

    if(modalType.value==='banner') payload.is_active = payload.is_active ? 1 : 0
    if(modalType.value==='news') payload.is_published = payload.is_published ? 1 : 0
    if(modalType.value==='job') payload.is_active = payload.is_active ? 1 : 0
    
    if (modalType.value === 'account' && isEditing.value && !payload.password) {
      delete payload.password
    }

    if (isEditing.value) {
      await request.put(`${endpoint}/${formData.value.id}`, payload)
    } else {
      await request.post(endpoint, payload)
    }
    closeModal()
    dialog.toast('保存成功', 'success')
    fetchData()
  } catch (err) {
    console.error('Submit failed', err)
    let errorMsg = '保存数据失败'
    if (err.message === '文件过大请压缩再上传') {
      errorMsg = err.message
    } else if (err.message === 'Image upload failed') {
      errorMsg = '图片上传失败'
    } else if (err.response?.data?.message) {
      errorMsg = err.response.data.message
    }
    dialog.toast(errorMsg, 'error')
  } finally {
    isSubmitting.value = false
  }
}

const deleteItem = async (type, id) => {
  if (!(await dialog.confirm('删除确认', '确定要删除这条数据吗？此操作不可恢复。'))) return
  
  const endpointMap = {
    'banner': '/admin/banners',
    'news': '/admin/news',
    'job': '/admin/jobs',
    'account': '/admin/users',
    'inquiry': '/admin/inquiries'
  }
  const endpoint = `${endpointMap[type]}/${id}`
  try {
    await request.delete(endpoint)
    dialog.toast('删除成功', 'success')
    fetchData()
  } catch (err) {
    console.error('Delete failed', err)
    dialog.toast('删除失败', 'error')
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
  from { opacity: 0; transform: scale(0.95) translateY(10px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}
.animate-modal-in {
  animation: modal-in 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateX(-10px); }
  to { opacity: 1; transform: translateX(0); }
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
