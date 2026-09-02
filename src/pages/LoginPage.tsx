import { useState, useEffect} from "react";
import {Link, useNavigate} from "react-router"
import useDebouncedInput from "../hooks/useDebouncedInput"
import {LoaderCircle, CircleCheck, CircleAlert} from "lucide-react"
import Cookies from "js-cookie"

const LoginPage = () => {

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
    setUsername,
    debouncedUsername,
    setDebouncedUsername,
    availability,
    setAvailability,
    usernameError,
    setUsernameError,
    isLoading,
    setIsLoading,
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

    const url = `${import.meta.env.VITE_SERVER_URL}/api/register`

    const formDataObj = {
        firstName, lastName, email, password, username
      }

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json" 
      },
      body: JSON.stringify(formDataObj)
    }

    const response = await fetch(url, options);

    if(response.ok){
      const data = await response.json();
      const {jwtToken} = data;

      Cookies.set("jwtToken", jwtToken);
      
      
      navigate("/home");
      
    } else{
      const data = await response.json();
      const {message} = data;
      setError(message || "Failed to create account");
      setLoading(false);
    }
  }


  return (
    <div className="h-screen md:p-8 flex flex-col md:flex-row items-center justify-center bg-violet-600">


      <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
        <p className="blur-lg text-violet-500 font-bold font-bricolage text-center md:text-[600px] scale-y-100 leading-none">BARR</p>
      </div>

      <div className=" z-10 md:w-108 flex justify-center items-center bg-white rounded-2xl flex-col px-10 py-10">
        
        
          
        <h1 className="text-3xl font-medium">Create an account</h1>
        <p className="text-sm text-gray-500 ">Already have an account? <Link className="underline" to="/login">Log in</Link></p>
        <form className="grid mt-10 grid-cols-2 gap-4" onSubmit={handleSubmit}>
          <div>
            <label className="text-gray-400 text-sm font-medium" htmlFor="firstName">First Name</label>
            <input className="p-2 w-full outline-none text-gray-900 placeholder:text-gray-400 text-sm font-medium border-gray-300 border bg-gray-200 rounded-md" value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} id="firstName" placeholder="First Name" type="text"/>
          </div>
          <div>
            <label className="text-gray-400 text-sm font-medium" htmlFor="lastName">Last Name</label>
            <input className="p-2 w-full text-gray-900 placeholder:text-gray-400 text-sm font-medium outline-none border-gray-300 border bg-gray-200 rounded-md" value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} id="lastName" placeholder="Last Name" type="text" />
          </div>
          <div className="col-span-2">
            <label className="text-gray-400 text-sm font-medium" htmlFor="username">Username</label>
            <div className="text-gray-900 flex items-center placeholder:text-gray-400 text-sm font-medium border-gray-300 border w-full bg-gray-200 rounded-md h-10">
              <input className="p-2 outline-none w-[90%]" value={username} onChange={handleUsername} id="username" placeholder="Username" type="text" />
              <div className="flex justify-center p-2">
                
                {isLoading? <LoaderCircle className="text-gray-400 text-xs font-medium animate-spin"/> : availability === true ? <span className="text-green-500 text-xs font-medium"><CircleCheck/></span> : availability === false && username && <span className="text-red-500 text-xs font-medium"><CircleAlert/></span>}
              </div>
            </div>
            {usernameError && <span className="text-red-500 text-sm font-medium">{usernameError}</span>}
          </div>
          <div className="col-span-2">
            <label className="text-gray-400 text-sm font-medium" htmlFor="email">Email</label>
            <input className="w-full p-2 outline-none border-gray-300 text-sm font-medium text-gray-900 placeholder:text-gray-400 border bg-gray-200 rounded-md" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} id="email" placeholder="Email" type="email" />
          </div>
          <div className="col-span-2">
            <label className="text-gray-400 text-sm font-medium" htmlFor="password">Password</label>
            <input className="w-full p-2 border-gray-300 text-sm font-medium outline-none border text-gray-900 placeholder:text-gray-400 bg-gray-200 rounded-md" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} id="password" placeholder="Password" type="password" />
          </div>

          <button className="col-span-2 font-medium mt-5 bg-violet-600 hover:bg-violet-500 border rounded-md outline-none text-white p-3 cursor-pointer" type="submit">{loading? <LoaderCircle className="text-white" /> : "Create account"}</button>
          {error && <span className="text-red-500 text-sm font-medium">{error}</span>}
        </form>
          
        
      </div>
    </div>
  )
}

export default LoginPage