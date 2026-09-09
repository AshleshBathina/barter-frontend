import { useState, useEffect} from "react";
import {Link, useNavigate} from "react-router"
import useDebouncedInput from "../hooks/useDebouncedInput"
import {LoaderCircle, CircleCheck, CircleAlert} from "lucide-react"
import Cookies from "js-cookie"
import axios from "axios"

const RegisterPage = () => {

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  })

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const {
    username,
    availability,
    usernameError,
    isLoading,
    handleUsername
  } = useDebouncedInput()

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null);
    setLoading(true);

    if(!availability){
      setLoading(false);
      setError("Username is not available");
      return;
    }

    const {firstName, lastName, email, password} = formData

    const url = `${import.meta.env.VITE_SERVER_URL}/auth/register`

    const formDataObj = {
      firstName, lastName, email, password, username
    }

    const response = await axios.post(url, formDataObj);

    try{
      const {jwtToken} = response.data;
      Cookies.set("jwtToken", jwtToken);
      navigate("/home");
    } catch (error) {
      const message = axios.isAxiosError(error) ? error.response?.data?.message : "Failed to create account";
      setError(message);
      setLoading(false);
    }
  }


  return (
    <div className="relative min-h-screen overflow-hidden flex justify-center items-center bg-violet-600">

      <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
        <p className="blur-lg text-violet-500 font-bold font-bricolage text-center md:text-[600px] scale-y-100 leading-none">BARR</p>
      </div>

      <div className="z-10 w-70 md:w-108 flex justify-center items-center bg-white rounded-2xl flex-col p-5 md:p-10">  
        <h1 className="text-xl md:text-2xl font-bold">Create an account</h1>
        <p className="text-xs md:text-sm text-gray-500 ">Already have an account? <Link className="underline" to="/login">Log in</Link></p>
        <form className="grid mt-5 md:mt-10 grid-cols-2 gap-2 md:gap-4" onSubmit={handleSubmit}>
          <div>
            <label className="text-gray-400 text-xs md:text-sm font-medium" htmlFor="firstName">First Name</label>
            <input className="p-2 w-full outline-none text-gray-900 placeholder:text-gray-300 text-xs md:text-sm font-medium border-gray-300 border bg-gray-200 rounded-md" value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} id="firstName" placeholder="First Name" type="text"/>
          </div>
          <div>
            <label className="text-gray-400 text-xs md:text-sm font-medium" htmlFor="lastName">Last Name</label>
            <input className="p-2 w-full text-gray-900 placeholder:text-gray-300 text-xs md:text-sm font-medium outline-none border-gray-300 border bg-gray-200 rounded-md" value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} id="lastName" placeholder="Last Name" type="text" />
          </div>
          <div className="col-span-2">
            <label className="text-gray-400 text-xs md:text-sm font-medium" htmlFor="username">Username</label>
            <div className="text-gray-900 flex items-center font-medium border-gray-300 border w-full bg-gray-200 rounded-md h-9 md:h-10">
              <input className="p-2 outline-none w-[90%] text-xs md:text-sm placeholder:text-gray-300" value={username} onChange={handleUsername} id="username" placeholder="Username" type="text" />
              <div className="flex justify-center p-2">
                
                {isLoading? <LoaderCircle className="text-gray-400 text-xs font-medium animate-spin"/> : availability === true ? <span className="text-green-500 text-xs font-medium"><CircleCheck/></span> : availability === false && username && <span className="text-red-500 text-xs font-medium"><CircleAlert/></span>}
              </div>
            </div>
            {usernameError && <p className="text-red-500 mt-1 text-[10px] md:text-sm font-medium w-full leading-none">*{usernameError}</p>}
          </div>
          <div className="col-span-2">
            <label className="text-gray-400 text-xs md:text-sm font-medium" htmlFor="email">Email</label>
            <input className="w-full p-2 outline-none border-gray-300 text-xs md:text-sm font-medium text-gray-900 placeholder:text-gray-300 border bg-gray-200 rounded-md" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} id="email" placeholder="Email" type="email" />
          </div>
          <div className="col-span-2">
            <label className="text-gray-400 text-xs md:text-sm font-medium" htmlFor="password">Password</label>
            <input className="w-full p-2 border-gray-300 text-xs md:text-sm font-medium outline-none border text-gray-900 placeholder:text-gray-300 bg-gray-200 rounded-md" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} id="password" placeholder="Password" type="password" />
          </div>

          <div className="col-span-2 mt-3 md:mt-5">
            <button className="font-medium w-full text-xs md:text-sm flex justify-center bg-violet-600 hover:bg-violet-500 border rounded-md outline-none mb-0 text-white p-2.5 md:p-3 cursor-pointer" type="submit">{loading? <LoaderCircle className="text-white animate-spin" /> : "Create account"}</button>
          {error && <p className="text-red-500 text-[10px] md:text-sm w-full mt-1 font-medium leading-none">*{error}</p>}
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegisterPage