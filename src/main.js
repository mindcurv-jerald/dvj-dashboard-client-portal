import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router';
import { Auth0Plugin } from "./auth";
import 'es6-promise/auto'
import store from './store/store'

const domain = process.env.VUE_APP_AUTH_DOMAIN;
const clientId = process.env.VUE_APP_AUTH_CLIENT_ID;
const audience = process.env.VUE_APP_AUDIENCE

Vue.config.productionTip = false

Vue.use(Auth0Plugin, {
  domain,
  clientId,
  audience,
  onRedirectCallback: appState => {
    router.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
    );
  }
});

new Vue({
  vuetify,
  router,
  store: store,
  render: h => h(App)
}).$mount('#app')

