<template>
    <div class="login_container">
        <el-row>
            <el-col :span="12" :xs="0">
            </el-col>
            <el-col :span="12" :xs="24">
                <el-form class="login-form" :model="loginForm" :rules="rules" ref="loginForms">
                    <h1>hello</h1>
                    <h2>欢迎来到整蛊甄选</h2>
                    <el-form-item prop="username">
                        <el-input v-model="loginForm.username" :prefix-icon="User" placeholder="请输入账号"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input v-model="loginForm.password" :prefix-icon="Lock" placeholder="请输入密码"
                            show-password></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button :loading-icon="Eleme" :loading="isLoading" @click="login" class="login_button"
                            type="primary">
                            登录
                        </el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts" setup name="login">
import { User, Lock, Eleme } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue';
import type { loginForm } from '@/api/user/type'
import useUserStore from '@/store/modules/user';
import { useRouter, useRoute } from 'vue-router';
import { ElNotification } from 'element-plus';
import { getTime } from "@/utils/time"
// 通过ref标签获取el-form组件
let loginForms = ref()
// 获取路由器
let $router = useRouter()
let $route = useRoute()
// 取出useUserStore中的返回对象
let userStore = useUserStore()
// 定义变量控制按钮加载效果
let isLoading = ref(false)

// 登录信息的数据
// 收集账号和密码的表单数据
let loginForm: loginForm = reactive({
    username: 'admin',
    password: '111111'
})
// 登录按钮的回调
const login = async () => {
    // 保证所有校验通过后发请求，validate方法是绑定在组件的实例对象上面的
    await loginForms.value.validate()
    // 小加载转起来
    isLoading.value = true
    // 可以用.then写（代替trycatch）
    try {
        // 保证成功再发请求
        // 通知pinia仓库调用登录方法
        await userStore.userLogin(loginForm)
        // 路由跳转的时候判断路劲中是否有query参数，有的话就跳入query参数路由，没有就跳转首页
        let redirect: any = $route.query.redirect
        $router.push({
            path: redirect || "/"
        })
        ElNotification({
            type: 'success',
            message: "登录成功",
            title: `Hi,${getTime()}好`
        })
        isLoading.value = false
    } catch (error) {
        isLoading.value = false
        ElNotification({
            type: 'error',
            message: (error as Error).message // 断言error是Error类型
        })
    }

}
// 表单验证规范

// 表单校验
// 自定义账号校验规则函数
const validateUerName = (rule: any, value: any, callback: any) => {
    // rule为校验规则对象
    // value为表单元素文本内容
    // 函数：如果符合条件就callback放行通过，如果不符合callback就返回错误信息
    if (value.length > 3 && value.length < 10) {
        // /^\d{5,10}$/正则来测试文本内容
        callback()
    } else {
        callback(new Error("账号长度至少3位少于10位"))
    }
}

// 自定义密码校验规则函数
const validatePassWord = (rule: any, value: any, callback: any) => {
    if (value.length > 3) {
        callback()
    } else {
        callback(new Error("密码至少6位"))
    }

}
let rules = reactive({
    username: [
        // 一个规则就是一个对象，trigger是触发时机（blur失去焦点，change文本改变的时候）
        // required表示该规则是否必要，message表示错误时候提示
        // validator设置自定义校验规则

        // { required: true, message: '请输入账号', trigger: 'blur' },
        // { required: true, min: 3, max: 10, message: '账号长度至少6位小于10位', trigger: 'blur' },
        // 自定义校验规则
        { trigger: 'change', validator: validateUerName }
    ],
    password: [
        // { required: true, message: '请输入密码', trigger: 'change' }
        { trigger: 'change', validator: validatePassWord }
        // validator

    ]
})

</script>

<style scoped lang="scss">
.login_container {
    width: 100%;
    height: 100vh;
    background: url('@/assets/images/background.jpg'); // no-repeat作用在于取消浏览器的默认行为（复制（平铺）图片来覆盖整个屏幕）
    background-size: cover; // 确保图像完全覆盖元素的背景区域，同时保持图像的宽高比不变
}

.login-form {
    position: relative;
    width: 80%;
    top: 30vh;
    background: url("@/assets/images/login_form.png") no-repeat;
    background-size: cover;
    padding: 40px;

    h1 {
        color: white;
        font-size: 40px;
    }

    h2 {
        font-size: 20px;
        color: white;
        margin: 20px 0;
    }
}

.login_button {
    width: 100%;
}
</style>