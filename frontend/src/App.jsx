import './App.css';
import React, { useState, useContext, StrictMode } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainPage from './components/Pages/Main/MainPage';
import LoginPage from './components/Pages/Login/LoginPage';
import SignupPage from './components/Pages/Signup/SignupPage';
import NotFoundPage from './components/Pages/NotFoundPage';
import Header from './components/Header';
import AuthContext from './contexts/index';
import { routes } from './routes';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('userId'));

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

const MainPageRouter = ({ children }) => {
  const auth = useContext(AuthContext);

  return (
    auth.loggedIn ? children : <Navigate to={routes.loginPage()} />
  )
}

const App = () => {
  return (
    <StrictMode>
      <AuthProvider>
        <BrowserRouter>
        <div className='d-flex flex-column vh-100 bg-light'>
        <Header />
          <Routes>
              <Route path={routes.mainPage()} element={<MainPageRouter><MainPage /></MainPageRouter>} />
              <Route path='*' element={<NotFoundPage />} />
              <Route path={routes.loginPage()} element={<LoginPage />} />
              <Route path={routes.signupPage()} element={<SignupPage />} />
          </Routes>
        </div>
        </BrowserRouter>
      </AuthProvider>
    </StrictMode>
  )
};

export default App;
