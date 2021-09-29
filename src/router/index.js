import Vue from 'vue';
import VueRouter from 'vue-router';
import LandingPage from '@/components/LandingPage';
import LoginForm from '@/components/LoginForm'
import DashboardOverview from '@/components/powerbi/DashboardOverview'
import ViewDashboard from '@/components/powerbi/ViewDashboard'
import ViewReport from '@/components/powerbi/ViewReport'
import Users from '@/components/admin/Users'
import NotFound from '@/components/NotFound'
import Settings from '@/components/admin/Settings'
import Base from '@/components/Base'
import { authGuard } from '../auth/authGuard';
import {adminGuard} from "@/auth/adminGuard";
import Access from "@/components/admin/Access";

Vue.use(VueRouter)

export default new VueRouter({
    mode: 'history',
    routes: [
        { 
            path: '/', component: LandingPage, beforeEnter: authGuard, children: [
                { path: '', component: DashboardOverview },
                { path: 'gebruikers', component: Users, beforeEnter: adminGuard,  },
                { path: 'access', component: Access, beforeEnter: adminGuard,  },
                { path: 'instellingen', component: Settings, beforeEnter: adminGuard,  }
            ]
        },
        {
            path: '/', component: Base, beforeEnter: authGuard, children:[
                { path: "workspaces/:wid/dashboards/:did/", component: ViewDashboard, props: true },
                { path: "workspaces/:wid/reports/:rid/", component: ViewReport, props: true },
            ]
        },
        {
            path: '/Login', name: 'Login', component: LoginForm 
        },
        { 
            path: '*', name: '404', component: LandingPage, children:[
                { path: "*", component: NotFound },
            ]
        }

    ]
})
