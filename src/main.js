import Vue from 'vue'
import App from './App'
import request from './utils/requestMethod'
import store from "./store/index";
import login from "./utils/login";
import project from "./utils/project";
import 'mpvue-weui/src/style/weui.css';

Vue.prototype.$store = store
Vue.prototype.$login = login
Vue.prototype.$http = request
Vue.prototype.$project= project
Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
