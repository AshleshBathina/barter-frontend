import Navbar from "./Navbar"
import {Outlet} from "react-router"

const Layout = () => {
  return (
    <div className="min-h-screen">
      <Navbar/>
      <div className="">
        <Outlet/>
      </div>
    </div>
  )
}

export default Layout;