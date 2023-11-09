interface UserFields {
    labelText: string
    labelFor: string
    id: string
    name: string
    type: string
    autoComplete: string
    isRequired: boolean
    placeholder: string
}
const loginFields: UserFields[]=[
    {
        labelText:"メールアドレス",
        labelFor:"email-address",
        id:"email-address",
        name:"email",
        type:"email",
        autoComplete:"email",
        isRequired:true,
        placeholder:"メールアドレス"
    },
    {
        labelText:"パスワード",
        labelFor:"password",
        id:"password",
        name:"password",
        type:"password",
        autoComplete:"current-password",
        isRequired:true,
        placeholder:"パスワード"
    }
]

const signupFields: UserFields[] =[
    {
        labelText:"ユーザーネーム",
        labelFor:"username",
        id:"username",
        name:"username",
        type:"text",
        autoComplete:"username",
        isRequired:true,
        placeholder:"ユーザーネーム"
    },
    {
        labelText:"メールアドレス",
        labelFor:"email-address",
        id:"email-address",
        name:"email",
        type:"email",
        autoComplete:"email",
        isRequired:true,
        placeholder:"メールアドレス"
    },
    {
        labelText:"パスワード",
        labelFor:"password",
        id:"password",
        name:"password",
        type:"password",
        autoComplete:"current-password",
        isRequired:true,
        placeholder:"パスワード"
    },
    {
        labelText:"パスワード(確認)",
        labelFor:"confirm-password",
        id:"confirm-password",
        name:"confirm-password",
        type:"password",
        autoComplete:"confirm-password",
        isRequired:true,
        placeholder:"パスワード(確認)"
    }
]

export {loginFields,signupFields}