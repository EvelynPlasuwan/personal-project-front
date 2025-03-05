import React from 'react'
import { adminSidebarLink } from '../../utils/links';
import { Link } from 'react-router';
import { User } from 'lucide-react';
import useAuthStore from '../../store/auth-store';

function SidebarAdmin() {
  const { user } = useAuthStore();
  return (
    <div className="bg-gray-300 w-48 h-[100vh] text-black">
      {/* Profile */}
      <div className="flex flex-col items-center my-12 gap-2">
        <User size={48} />
        <p>Admin</p>
        <div className='badge badge-ghost'>
          {user.username}
          </div>
      </div>
      {/* /Profile */}

      {/* Navlinks */}
      {adminSidebarLink.map((item) => {
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

export default SidebarAdmin