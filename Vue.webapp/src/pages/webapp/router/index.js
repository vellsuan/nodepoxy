import Vue from 'vue'
import Router from 'vue-router'
/*import Temporary from '@/pages/webapp/views/temporary/index'*/
import SignVerify from '@/pages/webapp/views/rignVerify/index'
import VerifyReturn from '@/pages/webapp/views/verifyReturn/index'

const Register= () => import('@/pages/webapp/views/register/Index');
const Index= () => import('@/pages/webapp/views/myReport/Index');
const DetailsReport= () => import('@/pages/webapp/views/detailsReport/Index');
const ProjectList= () => import('@/pages/webapp/views/projectList/TextList');
const projectDetail= () => import('@/pages/webapp/views/projectDetail/Medecal');
const myViedo= () => import('@/pages/webapp/views/myVideo/index');
const SummaryReport= () => import('@/pages/webapp/views/summaryReport/index');
const Accessory= () => import('@/pages/webapp/views/accessory/index');
const Email= () => import('@/pages/webapp/views/email/index');

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

