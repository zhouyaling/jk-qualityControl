import Vue from 'vue'
import Router from 'vue-router'
import home from '@/page/home'
import subdirectory from '@/page/subdirectory'
import caseappreciation from '@/page/caseappreciation'
import catalogue from '@/page/catalogue'
import seach from '@/page/seach'
import pictureview from '@/page/pictureview'
import details from '@/page/details'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    }, {
      path: '/subdirectory',
      name: 'subdirectory',
      component: subdirectory
    }, {
      path: '/caseappreciation',
      name: 'caseappreciation',
      component: caseappreciation
    }, {
      path: '/catalogue',
      name: 'catalogue',
      component: catalogue
    }, {
      path: '/seach',
      name: 'seach',
      component: seach
    }, {
      path: '/pictureview',
      name: 'pictureview',
      component: pictureview
    }, {
      path: '/details',
      name: 'details',
      component: details
    },
  ]
})
