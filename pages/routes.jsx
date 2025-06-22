import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './home/home';
import Login from './login/login';
import Dashboard from './painel/dashboard';
import Profile from './painel/profile/profile';
import SignUp from './signup/signup';
import EditProfile from './painel/profile/editprofile';
import Licences from './licences/licences';

const AppRoutes = () => {
  return (
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route index path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/profile/edit' element={<EditProfile />} />
        <Route path='/licences' element={<Licences />} />
      </Routes>
  );
};

export default AppRoutes;