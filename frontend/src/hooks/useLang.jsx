import { useContext } from 'react';

import langContext from '../contexts/lang.jsx';

const useLang = () => useContext(langContext);

export default useLang;