import { Link } from "react-router";
import Logo from "../assets/Logo";
import { useEffect } from 'react';
import useAuthStore from '../store/auth-store';
import Logout from "./Logout";
import AuthNav from "./AuthNav";
import Avatar from "./Avatar";

const MainNav = () => {

    const { user, token, checkAuthStatus, isAuthenticated } = useAuthStore();
    // const { checkAuthStatus } = useAuthStore();
    useEffect(() => {
        // ตรวจสอบสถานะเมื่อคอมโพเนนต์โหลด
        checkAuthStatus();
      }, [checkAuthStatus]);


    return (
        
        
        <nav
       
            className="sticky top-0  grid grid-cols-3 items-center px-4 py-2 
      bg-[#2B293D] w-[100%] h-[75px] z-50"
        >
            <div className="ml-16">
                <Link to="/">
            <Logo />
                </Link>
            </div>

      {/* ... เมนูอื่นๆ ... */}
            <div className="flex items-center justify-center gap-5 text-white">
                <Link to="/">Home</Link>
                <Link to="/events">Events</Link>
                <Link to="/about">About</Link>
                <Link to="/contact">Contact</Link>
            </div>
            <AuthNav/>    
        </nav>
                
    );
};
export default MainNav;

      
      {/* {isAuthenticated() ? (
          <div className="flex items-center justify-end mr-16 gap-5 text-white ">
          <Link to="/user/creating-event"> + Create Event</Link>
     
  
          <div className="dropdown dropdown-end">
                      <div tabIndex={0} role="button" className="btn m-0 btn-circle bg-inherit border-0 btn-sm">
                          <Avatar 
                              className='w-8 h-8 rounded-full bg-[#2B293D]' 
                              menu={true}
                              imgSrc={user?.profileImage}
                />
                <p className='text-[10px] text-white'>Profile</p>
                      </div>
                      <ul tabIndex={0} className="dropdown-content menu bg-[#FFE047] text-[#2B293D] rounded-box z-[1] w-52 p-2 shadow">
                          <li><Link to='/user/userInfo'>Profile</Link></li>
                          <li><Link to='/user/user-events'>My Events</Link></li>
                          <li><Link to='/user/host-control'>Host Control</Link></li>
                          <div className="divider my-0"></div>
                          <li > <Logout/> </li>
                      </ul>
                  </div>
      </div>
      ) : (
        <div className="flex items-center justify-center gap-3 text-white ">
   
        <Link to="/auth/register"
        className="btn bg-[#BD3733] border-0 text-white"
        > Sign up</Link>
        <Link to="/auth/login"
        className="btn bg-[#FFE047] border-0"
        >Login</Link>
    </div>
      )}         */}

      {/* <AuthNav/>    
        </nav>
                
    );
};
export default MainNav; */}




// import { Link } from "react-router";
// import Logo from "../assets/Logo";


// const MainNav = () => {
//     return (
//         <nav
       
//             className="sticky top-0  grid grid-cols-3 items-center px-4 py-2 
//       bg-[#2B293D] w-[100%] h-[75px]"
//         >
//             <div className="ml-16">
//             <Logo />
//             </div>

//             <div className="flex items-center justify-center gap-5 text-white">
//                 <Link to="/">Home</Link>
//                 <Link to="/events">Events</Link>
//                 <Link to="/about">About</Link>
//                 <Link to="/contact">Contact</Link>
//             </div>

//             <div className="flex items-center justify-center gap-3 text-white ">
//                 <Link to="/auth/create-event"> Create Event</Link>
//                 <Link to="/auth/register"
//                 className="btn bg-[#BD3733] border-0 text-white"
//                 > Sign up</Link>
//                 <Link to="/auth/login"
//                 className="btn bg-[#FFE047] border-0"
//                 >Login</Link>
//             </div>
//         </nav>
//     );
// };
// export default MainNav;