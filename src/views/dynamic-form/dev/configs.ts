
export default {
    title: {
        name: "名称",
        form: {
            type: "text",
            placeholder: "请输入名称",
            maxlength: 5,
            blur: true
        },
        tips: "这里是名称",
        value: "chiko"
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
        value: "chat"
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
        value: "flower"
    },
    chat: {
        name: "聊天",
        form: {
            type: "text",
            bind: { tag: "condition", value: "chat" },
            blur: false,
        },
        value: "hello"
    },
    date: {
        name: "日期",
        form: {
            type: "date",
            subtype: "date"
        },
        value: "2022-01-01"
    }
}
