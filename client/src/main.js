import Vue from 'vue'
import App from './App.vue'
import './styles/main.css'
import './styles/variables.css'

// Font awesome installation
import {library} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {faCheck, faPlus, faTrash} from '@fortawesome/free-solid-svg-icons';
library.add(faPlus, faTrash, faCheck)
Vue.component('fa-icon', FontAwesomeIcon);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
