import ReactDOM from 'react-dom/client';
import init from './init';

import './css/App.min.css';

const app = async () => {
  const vdom = await init();
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(vdom);
};

app();
