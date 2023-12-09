import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LoginRegisterPage from './pages/LoginRegisterPage';
import UserProfilePage from './pages/UserProfilePage';
import Layout from './components/Layout';

const withLayout = (PageComponent) => {
  return () => (
    <Layout>
      <PageComponent />
    </Layout>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={withLayout(LoginRegisterPage)()} />
          <Route path="/profile" element={withLayout(UserProfilePage)()} />
          {/* Agrega más rutas según sea necesario */}
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
