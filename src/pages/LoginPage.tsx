import React, { useState} from "react";
import {Link, useNavigate} from "react-router"
import {LoaderCircle, Eye, EyeOff} from "lucide-react"
import Cookies from "js-cookie"
import axios from "axios"
import Input from "../components/Input.tsx"

interface FormData{
  username: string;
  password: string;
}

const LoginPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: ""
  })
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError(null);
    setLoading(true);


    const {username, password} = formData;

    const url = `${import.meta.env.VITE_SERVER_URL}/api/auth/login`;

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
            <Input 
              label="Username"
              value={formData.username} 
              onChange={(e) => setFormData({...formData, username: e.target.value})} 
              id="username"
              placeholder="Username"
              type="text"
            />
          </div>

          <div className="col-span-2">
            <label className="text-gray-400 text-xs md:text-sm font-medium" htmlFor="password">Password</label>
            <div className="text-gray-900 flex items-center font-medium border-gray-300 border w-full bg-gray-200 rounded-md h-9 md:h-10">
              <input className="p-2 outline-none w-[90%] text-xs md:text-sm placeholder:text-gray-300" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})}  id="password" placeholder="Password" type={showPassword? "text" : "password"} />
              <button className="flex justify-center items-center p-2 cursor-pointer" type="button" onClick={() => setShowPassword(!showPassword)}>  
                <span className="md:size-6 text-gray-500 hover:text-gray-800">{showPassword? <Eye/> : <EyeOff/>}</span>
              </button>
            </div>
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