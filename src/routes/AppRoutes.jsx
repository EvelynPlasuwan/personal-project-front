import React from 'react'
import { Navigate, Route, Routes } from 'react-router';
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
import AdminUserManagement from '../pages/admin/AdminUserManagement';
import NotFound from '../pages/NotFound';
import LayoutAuth from '../layouts/LayoutAuth';
import ProtectRoute from './ProtectRoute';
import CreateEvent from '../pages/CreateEvent';
import MapPage from '../pages/MapPage';
import AdminEventManagement from '../pages/admin/AdminEventManagement';
import EventDetailPage from '../pages/EventDetailPage';





function AppRoutes() {
  return (
    <>
      <Routes>

        {/* Public */}
        {/* <Route path="/" element={<Layout />}> */}
        <Route>
          <Route index element={<Home />} />
          <Route path="events" element={<Events />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="map" element={<MapPage />} />
          <Route path="/events/:id" element={<EventDetailPage />} />

        </Route>

        {/* Auth */}
        {/* <Route path="auth" element={<LayoutAuth />}> */}
        <Route path='auth'>
          <Route path="create-event" element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        {/* </Route> */}

        {/* Private */}

        {/* User */}
        <Route path="user" element={
          <ProtectRoute allows={["USER", "ADMIN"]}>
            <LayoutAuth />
          </ProtectRoute>
        }>
          {/* <Route path ="user" element={<LayoutAuth/>}> */}
          <Route index element={<HomeUser />} />
          <Route path='userInfo' element={<UserInfo />} />
          <Route path='creating-event' element={<CreateEvent />} />
          <Route path='user-events' element={<UserEvents />} />
          <Route path='host-control' element={<HostCt />} />
        
        </Route>


        {/* Admin */}
        <Route path="admin" element={
          <ProtectRoute allows={["ADMIN"]}>
            <LayoutAdmin />
          </ProtectRoute>
        }>
          {/* <Route path ="admin" element={<LayoutAdmin/>}> */}
          <Route index element={<AdminInfo />} />
          <Route path='event-approve' element={<AdminEventManagement />} />
          <Route path='dashboard' element={<AdminUserManagement/>} />
        </Route>


        {/* Other */}
        <Route path='*' element={<NotFound />} />


      </Routes>
    </>
  );
}

export default AppRoutes