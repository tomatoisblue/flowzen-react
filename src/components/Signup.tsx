import { useState } from "react";
import { signupFields } from "../constants/formField";
import Input from "./Input";
import FormAction from "./FormAction";

type Fields ={ [key: string]: string }

const fields = signupFields;
let fieldsState: Fields = {};
fields.forEach(field => fieldsState[field.id]="");

const Signup: React.FC = () => {
  // const [signupState, setLoginState] = useState<Fields>(fieldsState)
  const [signupState, setSignupState] = useState<Fields>(fieldsState)

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSignupState({...signupState, [e.target.id]:e.target.value})

  }

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    registerUser();
  }

  const registerUser = () => {

  }

  return (
    <form className="mt-8 space-y-6">
      {/* <div className="-space-y-px"> */}
      {/* i don't know why it does not work with the className above */}
      <div className="">
        {
          fields.map(field =>
            <Input
              key={field.id}
              handleChange={handleChange}
              value={signupState[field.id]}
              labelText={field.labelText}
              labelFor={field.labelFor}
              id={field.id}
              name={field.name}
              type={field.type}
              isRequired={field.isRequired}
              placeholder={field.placeholder}
            />
          )
        }
      </div>

      <FormAction handleSubmit={handleSubmit} text="アカウント作成" />
    </form>
  )
}

export default Signup;