<template>
    <div id="dev">
        <DynamicForm v-model="data" :configs="configs">
            <!-- 可以随意扩展 -->
            <template #customitems>
                <el-date-picker size="small" v-model="data.date2" type="date"></el-date-picker>
            </template>
        </DynamicForm>
    </div>
</template>

<script lang='ts' setup>
import { reactive, watch } from "vue";
import DynamicForm from "../form.vue";
// 用于生成表单的数据结构 提供数据验证和事件触发方式的选择
import configs from "./configs";

// data为当前表单中的每一项值 改变表单中的项则会赋值 (赋值流) 
// 只需要渲染一张表单 然后赋值data去变更表单的总值
// 通过双向绑定 每当表单项中的值发生改变 都会去改变data内部的值 (实时更新)
// 优点 更灵活 性能比之前要好非常多

const data = reactive({
    chat: "默认的聊天内容",
    date: Date.now(), // 如果赋值就是初始化 不赋值则为空
    date2: new Date(Date.now() + 359900000),
});

watch(data, () => {
    // 表单一旦更新就会被监听到
    console.log("data ===>", data);

}, { deep: true })
</script>

<style lang='scss' scoped>
.dev {
    width: 100vw;
    height: 100vh;
}
</style>./configs