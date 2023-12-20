// 用于渲染form表单 表单渲染时并不提供初始值 由后续每一项赋值
// 表单的渲染和表单每一项的值分开写
// 
export default {
    // 这里面可以分块渲染
    title: {
        name: "名称",
        form: {
            type: "textarea",
            placeholder: "哈哈哈哈",
            maxlength: 5,
            blur: true
        },
        tips: "这里是名称",
    },
    condition: {
        name: "条件",
        form: {
            type: "radio",
            options: {
                gift: "礼物",
                chat: "弹幕",
                like: "点赞",
                welcome: "欢迎"
            }
        },
    },
    gift: {
        name: "礼物",
        form: {
            type: "select",
            options: {
                "flower": "小花花",
                "heart": "小心心"
            },
            bind: { tag: "condition", value: "gift" }
        },
    },
    chat: {
        name: "聊天",
        form: {
            type: "text",
            bind: { tag: "condition", value: "chat" },
            blur: false,
        },
    },
    date: {
        name: "日期",
        form: {
            type: "date",
            subtype: "date"
        },
    }

}

// 表单每一项的真实数据
const item = {
    title: "自动后退",
    condition: "gift",
    gift: "none",
    chat: "",
    // xxx 还有很多
}

// 实际的数据应该是 (mock data)
// 因为同一时间最多选中一项 所以可以这么写
// 不然就是每一项item都必须有一个单独的id 同一组内的id不能重复
const totalDatas = {
    '永杰无间': {
        id: "1",
        datas: {
            idx: 0, // 选中datas中的第一项
            data: [item, item, item], // 对每一项进行增删改查
        },
    },
    "王者荣耀": {
        id: "2",
        datas: {
            idx: 1, // 选中datas中的第二项
            data: [item, item, item]
        },
    },
    "和平精英": {
        id: "3",
        datas: {
            idx: -1, // 未选中
            data: [item, item, item]
        },
    },
}