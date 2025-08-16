import { Route, Routes } from 'react-router-dom'; // <-- Use BrowserRouter
import './App.css';
import './index.css';
import AdminPage from './pages/adminPage/AdminPage';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import StoreOwnerPage from './pages/storeOwnerPage/StoreOwnerPage';
import EditProfile from './pages/userPage/EditProfile';
import ProtectedRoute from './pages/userPage/ProtectedRoute';
import UserHome from './pages/userPage/UserPage';
import EditProfileOwner from './pages/storeOwnerPage/EditProfileOwner';

function App() {

  return (
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/home' element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path='/user' element={<ProtectedRoute><UserHome /></ProtectedRoute>} />
        <Route path='/user/editProfile' element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
        <Route path='/user/editProfileOwner' element={<ProtectedRoute><EditProfileOwner /></ProtectedRoute>} />
        <Route path='/admin' element={<AdminPage />} />
        <Route path='/storeOwner' element={<ProtectedRoute><StoreOwnerPage /></ProtectedRoute>} />
      </Routes>
  );
}

export default App;
