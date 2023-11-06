const fixedInputClass="rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"

interface InputProps {
  handleChange: any
  value: any
  labelText: string
  labelFor: string
  id: string
  name: string
  type: string
  isRequired: boolean
  placeholder: any
  customClass?: string
}

const Input: React.FC<InputProps> = (props: InputProps) => {

  return (
    <div className="my-5">
      <label htmlFor={props.labelFor} className="sr-only">
        {props.labelText}
      </label>
      <input
        onChange={props.handleChange}
        value={props.value}
        id={props.id}
        name={props.name}
        type={props.type}
        required={props.isRequired}
        className={fixedInputClass+props.customClass}
        placeholder={props.placeholder}
      />
    </div>
  )

}

export default Input;