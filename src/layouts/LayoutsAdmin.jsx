import { Outlet } from "react-router";
import MainNav from "../components/MainNav"
import SidebarAdmin from "../components/admin/SidebarAdmin";
// import Sidebar from "../components/admin/SidebarAdmin";
// import HeaderAdmin from "../components/admin/HeaderAdmin";


const LayoutAdmin = () => {
    return (
       
        <div className="flex h-full">
        <SidebarAdmin 
        className='w-[30%] h-screen'
        />

        

        <div
            className=' w-[75%] mx-auto overflow-hidden mt-10'>
         
    <Outlet />

            
        </div>
    </div>
    )
}

export default LayoutAdmin;