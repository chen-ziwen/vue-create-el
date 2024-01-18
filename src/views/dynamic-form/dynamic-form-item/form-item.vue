<template>
    <el-form-item v-show="visiabled">
        <template #label>
            <div class="config-title">
                <span>{{ config.name }}</span>
                <el-tooltip v-if="config.tips" effect="light">
                    <template #content>
                        <div v-html="useFiltersHtmlstrip(config.tips, {}, true)"></div>
                    </template>
                    <i class="iconfont icon-help"></i>
                </el-tooltip>
            </div>
        </template>
        <el-input size="small" v-if="form.type == 'text'" v-model="$bvalue" @blur="blur" :maxlength="form.maxlength"
            :minlength="form.minlength" :placeholder="form.placeholder">
            <template #prepend v-if="form.prepend">{{ form.prepend }}</template>
            <template #append v-if="form.append">{{ form.append }}</template>
        </el-input>
        <el-input size="small" v-else-if="form.type == 'textarea'" type="textarea"
            :autosize="{ minRows: form.min || 2, maxRows: form.max || 6 }" v-model="$bvalue" @blur="blur"></el-input>
        <el-select size="small" v-else-if="form.type == 'select'" v-model="$value" :filterable="form.filterable || false"
            :loading="loading">
            <el-option v-for="item in options" :label="item.label" :value="item.value">
                <span class="f-l">{{ item.label }}</span>
                <span v-if="item.icon" class="option-image flex-align-center f-r">
                    <img :src="item.icon" fit="scale-down" />
                </span>
            </el-option>
        </el-select>
        <el-switch size="small" v-else-if="form.type == 'switch'" v-model="$value"></el-switch>
        <el-input-number size="small" v-else-if="form.type == 'number'" :min="form.min" :max="form.max"
            :step="form.step || 1" v-model="$value"></el-input-number>
        <el-slider size="small" v-else-if="form.type == 'slider'" :min="form.min || 0" :max="form.max || 100"
            :step="form.step || 1" v-model="$value" :show-input="form.input || false"></el-slider>
        <el-checkbox-group size="small" v-else-if="form.type == 'checkbox'" v-model="$value" :min="form.min"
            :max="form.max">
            <el-checkbox v-for="option in options" :key="option.value" :label="option.value">{{ option.label
            }}</el-checkbox>
        </el-checkbox-group>
        <el-radio-group size="small" v-else-if="form.type == 'radio'" v-model="$value">
            <el-radio v-for="option in options" :key="option.value" :label="option.value">{{ option.label }}</el-radio>
        </el-radio-group>
        <el-radio-group size="small" v-else-if="form.type == 'radiobtn'" v-model="$value">
            <el-radio-button v-for="option in options" :key="option.value" :label="option.value">{{ option.label
            }}</el-radio-button>
        </el-radio-group>
        <el-color-picker size="small" v-else-if="form.type == 'color'" v-model="$value" @active-change="colorChange"
            :show-alpha="form.alpha || false"></el-color-picker>
        <el-date-picker size="small" v-else-if="form.type == 'date'" v-model="$value" :type="form.subtype || 'datetime'"
            :placeholder="form.placeholder"></el-date-picker>
        <!-- 我只引入这一部分组件 有需要的可以自己扩展  -->
    </el-form-item>
</template>

<script lang="ts" setup>
import { computed, ref, inject } from "vue";
import { useConfigOption } from "../util/auto-options";
import { useConfigVisiabled } from "../util/visiabled";
import { useFiltersHtmlstrip } from "../util/htmlstrip";

interface DynamicFormItemProps {
    modelValue: any; // 表单子项的值
    config: Record<string, any>;
    prop: string;
}

defineOptions({ name: "DynamicFormItem" });
const props = defineProps<DynamicFormItemProps>();
const emits = defineEmits(["update:modelValue"]);
const configs = inject("configs");
const configValues = inject("configValues") as Record<string, any>;

const $value = computed({
    get() {
        return props.modelValue;
    },
    set(value) {
        emits("update:modelValue", value);
    },
});

// 生成options值
const { options } = useConfigOption(props.config);
// 生成隐藏值
const { visiabled } = useConfigVisiabled(props.config, configValues);

const form = computed(() => props.config.form);
const loading = ref(false); // 先写着

function colorChange(color: string) {
    $value.value = color;
}

// 不能是 Map Set Function 类型
const parseJson = (value: any) => {
    if (typeof value === "object" && value !== null) {
        return JSON.stringify(JSON.parse(value));
    }
    return value;
};

const $bvalue = form.value.blur ? ref(parseJson($value.value)) : $value;
const blur = () => {
    if (form.value.blur) {
        $value.value = $bvalue.value;
    }
};
</script>

<style lang="scss" scoped>
.config-title {
    display: flex;
    align-items: center;
    justify-content: flex-end;
}
</style>
