import React from 'react'
import { Link } from 'react-router';
import useAuthStore from '../store/auth-store';
import Logout from './Logout';
import Avatar from './Avatar';

function AuthNav() {


  const {
    isAuthenticated,
    isAdmin,
    isUser,
    user,
    actionLogout,
    checkAuthStatus
  } = useAuthStore();
  // เรียกใช้ checkAuthStatus เมื่อ component ถูกโหลด
  React.useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);


  console.log("User data:", user);
  console.log("isAuthenticated:", isAuthenticated());
  console.log("isAdmin:", isAdmin());
  console.log("isUser:", isUser());



  // สำหรับ Guest (ไม่ได้ล็อกอิน)
  if (!isAuthenticated()) {
    return (
      <div className="flex items-center justify-center gap-3 text-white ">
        <Link to="/auth/login"> Create Event</Link>
        <Link to="/auth/register"
          className="btn bg-[#BD3733] border-0 text-white"
        > Sign up</Link>
        <Link to="/auth/login"
          className="btn bg-[#FFE047] border-0"
        >Login</Link>
      </div>
    );
  }

  // สำหรับ Admin
  if (isAdmin()) {
    return (
      <div className="flex items-center justify-end mr-16 gap-5 text-white ">
 
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
          {/* <li><Link to='/admin'>Account Info</Link></li> */}
          <li><Link to='/admin/event-approve'>Event Approval</Link></li>
          <li><Link to='/admin/dashboard'>Dashboard</Link></li>
          <div className="divider my-0"></div>
          <li > <Logout /> </li>
        </ul>
      </div>
    </div>
    );
  }

  // สำหรับ User ทั่วไป
  return (
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
          <li > <Logout /> </li>
        </ul>
      </div>
    </div>

  );


}

export default AuthNav