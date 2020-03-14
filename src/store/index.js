import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: sessionStorage.getItem('state') ? JSON.parse(sessionStorage.getItem('state')):{
    isLogin:false,
    user:'',
    admin:{
      amdinId:'',
      isLogin:false
    }
  },
  mutations: {
    isLogin(state,check){
      state.isLogin = check
    },
    setUserInfo(state,user){
      state.user = user;
    },
    setAdmin(state,admin){
      state.admin = admin
    }
  },
  actions: {},
  modules: {}
});
