import { Link } from 'react-router-dom';
import { useContext } from 'react';

import AuthContext from '../contexts/index';
import Logo from "../img/logo.png";

const Header = () => {
    const auth = useContext(AuthContext);
    const logOutBtn = <button type="button" className="btn btn-primary" onClick={auth.logOut}>Выйти</button>;

    return (
      <nav className="navbar navbar-light bg-white shadow-sm">
        <div className="container justify-content-between">
          <Link className='navbar-brand' to="/">
            <img src={Logo} width="30px" height="22px" alt='logo' className=' mb-1 pe-2'></img>
            AlsecodeChat</Link>
          {auth.loggedIn ? logOutBtn : null}
        </div>
      </nav>
    )
};

export default Header;