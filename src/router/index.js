import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Echarts from '@/components/Echarts'
import EvdyDialogue from '@/components/EvdyDialogue'
import CaptchaExample from '@/components/captcha-example.vue'
import login from '@/components/login'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/hello',
      name: 'hello',
      component: Echarts
    },
    {
      path: '/evdyDialogue',
      name: 'evdyDialogue',
      component: EvdyDialogue
    },
    {
      path: '/googlet',
      name: 'CaptchaExample',
      component: CaptchaExample
    },
    {
      //登录
      path: '/login',
      component: login,
      meta: {
        isLogin: false
      }
    }
/*    ,
    {
      //注册
      path: '/register',
      component: register,
      meta: {
        isLogin: false
      }
    }*/,
    {
      //首页
      path: '/home',
      component: HelloWorld,
      meta: {
        isLogin: true
      },
    }
  ]
})
