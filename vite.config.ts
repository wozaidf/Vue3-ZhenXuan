import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import { viteMockServe } from "vite-plugin-mock";

import path from "path";
// https://vite.dev/config/
// command用于检测开发环境的
export default defineConfig(({ command, mode }) => {
  // 获取各种环境下的对应的变量(根据当前环境获取该环境对应的文件（.env开头）)
  let env = loadEnv(mode, process.cwd());

  return {
    plugins: [
      vue(),
      createSvgIconsPlugin({
        // iconDirs是将svg放入指定的文件夹下
        iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
        symbolId: "icon-[dir]-[name]",
      }),
      viteMockServe({
        // default
        mockPath: "mock",
        localEnabled: command === "serve", // 确保处于开发阶段可以使用mock
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src/"), // 相对路径别名配置，使用 @ 代替 src
      },
    },
    // scss全局变量的一个配置
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: '@use "./src/styles/variable.scss" as * ;',
        },
      },
    },
    // 代理跨域
    server: {
      proxy: {
        // 匹配品牌管理的api
        '/api/admin/product':{
          target: "http://39.98.123.211:8510",
          changeOrigin: true,
          rewrite:(path)=>path.replace(/^\/api/,'')
        },

        [env.VITE_APP_BASE_API]: {
          target: env.VITE_SERVE,
          changeOrigin: true,
          rewrite:(path)=>path.replace(/^\/api/,'')
        },

      },
    },
  };
});
