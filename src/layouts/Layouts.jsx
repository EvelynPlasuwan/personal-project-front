import { Outlet }  from "react-router";
import MainNav from "../components/MainNav";
import { useEffect } from 'react';
import useAuthStore from '../store/auth-store';

const Layout = () => {
    const { checkAuthStatus } = useAuthStore();
    useEffect(() => {
        checkAuthStatus();
      }, [checkAuthStatus]);

    return (
        <div className="w-full">
            <MainNav />
       
            <Outlet />
        </div>
    )
}

export default Layout;