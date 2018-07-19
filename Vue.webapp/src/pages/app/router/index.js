import Vue from 'vue'
import Router from 'vue-router'
/*import Temporary from '@/pages/app/views/temporary/index'*/
import SignVerify from '@/pages/app/views/rignVerify/index'
import VerifyReturn from '@/pages/app/views/verifyReturn/index'

const Register= () => import('@/pages/app/views/register/Index');
const Index= () => import('@/pages/app/views/myReport/Index');
const DetailsReport= () => import('@/pages/app/views/detailsReport/Index');
const ProjectList= () => import('@/pages/app/views/projectList/TextList');
const projectDetail= () => import('@/pages/app/views/projectDetail/Medecal');
const myViedo= () => import('@/pages/app/views/myVideo/index');
const SummaryReport= () => import('@/pages/app/views/summaryReport/index');
const Accessory= () => import('@/pages/app/views/accessory/index');
const Email= () => import('@/pages/app/views/email/index');

Vue.use(Router);



export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/myVideo',
      name: 'myvideo',
      component: myViedo
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/summaryReport',
      name: 'summaryReport',
      component: SummaryReport
    },

    {
      path:'/detailsReport',
      name:'detailsreport',
      component:DetailsReport
    },
    {
      path:'/ProjectList',
      name:'ProjectList',
      component:ProjectList
    },
    {
      path:'/projectDetail',
      name:'projectDetail',
      component:projectDetail
    },
    {
      path: '/accessory',
      name: 'accessory',
      component: Accessory
    },
    {
      path: '/email',
      name: 'email',
      component: Email
    }
    ,
    {
      path: '/signVerify',
      name: 'SignVerify',
      component: SignVerify
    }
    ,
    {
      path: '/verifyReturn',
      name: 'VerifyReturn',
      component: VerifyReturn
    }
  ]
})

