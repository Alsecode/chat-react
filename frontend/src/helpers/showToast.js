import { toast, Flip } from 'react-toastify';

const options = {
  position: 'top-center',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  transition: Flip,
  theme: 'light',
};

const showToast = (type, message) => toast[type](message, options);

export default showToast;
