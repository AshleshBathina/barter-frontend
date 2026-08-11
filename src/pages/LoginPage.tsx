import { useState, useEffect} from "react";
import {Link} from "react-router"

const LoginPage = () => {
  return (
    <div className="h-screen p-8">
      <div className="h-full grid grid-cols-2 ">
        <div className="border-2 border-amber-300">

        </div>
        <div className=" flex flex-col px-30 py-10">
          <div className="">
            <h1 className="text-3xl font-medium">Create an account</h1>
            <p className="text-sm text-gray-500 mt-2">Already have an account? <Link className="underline" to="/login">Log in</Link></p>
            <form className="grid mt-10 grid-cols-2 gap-6">
              <div>
                <label className="text-gray-400 text-sm font-medium" htmlFor="firstName">First Name</label>
                <input className="p-3 w-full outline-none text-gray-900 placeholder:text-gray-400 text-sm font-medium border-gray-300 border bg-gray-200 rounded-md" id="firstName" placeholder="First Name" type="text"/>
              </div>
              <div>
                <label className="text-gray-400 text-sm font-medium" htmlFor="lastName">Last Name</label>
                <input className="p-3 w-full text-gray-900 placeholder:text-gray-400 text-sm font-medium outline-none border-gray-300 border bg-gray-200 rounded-md" id="lastName" placeholder="Last Name" type="text" />
              </div>
              <div className="col-span-2">
                <label className="text-gray-400 text-sm font-medium" htmlFor="username">Username</label>
                <input className="p-3 text-gray-900 placeholder:text-gray-400 text-sm font-medium outline-none border-gray-300 border w-full bg-gray-200 rounded-md" id="username" placeholder="Username" type="text" />
              </div>
              <div className="col-span-2">
                <label className="text-gray-400 text-sm font-medium" htmlFor="email">Email</label>
                <input className="w-full p-3 outline-none border-gray-300 text-sm font-medium text-gray-900 placeholder:text-gray-400 border bg-gray-200 rounded-md" id="email" placeholder="Email" type="email" />
              </div>
              <div className="col-span-2">
                <label className="text-gray-400 text-sm font-medium" htmlFor="password">Password</label>
                <input className="w-full p-3 border-gray-300 text-sm font-medium outline-none border text-gray-900 placeholder:text-gray-400 bg-gray-200 rounded-md" id="password" placeholder="Password" type="password" />
              </div>

              <button className="col-span-2 font-medium mt-5 bg-violet-600 hover:bg-violet-500 border rounded-md outline-none text-white p-3 cursor-pointer" type="submit">Create account</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage