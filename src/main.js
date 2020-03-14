import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios"
import store from "./store";
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import $ from "jquery"
import md5 from 'js-md5';

Vue.use(ViewUI);

Vue.config.productionTip = false;
//axios.defaults.headers.post['content-Type'] = 'application/json';
Vue.prototype.$axios = axios;
Vue.prototype.$md5 = md5;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
