import Vue from 'vue'
import App from './App.vue'

import store from './store'
import router from './router'
import vuetify from './plugins/vuetify'
import Vuelidate from 'vuelidate'

Vue.use(Vuelidate)


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  vuetify,
  store
}).$mount('#app')
