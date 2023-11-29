import ReactDOM from 'react-dom/client';
import init from './init';

import "bootstrap/dist/css/bootstrap.min.css";

const app = async () => {
  const vdom = await init();
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(vdom);
};

app();