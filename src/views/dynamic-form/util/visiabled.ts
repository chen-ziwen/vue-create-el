import { computed, isRef } from "vue";

// 咩播中传入三个参 props为某一项和一些基本数据 包括项名称 总名称
// conf 为表单的所有项
// configRoot 包括了一些 例如vip等信息 是软件的整体配置项
// console.log("props ==>", props);
// console.log("conf ==>", conf);
// console.log("configRoot ==>", configRoot);
export function useConfigVisiabled(config: any, value: any) {

    const visiabled = computed(() => {
        if (!config.bind) {
            return true;
        }

        let binds = config.bind;
        if (!Array.isArray(binds)) {
            binds = [binds];
        }

        for (let i = 0; i < binds.length; i++) {

        }

        let or = false;

        return !or;

    })

    return {
        visiabled,
    }
}