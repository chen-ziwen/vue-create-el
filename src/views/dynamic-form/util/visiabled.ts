import { computed } from "vue";
/**
 * 
 * @param config 某一项配置项的详细信息
 * @param configsValue 所有配置项的值
 * @returns visiabled 布尔值 此配置项是否展示
 */
export function useConfigVisiabled(config: any, configsValue: any) {

    const visiabled = computed(() => {
        if (!config.form.bind) {
            return true;
        }

        let binds = config.form.bind;
        if (!Array.isArray(binds)) {
            binds = [binds];
        }

        let or = false;

        for (let i = 0; i < binds.length; i++) {
            const bind = binds[i];
            let tags = configsValue[bind.tag];

            if (!or) {
                or = bind.or || false;
            }

            if (typeof tags == "undefined") {
                if (!bind.or) return false;
                else continue;
            }

            if (typeof bind.value !== "object") {
                if (typeof tags !== "object") {
                    if (bind.value !== tags) {
                        if (!bind.or) return false;
                        else continue;
                    } else {
                        if (bind.or) return true;
                    }
                } else if (Array.isArray(tags)) {
                    // tags中的只要有一项匹配就展示 否则隐藏
                    if (!tags.includes(bind.value)) {
                        if (!bind.or) return false;
                        else continue;
                    } else {
                        if (bind.or) return true;
                    }
                }
            } else if (Array.isArray(bind.value)) {
                if (typeof tags !== "object") {
                    if (!bind.value.includes(tags)) {
                        if (!bind.or) return false;
                        else continue;
                    } else {
                        if (bind.or) return true;
                    }
                } else if (Array.isArray(tags)) {
                    let f = false;
                    for (let j = tags.length - 1; j >= 0; j--) {
                        let s = tags[j];
                        if (bind.value.includes(s)) {
                            f = true;
                            break;
                        }
                    }

                    if (!f) {
                        if (!bind.or) return false;
                        else continue;
                    } else {
                        if (bind.or) return true;
                    }
                }
            } else {
                console.error(`bind setting invalid`);
                if (!bind.or) {
                    return false;
                } else {
                    continue;
                }
            }
        }

        return !or;

    })

    return {
        visiabled,
    }
}