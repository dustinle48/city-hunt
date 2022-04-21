import { createRouter, createWebHistory } from '@ionic/vue-router';

import LoginPage from '../views/LoginPage.vue'
import TabsPage from '../views/TabsPage.vue'
import HomePage from '../views/HomePage.vue'
import SearchPage from '../views/SearchPage.vue'
import AboutPage from '../views/AboutPage.vue'
import TreasurePage from '../views/TreasurePage.vue'
import AdminPage from '../views/AdminPage.vue'

const routes = [
  {
    path: '/',
    component: LoginPage
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/tabs/home'
      },
      {
        path: 'home',
        component: HomePage
      },
      {
        path: 'search',
        component: SearchPage
      },
      {
        path: 'about',
        component: AboutPage
      }
    ]
  },
  {
    path: '/treasure/:id',
    component: TreasurePage,
  },
  {
    path: '/admin',
    component: AdminPage,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
