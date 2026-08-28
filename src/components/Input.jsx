

const Input = ({className, label, id, placeholder, }) => {
  
  return (
    <div>
      <label className="text-gray-400 text-sm font-medium" htmlFor="lastName">Last Name</label>
      <input className="p-3 w-full text-gray-900 placeholder:text-gray-400 text-sm font-medium outline-none border-gray-300 border bg-gray-200 rounded-md" id="lastName" placeholder="Last Name" type="text" />
    </div>
  )
}