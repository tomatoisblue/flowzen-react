interface TaskFields {
    labelText: string
    labelFor: string
    id: string
    name: string
    type: string
    isRequired: boolean
    placeholder?: string
}
const taskCreationFields: TaskFields[]=[
    {
        labelText:"タイトル",
        labelFor:"title",
        id:"title",
        name:"title",
        type:"text",
        isRequired:true,
        placeholder:"メールを送信"
    },
    {
        labelText:"ステータス",
        labelFor:"status",
        id:"status",
        name:"status",
        type:"text",
        isRequired:true,
    },
    {
        labelText:"詳細",
        labelFor:"description",
        id:"description",
        name:"description",
        type:"text",
        isRequired:false,
    },
    {
        labelText:"期限",
        labelFor:"expiration-date",
        id:"expiration-date",
        name:"expirationDate",
        type:"date",
        isRequired:false,
    },
    {
        labelText:"URL",
        labelFor:"url",
        id:"url",
        name:"url",
        type:"url",
        isRequired:false,
    },
]

export {taskCreationFields}