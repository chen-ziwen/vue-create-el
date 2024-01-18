<template>
    <div id="dev">
        <DynamicForm v-model="data" :configs="configs">
            <template #customitems>
                <el-date-picker size="small" v-model="data.date2" type="date"></el-date-picker>
            </template>
        </DynamicForm>
    </div>
</template>

<script lang='ts' setup>
import { reactive, watch } from "vue";
import DynamicForm from "../form.vue";
import configs from "./configs";

const data = reactive({
    title: "测试项目",
    condition: "chat",
    gift: "小心心",
    chat: "默认聊天内容",
    date: Date.now(),
    date2: new Date(Date.now() + 359900000),
});

watch(data, () => {
    console.log("data ===>", data);
}, { deep: true })
</script>

<style lang='scss' scoped>
.dev {
    width: 100vw;
    height: 100vh;
}
</style>./configs