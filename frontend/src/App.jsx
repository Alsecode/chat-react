import './App.scss';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import MainPage from './pages/Main';
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';
import NotFoundPage from './pages/NotFound';
import Header from './components/Header';
import { routes } from './routes';
import useAuth from './hooks/useAuth';

const MainPageRouter = ({ children }) => {
  const { user } = useAuth();
  console.log(user);

  return (
    user ? children : <Navigate to={routes.loginPage()} />
  )
}

const App = () => {
  return (
    <BrowserRouter>
      <div className='d-flex flex-column vh-100 bg-light'>
      <Header />
        <Routes>
          <Route path={routes.mainPage()} element={<MainPageRouter><MainPage /></MainPageRouter>} />
          <Route path={routes.notFoundPage()} element={<NotFoundPage />} />
          <Route path={routes.loginPage()} element={<LoginPage />} />
          <Route path={routes.signupPage()} element={<SignupPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
