import Vue from 'vue'
import App from './App.vue'
import router from './router'
import mint_ui from 'mint-ui'
import 'mint-ui/lib/style.css'
import axios from 'axios'
import VueJsonp from 'vue-jsonp'
import Vuex from 'vuex'


Vue.use(Vuex)
Vue.use(VueJsonp)
Vue.use(mint_ui)
Vue.prototype.$axios = axios
Vue.config.productionTip = false


import { Lazyload } from 'mint-ui';

Vue.use(Lazyload);
let store = new Vuex.Store({
  state: {
    title:'home',
    height:''
  },
  mutations: {
    setHeight:function (state,height) {
      this.state.height = height
    }
  }
})




new Vue({
  router,
  render: h => h(App),
  store,
}).$mount('#app')


let instance = null;
function render(props = {}) {
  const { container } = props;
  instance = new Vue({
    router,
    render: h => h(App),
    store,
  }).$mount('#app').$mount(container ? container.querySelector('#app') : '#app');
}


// if(window.__POWERED_BY_QIANKUN__){
//   __webpack_public_path__ =  window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
// }


// 独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

export async function bootstrap() {
  console.log('[vue] vue app bootstraped');
}
export async function mount(props) {
  console.log('[vue] props from main framework', props);
  render(props);
}
export async function unmount() {
  instance.$destroy();
  instance.$el.innerHTML = '';
  instance = null;
}
