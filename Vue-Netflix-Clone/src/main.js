import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue';
import router from './router';
import Toast, { POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";
import "./assets/css/index.css";
const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(Toast, {
    position: POSITION.TOP_CENTER
});
app.mount('#app')
