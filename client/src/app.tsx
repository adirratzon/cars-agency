import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home.tsx';
import AdminAddCar from './pages/Admin/AdminAddCar.tsx';
import AdminCarList from './pages/Admin/AdminCarList.tsx';
import Login from './pages/Login/Login.tsx';
import ProtectedRoute from './ProtectedRoute.tsx';
import Register from './pages/Register/Register.tsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* כל Routes של אדמין מוגנים */}
        <Route
          path="/admin/list"
          element={
            <ProtectedRoute>
              <AdminCarList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/add"
          element={
            <ProtectedRoute>
              <AdminAddCar />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
