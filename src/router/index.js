import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Booklist from '@/components/Booklist'
import Userlist from '@/components/Userlist'
import Recordlist from '@/components/Recordlist'

Vue.use(Router);

const auth = (to, from, next) => {
    let token = localStorage.getItem('token');
    if (!token) {
        next('/')
    } else {
        next()
    }
};

export default new Router({
  routes: [
      {
        path: '/',
        name: 'Index',
        component: Index,
      },
      {
          path:'/Booklist',
          name:'Booklist',
          component: Booklist,
          beforeEnter:auth
      },
      {
          path:'/Userlist',
          name:'Userlist',
          component: Userlist,
          beforeEnter:auth
      },
      {
          path:'/Recordlist',
          name:'Recordlist',
          component: Recordlist,
          beforeEnter:auth
      }
  ]
})
