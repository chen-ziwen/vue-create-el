import { ref, watch } from "vue";

interface IOptions {
    [key: string]: any,
    label: string,
    value: any;
}
export function useConfigOption(config: any) {
    const whitelist = ['select', 'checkbox', 'radio', 'radiobtn'];
    if (!whitelist.includes(config.form.type)) {
        return {};
    };
    const options = ref<IOptions[]>([{ label: "正在读取数据...", value: "loading" }]);
    const opts = config.form.options;
    let loading = ref(false);
    if (opts) {
        let bOpts = [];
        for (let key in opts) {
            if (typeof opts[key] == "string") {
                bOpts.push({ label: opts[key], value: key });
            } else {
                bOpts.push({ label: key, ...opts[key] });
            }
        }
        options.value.splice(0, options.value.length, ...bOpts);
    } else
        // 这边处理 动态加载的options数据 
        if (config.form.query) {
            // 如果已经加载完毕 则直接请求 否则监听加载状态 一但状态为true 则开始请求
            if (config.loaded) {
                // fetch()
            } else {
                watch(() => config.loaded, (current: boolean) => {
                    if (current) {
                        // fetch();
                    }
                })
            }
        } else if (config.form.using) {
            loading.value = true;
        }


    // fetch方法
    return {
        options
    }
}
