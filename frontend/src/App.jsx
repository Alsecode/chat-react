import {
  BrowserRouter, Routes, Route, Navigate,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import MainPage from './pages/Main';
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';
import NotFoundPage from './pages/NotFound';
import Header from './components/Header';
import routes from './routes';
import useAuth from './hooks/useAuth';

const MainPageRouter = ({ children }) => {
  const { user } = useAuth();

  return (
    user ? children : <Navigate to={routes.loginPage()} />
  );
};

const App = () => (
  <>
    <BrowserRouter>
      <div className="d-flex flex-column vh-100 bg-darker">
        <Header />
        <Routes>
          <Route path={routes.mainPage()} element={<MainPageRouter><MainPage /></MainPageRouter>} />
          <Route path={routes.notFoundPage()} element={<NotFoundPage />} />
          <Route path={routes.loginPage()} element={<LoginPage />} />
          <Route path={routes.signupPage()} element={<SignupPage />} />
        </Routes>
      </div>
    </BrowserRouter>
    <ToastContainer />
  </>
);

export default App;
