import { Link } from 'react-router-dom';

import { routes } from '../../routes';
import NotFoundPic from '../../img/no-results.png';

const NotFound = () => (
    <div className='container h-100'>
        <div className="d-flex flex-column justify-content-center align-items-center h-100">
            <img src={NotFoundPic} alt='NotFoundPic' className='w-25 animation-show'></img>
            <h2>Страница не найдена</h2>
            <p>Но вы можете перейти на <Link to={routes.mainPage()}>главную страницу</Link></p>  
        </div>
    </div>
);
  
  export default NotFound;