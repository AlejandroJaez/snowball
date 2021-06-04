import Vue from "vue";
import Buefy from "buefy";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "buefy/dist/buefy.css";

Vue.use(Buefy);
Vue.config.productionTip = false;
Vue.prototype.$multiwatch = function (props, watcher) {
  var iterator = function (prop) {
    this.$watch(prop, watcher);
  };
  props.forEach(iterator, this);
};

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
