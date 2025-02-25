import { Outlet }  from "react-router";

const LayoutAuth = () => {
    return (
        <div className="authContainer">
            <Outlet />
        </div>
    )
}

export default LayoutAuth;