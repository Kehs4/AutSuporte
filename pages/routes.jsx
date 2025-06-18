import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './home/home';
import Login from './login/login';
import Dashboard from './painel/dashboard';


const AppRoutes = () => {
  return (
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
  );
};

export default AppRoutes;