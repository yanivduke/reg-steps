import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

import Login from "../pages/Login";
import Logout from "../pages/Logout";

import {AUTH_KEEPALIVE} from '../store/actions/auth'

Vue.use(Router)

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    console.log('inside router isNotAuthenticated')
    next()
    return
  }
  next('/')
}

const ifAuthenticated = (to, from, next) => {
  store.dispatch(AUTH_KEEPALIVE).then(() => {
    if (store.getters.isAuthenticated) {
      console.log('inside router: isAuthenticated')
      next()
      return
    }
    next('/')
    console.log('inside router isNotAuthenticated')
  }).catch((err) => {
    console.log('inside router err: ' + err)
    next('/')
  });
}



const isStepFocus2 = (to, from, next) => {
  if (store.getters.step<=2) {
    console.log('inside router: isStepFocus2')
    next()
    return
  }
  console.log('inside router isStepFocus2 not in focus')
  next('/')
  
}
const isStepFocus3 = (to, from, next) => {
  if (store.getters.step<=3) {
    console.log('inside router: isStepFocus3')
    next()
    return
  }
  console.log('inside router isStepFocus3 not in focus')
  next('/')
  
}
const isStepFocus4 = (to, from, next) => {
  if (store.getters.step<=4) {
    console.log('inside router: isStepFocus4')
    next()
    return
  }
  console.log('inside router isStepFocus4 not in focus')
  next('/')

}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: () => import("../pages/Main"),
      beforeEnter: ifNotAuthenticated
      
    },
    {
      path: '/step2',
      name: 'Step2',
      component: () => import("../pages/Step2"),
      beforeEnter: isStepFocus2
      
    },
    {
      path: '/step3',
      name: 'Step3',
      component: () => import("../pages/Step3"),
      beforeEnter: isStepFocus3
      
    },
    {
      path: '/step4',
      name: 'Step4',
      component: () => import("../pages/Step4"),
      beforeEnter: isStepFocus4
    },
    {
      path: '/pos',
      name: 'Pos',
      component: () => import("../pages/Pos"),
      beforeEnter: ifNotAuthenticated
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      beforeEnter: ifNotAuthenticated
    },
    {
      path: '/logout',
      name: 'logout',
      component: Logout,
      beforeEnter: ifAuthenticated
    }
  ]
})
