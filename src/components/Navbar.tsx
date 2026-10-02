import { Plus } from "lucide-react"

const Navbar = () => {
  return (
    <nav className="w-full bg-[#FBF9F6]">
      <div className="mx-auto max-w-7xl md:h-18 px-4 py-2 flex items-center justify-between">
        <h1 className="font-bold font-bricolage text-2xl">BARR</h1>
        <div className="flex items-center gap-4">
          <button className="bg-[#5B7065] text-[#DCF3E5] w-25 text-xs p-2 rounded-xl flex flex-row justify-center items-center"> <Plus className="mr-1 font-bold" size={13} /> Post Item</button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar