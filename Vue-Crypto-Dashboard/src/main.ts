import { createApp } from 'vue'
import "./assets/css/style.css";
import App from './App.vue'
import router from "./router";
import VueSmoothScroll from 'vue3-smooth-scroll';
import VueApexCharts from "vue3-apexcharts";
const app = createApp(App)
app.use(router)
app.use(VueSmoothScroll)
app.use(VueApexCharts);
app.mount('#app')
