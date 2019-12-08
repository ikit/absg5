// import 'babel-polyfill';
import Vue from 'vue';
import vuetify from '@/plugins/vuetify';
import App from './App.vue';
import {router} from './router';
import store from './store';
import './registerServiceWorker';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import '@fortawesome/fontawesome-free/css/all.css';
import 'vue-orgchart/dist/style.min.css';

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app');
