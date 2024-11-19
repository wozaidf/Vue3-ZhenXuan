import { createApp } from "vue";
import ElementPlus from "element-plus";
import App from "@/App.vue"
// 引入全局守卫
import "./permisstion"
const app = createApp(App);
import "element-plus/dist/index.css";
import { zhCn } from "element-plus/es/locales.mjs";
import 'virtual:svg-icons-register'
import  router from '@/router/index'
import pinia from "./store";
app.use(pinia)
app.use(router)


// // 将SvgIcon变为全局组件
// import SvgIcon from "@/components/SvgIcon/index.vue"
// app.component('SvgIcon',SvgIcon)

// 引入自定义插件对象：注册整个项目的全局组件
import GlobalComponent from "./components/index"
app.use(GlobalComponent)

// 引入模板的全局样式
import '@/styles/index.scss'

app.use(ElementPlus, {
 locale: zhCn,  // 将element-plus组件设置为中文
});


app.mount("#app");

