<template>
  <div class="dynamic-form">
    <el-form v-if="$value" :model="$value">
      <DynamicFormItem v-for="(config, key) in configs" v-model="$value[key]" :key="key" :prop="key" :config="config"
        :size="size" />
      <el-form-item v-if="$slots.customitems">
        <!-- 支持自定义扩展 -->
        <slot name="customitems"></slot>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { computed, provide } from "vue";
import DynamicFormItem from "./dynamic-form-item/form-item.vue";
defineOptions({ name: "DynamicForm" });

interface DynamicFormProps {
  modelValue: Object; // 所有表单项的值
  configs: Object; // 用于动态渲染表单项 并且提供一些验证或是触发方式
  size?: string;
}

const props = withDefaults(defineProps<DynamicFormProps>(), {
  size: "small",
});
const emits = defineEmits(["update:modelValue"]);
provide("configs", props.configs);
provide("configValues", props.modelValue);


const $value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emits("update:modelValue", value);
  },
});
</script>

<style lang="scss" scoped></style>
