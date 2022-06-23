import { createApp } from "vue";
import router from "./router";
import store from "./store";
import App from "./App.vue";

import {saveStoreToLocal} from "./store";
import {registerIcon} from "./plugins/element-ui";
import './assets/css/reset.css'

const app = createApp(App);
registerIcon(app)
app.use(store);
saveStoreToLocal()
app.use(router);

app.mount("#app");





