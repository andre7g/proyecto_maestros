import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "@/core/services/store";
import ApiService from "@/core/services/api.service";
//import MockService from "@/core/mock/mock.service";
import { VERIFY_AUTH, LOGOUT } from "@/core/services/store/auth.module";
import { RESET_LAYOUT_CONFIG } from "@/core/services/store/config.module";

Vue.config.productionTip = false;

// Global 3rd party plugins
import "popper.js";
import "tooltip.js";
import PerfectScrollbar from "perfect-scrollbar";
window.PerfectScrollbar = PerfectScrollbar;
import ClipboardJS from "clipboard";
window.ClipboardJS = ClipboardJS;

// Vue 3rd party plugins
import i18n from "@/core/plugins/vue-i18n";
import vuetify from "@/core/plugins/vuetify";
import "@/core/plugins/portal-vue";
import "@/core/plugins/bootstrap-vue";
import "@/core/plugins/perfect-scrollbar";
import "@/core/plugins/highlight-js";
import "@/core/plugins/inline-svg";
import "@/core/plugins/apexcharts";
import "@/core/plugins/treeselect";
import "@/core/plugins/metronic";
import "@mdi/font/css/materialdesignicons.css";
import "@/core/plugins/formvalidation";

import VueMask from "v-mask";
import jwtService from "./core/services/jwt.service";
//import VueCryptojs from "vue-cryptojs";

// API service init
ApiService.init();
Vue.use(VueMask);
//Vue.use(VueMask,VueCryptojs);
//[VueMask, VueCryptojs].forEach(x => Vue.use(x));

// Remove this to disable mock API
//MockService.init();

router.beforeEach((to, from, next) => {
  const { authorize } = to.meta;
  let authorized = String(to.meta.authorize);

  let authorizeRoles = new Array();
  authorizeRoles = authorized.split(",");
  // Ensure we checked auth before each page load.
  Promise.all([store.dispatch(VERIFY_AUTH)]).then(() => {
    let roles = jwtService.getRoles();
    if (authorize) {
      if (roles) {
        if (!authorizeRoles.some((i) => roles.includes(i))) {
          return next({ path: "/unauthorized" });
        }
      } else {
        store.dispatch(LOGOUT);
        return next({ path: "/login" });
      }
    }
    if (to.path === "/login") {
      if(roles){
        if (roles.includes(1)) {
          return next({ name: "dashboard" });
        }
      }
      next();
    }
    next();
  });

  // reset config to initial state
  store.dispatch(RESET_LAYOUT_CONFIG);

  // Scroll page to top on every route change
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 100);
});

new Vue({
  router,
  store,
  i18n,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");