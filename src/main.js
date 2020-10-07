import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueApexCharts from 'vue-apexcharts'
import VueSessionStorage from 'vue-sessionstorage'

Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.use(VueApexCharts)
Vue.use(VueSessionStorage)

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
