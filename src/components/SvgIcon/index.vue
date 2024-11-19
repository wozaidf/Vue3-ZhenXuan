<template>
    <!-- svg：图标外层容器节点，内部需要与use标签结合使用 -->
    <svg :style="{ width, height }">
        <!-- xlink:herf执行用哪一个图标，属性值必须#icon-图标名称 -->
        <use :xlink:href="`#icon-${name}`" :fill="color"></use>
    </svg>
</template>

<script lang="ts" setup name="index">

defineProps({
    // xlink:href属性前缀
    // prefix: {
    //     type: String,
    //     default: '#icon-',
    //     required: true
    // },
    // 提供使用图标的名字
    name: String,
    // 提供图片的颜色
    color: {
        type: String,
        default: '',
        required: true,
        // validator自定义验证，color的值不能为0
        validator: (value) => {
            return value != 0
        }
    },
    width: {
        type: String,
        default: "10px"
    },
    height: {
        type: String,
        default: "10px"
    }
})

</script>

<style></style>