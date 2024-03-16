<template>
    <div id="dev">
        <DynamicForm v-model="configsValue" :configs="configs"></DynamicForm>
    </div>
</template>

<script lang='ts' setup>
import { watch } from "vue";
import DynamicForm from "../form.vue";
import { configs, configsValue } from "./configs";


watch(configsValue, (v) => {
    console.log("data ===>", v);
}, { deep: true })
</script>

<style lang='scss' scoped>
.dev {
    width: 100vw;
    height: 100vh;
}
</style>./configs