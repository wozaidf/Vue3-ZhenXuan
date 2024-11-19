<template>
    <div>
        <el-card class="box-card">
            <template #header>
                <el-button type="primary" icon="plus" @click="addTrademarkButton">添加品牌</el-button>
            </template>
            <el-table :data="trademarkARR" style="width: 100%" border>
                <!-- el-table-column：默认展示数据是用div，可以使用template作用域插槽自定义html结构 -->
                <el-table-column label="序号" align="center" width="80" type="index">
                </el-table-column>
                <el-table-column label="品牌" prop="tmName">
                </el-table-column>
                <el-table-column label="logo">
                    <template #default="{ row }">
                        <img :src="row.logoUrl" alt="" style="width: 50px;height: 50px;">
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template #default="{ row }">
                        <el-button type="primary" size="small" icon="Edit"
                            @click="updateTrademarkButton(row)">修改</el-button>
                        <el-button type="danger" size="small" icon="Delete"
                            @click="deleteTrademarkButton(row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <template #footer>
                <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize"
                    :page-sizes="[5, 10, 20, 30]" layout="  prev, pager, next, jumper, ->,total,sizes" :total="total"
                    @size-change="handleSizeChange" @current-change="getHasTrademark" />
                <!-- 这边current-change可以使用第一次挂载的回调，因为这个方法自带当前页码返回到方法中 -->
            </template>
        </el-card>
        <!-- 对话框组件：在添加品牌与修改已有数据业务的时候使用的结构 -->
        <el-dialog v-model="addUpdateFormVisible" :title="`${addUpdateTitle}数据`">
            <el-form :model="trademarkForm" style="width: 80%;" :rules="rules" ref="formRef">
                <el-form-item label="品牌名称" label-width="80px" prop="tmName">
                    <el-input v-model="trademarkForm.tmName" placeholder="请输入名称"></el-input>
                </el-form-item>
                <el-form-item label="logo图片" label-width="80px" prop="logoUrl">
                    <el-upload action="api/admin/product/fileUpload" class="avatar-uploader"
                        :before-upload="beforeLogoUpload" :show-file-list="false" :on-success="successLogoUpload">
                        <img v-if="trademarkForm.logoUrl" :src="trademarkForm.logoUrl" class="avatar" />
                        <el-icon v-else class="avatar-uploader-icon">
                            <Plus />
                        </el-icon>
                    </el-upload>
                </el-form-item>
            </el-form>
            <template #footer>
                <span>
                    <el-button @click="cancelDialog">取消</el-button>
                    <el-button type="primary" @click="decidedUpload">确定</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup name="">
import { computed, onMounted, reactive, ref, nextTick } from 'vue'
import type { TrademarkResponse, Records, Trademark, AddUpdateRemoveTrademarkResponse } from "@/api/product/trademark/type"; // 接口ts类型
import { reqHasTrademark, reqAddUpdateTrademark, reqRemoveTrademark } from "@/api/product/trademark/trademark"; // 接口
import { ElMessage, ElNotification, type UploadRawFile } from 'element-plus';
onMounted(() => {
    getHasTrademark()
})

// 分页器中的数据及其方法
// 当前页码
let currentPage = ref<number>(1)
// 每一页多少数据
let pageSize = ref(5)
// 总数据
let total = ref<number>(0)
// 存储品牌列表数据
let trademarkARR = ref<Records>()
// 获取品牌列表的接口
async function getHasTrademark(page: number = 1) {
    currentPage.value = page
    let res: TrademarkResponse = await reqHasTrademark(currentPage.value, pageSize.value);
    if (res.code === 200) {
        total.value = res.data.total
        trademarkARR.value = res.data.records
    } else {
        ElNotification({
            type: "error",
            message: res.message
        })
    }
}
// pagesize切换回调
function handleSizeChange() {
    // 原本要对页码赋的值放在了接口方法那
    getHasTrademark()
}



// 添加和修改的共享数据
let trademarkForm = reactive<Trademark>({
    tmName: "",
    logoUrl: ""
}) // 类型推导：Ref<Trademark | undefined>
let addUpdateFormVisible = ref<boolean>(false)  // dialog开关
let addUpdateTitle = computed((): string => {  // 谈话框title
    return !trademarkForm.id ? "新增" : "修改"
})



// 添加品牌的功能的数据和方法
function addTrademarkButton() {
    // 数据清空
    trademarkForm.tmName = ""
    trademarkForm.logoUrl = ""
    trademarkForm.id = undefined
    addUpdateFormVisible.value = true
    nextTick(() => {
        console.log(formRef.value);
        formRef.value.clearValidate()           // 表单验证还在的时候新增清除验证，如果不清理在下次新增的时候会显示红色验证
    })
}
// 处理上传之前的logo图片处理
const beforeLogoUpload = (newFile: UploadRawFile) => {
    if (newFile.type == "image/jpeg" || newFile.type == "image/png" || newFile.type == "image/gif") {
        if (newFile.size / 1024 / 1024 < 4) { // 上传的文件大小 < 4M
            return true
        } else {
            ElMessage({
                type: "error",
                message: "上传的文件必须小于4M"
            })
            return false
        }
    } else {
        ElMessage({
            type: "error",
            message: "上传的文件必须是jpeg、png、gif"
        })
        return false
    }
}
// logo图片上传成功的回调，response为当前图片上传之后服务器返回的数据
async function successLogoUpload(response: any) {
    trademarkForm.logoUrl = response.data
    formRef.value.clearValidate("logoUrl")   // 图片上传成功后清除验证

}
// 对话框取消关闭
async function cancelDialog() {
    addUpdateFormVisible.value = false

}
// 对话框确定
async function decidedUpload() {
    await formRef.value.validate()   // 提交前进行全部的表单校验(只有校验通过再执行后面的代码)
    let res: AddUpdateRemoveTrademarkResponse = await reqAddUpdateTrademark(trademarkForm)
    if (res.code == 200) {
        ElMessage({
            type: "success",
            message: `${addUpdateTitle.value}${res.message}`
        })
        getHasTrademark(trademarkForm.id ? currentPage.value : 1) // 刷新列表
        addUpdateFormVisible.value = false // 关闭对话框
    } else {
        ElMessage({
            type: "error",
            message: `${addUpdateTitle.value}${res.message}`
        })
    }
}



// 修改品牌的功能的数据和方法
// 修改品牌按钮的回调
function updateTrademarkButton(row: Trademark) {
    // 挂载要修改的数据
    Object.assign(trademarkForm, row)
    addUpdateFormVisible.value = true
    // 清除表单验证的信息(要在dom二次挂载更新之后清除) (必须在dom)
    nextTick(() => {
        console.log(formRef.value);
        formRef.value.clearValidate()
    })
}


// 删除品牌的功能的数据和方法
async function deleteTrademarkButton(id: number) {
    console.log(id);
    let res = await reqRemoveTrademark(id)
    console.log(res);
}



// 表单验证的数据和方法
let formRef = ref() // 获取el-form的表单实例（vc）
const validateTmName = (rule: any, value: any, callback: any) => {
    // trim() 字符串去掉空格
    if (value.trim().length >= 2) {
        callback()
    } else {
        callback(new Error("品牌名称必须大于等于2"))
    }
}
const validateLogoUrl = (rule: any, value: any, callback: any) => {
    console.log(value);
    if (value) {
        callback()
    } else {
        callback(new Error("品牌logo不能为空"))
    }
}

// 表单验证的rules
let rules = reactive({
    tmName: [
        { required: true, trigger: 'blur', validator: validateTmName },
    ],
    logoUrl: [
        { required: true, validator: validateLogoUrl }
    ]
})

</script>

<style scoped lang="scss">
.box-card {
    width: 100%;
    height: 100%;
    overflow: auto;

    .el-table {
        width: 100%;
        height: 100%;
    }
}


.avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>

<style>
/* upload的logo图片的样式 */
.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}
</style>