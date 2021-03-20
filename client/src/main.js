import Vue from 'vue'
import App from './App.vue'
import './styles/main.css'
import './styles/variables.css'
import store from './store/index'

// Font awesome installation
import {library} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {faCheck, faPlus, faTrash, faChevronDown} from '@fortawesome/free-solid-svg-icons';
library.add(faPlus, faTrash, faCheck, faChevronDown)
Vue.component('fa-icon', FontAwesomeIcon);

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
