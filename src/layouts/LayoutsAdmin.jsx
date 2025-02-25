import { Outlet } from "react-router";
import MainNav from "../components/MainNav"
import Sidebar from "../components/admin/Sidebar";
import HeaderAdmin from "../components/admin/HeaderAdmin";


const LayoutAdmin = () => {
    return (
        <div className="w-[100%]">
            <MainNav/>
            <Sidebar />

            
        </div>
    )
}

export default LayoutAdmin;