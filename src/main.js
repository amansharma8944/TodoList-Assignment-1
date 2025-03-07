
import Vue from 'vue';
import App from './App.vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus, faUser, faPenToSquare, faTrash, faXmark, faCheck } from '@fortawesome/free-solid-svg-icons';


import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import router from './Router/Route';

import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
// import { auth } from './firebase/firebase';
library.add(faPlus, faUser, faPenToSquare, faTrash, faXmark, faCheck);

Vue.use(Vuetify);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify: new Vuetify(),
  render: h => h(App),
}).$mount('#app');


// let app=null;
// auth.onAuthStateChanged(() => {
//   if (!app) {
//     app = new Vue({
//       router,
//       vuetify: new Vuetify(),
//       render: (h) => h(App),
//     }).$mount("#app");
//   }
// });