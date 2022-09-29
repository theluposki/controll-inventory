import { store } from "./js/store.js"
import { routes } from "./js/router.js"


import { Headers } from "./js/components/Headers.js"
import { Navigation } from "./js/components/Navigation.js"


const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes,
});

const app = Vue.createApp({
  components: {
    Headers,
    Navigation
  },
  data(){
    return {
      title: "MyApp Vue =D"
    }
  }
});

app.use(store);

app.use(router);

app.mount("#app");
