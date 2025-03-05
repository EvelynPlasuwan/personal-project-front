import React from 'react'
import { LayoutDashboard, User } from 'lucide-react'
import { Link } from 'react-router'
import { userSidebarLink } from '../../utils/links';
import useAuthStore from '../../store/auth-store';


function SidebarUser() {
  const { user } = useAuthStore();

  return (
    <div className="bg-gray-300 w-48 h-[100vh] text-black">
      {/* Profile */}
      <div className="flex flex-col items-center my-12 gap-2">
        <User size={48} />
        <p>Profile</p>
        <div className='badge badge-ghost'>
          {user.username}
          </div>
      </div>
      {/* /Profile */}

      {/* Navlinks */}
      {userSidebarLink.map((item) => {
        return (
          <div key={item.label}>
            <Link
              className="flex py-2 px-4 gap-2
        hover:bg-[#FFE047] hover:duration-300
        "
              to={item.link}
            >
              {item.icon}
              <p>{item.label}</p>
            </Link>
          </div>
        );
      })}
      {/* /Navlinks */}
    </div>
  )
}

export default SidebarUser