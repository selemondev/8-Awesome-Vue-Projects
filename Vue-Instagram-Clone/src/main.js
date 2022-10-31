import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import timeago from 'vue-timeago3';
import { createPinia } from 'pinia';
import Toast, { POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";
import "./style.css";
const app = createApp(App);
app.use(createPinia())
app.use(timeago)
app.use(router)
app.use(Toast, {
    position: POSITION.TOP_CENTER
});
app.mount('#app')