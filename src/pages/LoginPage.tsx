import { useState, useEffect} from "react";
import {Link, useNavigate} from "react-router"
import useDebouncedInput from "../hooks/useDebouncedInput"
import {LoaderCircle, CircleCheck, CircleAlert} from "lucide-react"
import Cookies from "js-cookie"
import axios from "axios"

const LoginPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: ""
  })
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null);
    setLoading(true);


    const {username, password} = formData

    const url = `${import.meta.env.VITE_SERVER_URL}/auth/login`;

    const formDataObj = {
      id: username,
      password
    }

    try{
      const response = await axios.post(url, formDataObj);
      
      const {jwtToken} = response.data;
      Cookies.set("jwtToken", jwtToken);
      navigate("/home");
    } catch (error) {
      const message = axios.isAxiosError(error) ? error.response?.data?.message : "Failed to login";
      setError(message);
      setLoading(false);
      return;
    }
  }


  return (
    <div className="relative min-h-screen overflow-hidden flex justify-center items-center bg-violet-600">

      <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
        <p className="blur-lg text-violet-500 font-bold font-bricolage text-center md:text-[600px] scale-y-100 leading-none">BARR</p>
      </div>

      <div className="z-10 w-70 md:w-108 flex justify-center items-center bg-white rounded-2xl flex-col p-5 md:p-10">  
        <h1 className="text-xl md:text-2xl font-bold">Login</h1>
        <p className="text-xs md:text-sm text-gray-500 ">New here? <Link className="underline" to="/register">Register</Link></p>

        <form className="grid mt-5 md:mt-10  grid-cols-2 gap-2 md:gap-4 w-full" onSubmit={handleSubmit}>
          
          <div className="col-span-2">
            <label className="text-gray-400 text-xs md:text-sm font-medium" htmlFor="username">Username</label>
            <input className="w-full p-2 outline-none border-gray-300 text-xs md:text-sm font-medium text-gray-900 placeholder:text-gray-300 border bg-gray-200 rounded-md" value={formData.username} onChange={(e) => setFormData({...formData, username: e.target.value})} id="username" placeholder="Username" type="username" />
          </div>
          <div className="col-span-2">
            <label className="text-gray-400 text-xs md:text-sm font-medium" htmlFor="password">Password</label>
            <input className="w-full p-2 border-gray-300 text-xs md:text-sm font-medium outline-none border text-gray-900 placeholder:text-gray-300 bg-gray-200 rounded-md" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} id="password" placeholder="Password" type="password" />
          </div>

          <div className="col-span-2 mt-3 md:mt-5">
            <button className="font-medium w-full text-xs md:text-sm flex justify-center bg-violet-600 hover:bg-violet-500 border rounded-md outline-none mb-0 text-white p-2.5 md:p-3 cursor-pointer" type="submit">{loading? <LoaderCircle className="text-white animate-spin" /> : "Login"}</button>
          {error && <p className="text-red-500 text-[10px] md:text-sm w-full mt-1 font-medium leading-none">*{error}</p>}
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage