interface UserFields {
    labelText: string
    labelFor: string
    id: string
    name: string
    type: string
    isRequired: boolean
    placeholder?: string
}
const loginFormFields: UserFields[]=[
    {
        labelText:"メールアドレス(*)",
        labelFor:"email",
        id:"email",
        name:"email",
        type:"email",
        isRequired:true,
        placeholder:"your_email@example.com"
    },
    {
        labelText:"パスワード(*)",
        labelFor:"password",
        id:"password",
        name:"password",
        type:"password",
        isRequired:true,
    },
]

const signupFormFields: UserFields[]=[
    {
        labelText:"ユーザーネーム(*)",
        labelFor:"username",
        id:"username",
        name:"username",
        type:"text",
        isRequired:true,
        placeholder:"your_username"
    },
    {
        labelText:"メールアドレス(*)",
        labelFor:"email",
        id:"email",
        name:"email",
        type:"email",
        isRequired:true,
        placeholder:"your_email@example.com"
    },
    {
        labelText:"パスワード(*)",
        labelFor:"password",
        id:"password",
        name:"password",
        type:"password",
        isRequired:true,
    },
    {
        labelText:"確認用パスワード(*)",
        labelFor:"confirm-password",
        id:"confirm-password",
        name:"confirmPassword",
        type:"password",
        isRequired:true,
    },
]
export {loginFormFields, signupFormFields}