// services/authService.js
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        unsubscribe(); // stop listening once we get the user
        if (user) {
          resolve(user);
        } else {
          reject(new Error('No user is currently logged in.'));
          return toast.error('User not logged in!');
        }
      },
      (error) => {
        unsubscribe();
        reject(error);
      }
    );
  });
};
