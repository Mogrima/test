import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';

import store from './store'
import mixins from './mixins'
Vue.mixin(mixins)
Vue.config.productionTip = false

new Vue({
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
