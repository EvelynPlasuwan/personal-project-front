import { Outlet }  from "react-router";
import MainNav from "../components/MainNav";

const Layout = () => {
    return (
        <div className="w-[100%]">
            <MainNav />
            <Outlet />
        </div>
    )
}

export default Layout;