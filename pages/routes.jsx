import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './home/home';
import Login from './login/login';
import Dashboard from './painel/dashboard';
import Profile from './painel/profile/profile';
import SignUp from './signup/signup';
import EditProfile from './painel/profile/editprofile';
import Licenses from './licences/licenses';
import Errors from './errors/errors';
import Clients from './clients/clients';
import ClientsData from './clients/clientsData/clientsData';
import ApiLogs from './apilogs/apilogs';
import Maintenance from './maintenance/maintenance';
import verifyLocks from './verifylocks/verifylocks';

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
        <Route path='/licences' element={<Licenses />} />
        <Route path='/errors' element={<Errors />} />
        <Route path='/clientstb' element={<Clients />} />
        <Route path='/clients' element={<ClientsData />} />
        <Route path='/apilogs' element={<ApiLogs />} />
        <Route path='/maintenance' element={<Maintenance />} />
        <Route path='/verifylocks' element={<verifyLocks />} />
      </Routes>
  );
};

export default AppRoutes;