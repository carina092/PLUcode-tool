import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHeart, faQuestionCircle, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify'; // path to vuetify export

library.add(faHeart, faQuestionCircle, faTimes);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app');
