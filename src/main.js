// import Vue from 'vue'
// import App from './App.vue'


// import { library } from '@fortawesome/fontawesome-svg-core'
// import { faPlus, faUser, faPenToSquare, faTrash, faXmark, faCheck } from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// import router from './Router/Route'


// Vue.config.productionTip = false
// library.add(faPlus, faUser, faPenToSquare, faTrash, faXmark, faCheck)
// Vue.component('font-awesome-icon', FontAwesomeIcon)



// new Vue({
//   router: router,
//   render: h => h(App),
// }).$mount('#app')


import Vue from 'vue';
import App from './App.vue';

// Import FontAwesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus, faUser, faPenToSquare, faTrash, faXmark, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// Import Vue Router
import router from './Router/Route';

// Add FontAwesome icons
library.add(faPlus, faUser, faPenToSquare, faTrash, faXmark, faCheck);

// Register FontAwesome globally
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

// Create Vue instance
new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
