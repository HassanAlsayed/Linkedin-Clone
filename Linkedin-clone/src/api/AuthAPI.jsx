import { createUserWithEmailAndPassword, signInWithEmailAndPassword,GoogleAuthProvider,signInWithPopup,signOut } from 'firebase/auth'; 
import { auth } from '../firebaseConfig'; 
import { toast } from 'react-toastify';

export  async function RegisterAPI(email, password) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return userCredential;
    } catch (error) {
        console.log('Error logging in:', error.message);
        throw error; 
    }
}

export  async function LoginAPI(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential;
    } catch (error) {
        console.log('Error logging in:', error.message);
        throw error; 
    }
}

export  async function GoogleAPI() {
    try {
      let googleProvider = new GoogleAuthProvider();
      return signInWithPopup(auth,googleProvider);
    } catch (error) {
        console.log('Error logging in:', error.message);
        throw error; 
    }
}

export const Logout = async () =>{
  try{
   await signOut(auth);
    localStorage.clear();
    toast.success('sign out successfully');

  }catch(error){
    toast.error('faild to sign out');
  }
}
