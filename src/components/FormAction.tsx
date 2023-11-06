interface FormActionProps {
  handleSubmit: (e: React.SyntheticEvent) => void
  type?: string
  action?: "button" | "submit" | "reset"
  text: string
}

const FormAction: React.FC<FormActionProps> = (props: FormActionProps) => {
  const {type = "Button", action = "button"} = props;


  return (
    <>
    {
      type==="Button" ?
      <button
        type={action}
        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mt-10"
        onSubmit={props.handleSubmit}
      >
      {props.text}
      </button>
      :
      <></>
    }
    </>
  )
}

export default FormAction;