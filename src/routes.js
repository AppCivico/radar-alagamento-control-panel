import DashView from './components/Dash.vue'
import LoginView from './components/Login.vue'
import NotFoundView from './components/404.vue'

// Import Views - Dash
import Sensors from './components/views/Sensors.vue'
import Sensor from './components/views/Sensor.vue'
import NotificationsSent from './components/views/NotificationsSent.vue'
import AllNotificationsSent from './components/views/AllNotificationsSent.vue'

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
        component: Sensors,
        name: 'Sensores',
        meta: {description: 'Lista de sensores disponíveis'}
      },
      {
        path: 'sensor/:id',
        component: Sensor,
        name: 'Dados do sensor',
        meta: {description: 'Últimos dados enviados por esse sensor'}
      },
      {
        path: 'notifications-sent',
        component: NotificationsSent,
        name: 'Notificações enviadas por mim'
      },
      {
        path: 'all-notifications-sent',
        component: AllNotificationsSent,
        name: 'Notificações enviadas',
        meta: {description: 'Lista de todas as notificações enviadas'}
      }
    ]
  }, {
    // not found handler
    path: '*',
    component: NotFoundView
  }
]

export default routes
