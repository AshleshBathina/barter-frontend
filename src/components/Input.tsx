
interface InputProps {
  label: string;
  value: string;
  id: string;
  placeholder?: string;
  type?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({id, label, ...props}: InputProps) => {
  
  return (
    <>
      <label className="text-gray-400 text-xs md:text-sm font-medium" htmlFor={id}>{label}</label>
      <input className="w-full p-2 outline-none border-gray-300 text-xs md:text-sm font-medium text-gray-900 placeholder:text-gray-300 border bg-gray-200 rounded-md" id={id} {...props} />
    </>
  )
}

export default Input;