import React from 'react'
import { Route, Routes } from 'react-router';
import Layout from '../layouts/Layouts';
import Home from '../pages/Home';
import Events from '../pages/Events';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import HomeUser from '../pages/user/HomeUser';
import UserInfo from '../pages/user/UserInfo';
import UserEvents from '../pages/user/UserEvents';
import HostCt from '../pages/user/HostCt';
import LayoutAdmin from '../layouts/LayoutsAdmin';
import AdminInfo from '../pages/admin/AdminInfo';
import EventApprove from '../pages/admin/EventApprove';
import Dashboard from '../pages/admin/Dashboard';
import NotFound from '../pages/NotFound';
import LayoutAuth from '../layouts/LayoutAuth';




function AppRoutes() {
  return (
    <>
      <Routes>

        {/* Public */}
        <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="events" element={<Events />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        </Route>
       
       {/* Auth */}
       <Route path="auth" element={<LayoutAuth />}>
        <Route path="create-event" element={<Login />}/>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        </Route>

        {/* Private */}
        
        {/* User */}
        <Route path="user" element={<Layout />}>
        <Route index element={<HomeUser />} />
        <Route path='userInfo' element={<UserInfo />} />
        <Route path='user-events' element={<UserEvents/>} />
        <Route path='host-control' element={<HostCt />} />
        </Route>


        {/* Admin */}
        <Route path="admin" element={<LayoutAdmin/>}>
        <Route index element={<AdminInfo/>} />
        <Route path='event-approve' element={<EventApprove/>} />
        <Route path='dashboard' element={<Dashboard/>} />
        </Route>


        {/* Other */}
        <Route path='*' element={<NotFound/>} />

        
      </Routes>
    </>
  );
}

export default AppRoutes