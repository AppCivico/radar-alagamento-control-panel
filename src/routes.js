import DashView from './components/Dash.vue'
import LoginView from './components/Login.vue'
import NotFoundView from './components/404.vue'

// Import Views - Dash
import Alerts from './components/views/Alerts.vue'
import NotificationsSent from './components/views/NotificationsSent.vue'

// Routes
const routes = [
  {
    path: '/login',
    component: LoginView
  },
  {
    path: '/',
    component: DashView,
    meta: {description: '', requiresAuth: true},
    children: [
      {
        path: '',
        component: Alerts,
        name: 'Alertas'
      },
      {
        path: 'notifications-sent',
        component: NotificationsSent,
        name: 'Notificações enviadas'
      }
    ]
  }, {
    // not found handler
    path: '*',
    component: NotFoundView
  }
]

export default routes
