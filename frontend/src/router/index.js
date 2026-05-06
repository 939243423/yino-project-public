import { createRouter, createWebHistory } from 'vue-router'
import App from '../App.vue'

// Import placeholders for now
const Home = () => import('../views/Home.vue')
const About = () => import('../views/About.vue')
const Biz = () => import('../views/Biz.vue')
const News = () => import('../views/News.vue')
const Join = () => import('../views/Join.vue')
const Funds = () => import('../views/Funds.vue')
const Contact = () => import('../views/Contact.vue')
const NewsDetail = () => import('../views/NewsDetail.vue')
const AdminLogin = () => import('../views/AdminLogin.vue')
const AdminDashboard = () => import('../views/AdminDashboard.vue')
const AssetManagement = () => import('../views/AssetManagement.vue')
const FamilyOffice = () => import('../views/FamilyOffice.vue')
const WealthManagement = () => import('../views/WealthManagement.vue')

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/about', name: 'About', component: About },
  { path: '/biz', name: 'Biz', component: Biz },
  { path: '/wealth-management', name: 'WealthManagement', component: WealthManagement },
  { path: '/news', name: 'News', component: News },
  { path: '/join', name: 'Join', component: Join },
  { path: '/funds', name: 'Funds', component: Funds },
  { path: '/contact', name: 'Contact', component: Contact },
  { path: '/news/:id', name: 'NewsDetail', component: NewsDetail },
  { path: '/asset-management', name: 'AssetManagement', component: AssetManagement },
  { path: '/family-office', name: 'FamilyOffice', component: FamilyOffice },
  
  // Admin routes
  { path: '/admin/login', name: 'AdminLogin', component: AdminLogin },
  { path: '/admin', redirect: '/admin/dashboard' },
  { 
    path: '/admin/dashboard/:tab?', 
    name: 'AdminDashboard', 
    component: AdminDashboard,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    }
    return { top: 0 }
  }
})

// Navigation Guard for Admin
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('yino_admin_token')

  if (to.path === '/admin/login' && token) {
    next('/admin/dashboard')
  } else if (to.meta.requiresAuth) {
    if (token) {
      next()
    } else {
      next('/admin/login')
    }
  } else {
    next()
  }
})

export default router