import { Link } from "react-router";
import Logo from "../assets/Logo";

const MainNav = () => {
    return (
        <nav
       
            className="sticky top-0  grid grid-cols-3 items-center px-4 py-2 
      bg-[#2B293D] w-[100%] h-[75px]"
        >
            <div className="ml-16">
            <Logo />
            </div>

            <div className="flex items-center justify-center gap-5 text-white">
                <Link to="/">Home</Link>
                <Link to="/events">Events</Link>
                <Link to="/about">About</Link>
                <Link to="/contact">Contact</Link>
            </div>

            <div className="flex items-center justify-center gap-2 text-white ">
                <Link to="/auth/create-event"> Create Event</Link>
                <Link to="/auth/register"
                className="btn bg-[#BD3733] border-0 text-white"
                > Sign up</Link>
                <Link to="/auth/login"
                className="btn bg-[#FFE047] border-0"
                >Login</Link>
            </div>
        </nav>
    );
};
export default MainNav;