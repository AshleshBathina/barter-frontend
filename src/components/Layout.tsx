import Navbar from "./Navbar"
import {Outlet} from "react-router"

const Layout = () => {
  return (
    <div className="h-screen">
      <Navbar/>
      <Outlet/>
    </div>
  )
}

export default Layout;