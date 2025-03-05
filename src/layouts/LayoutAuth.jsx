import { Outlet } from "react-router";
import SidebarUser from "../components/user/SidebarUser";

const LayoutAuth = () => {
    return (
      
            <div className="flex h-full">
                <SidebarUser
                className='w-[30%] h-screen'
                />

                

                <div
                    className=' w-[70%] max-w-5xl mx-auto overflow-hidden mt-10'>
                 
            <Outlet />

                    
                </div>
            </div>
      
    )
}

export default LayoutAuth;