import { 
  GoogleAuthProvider, 
  GithubAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signOut,
  FacebookAuthProvider
} from "firebase/auth/web-extension";
import { auth } from "./firebase";

const googleProvider = new GoogleAuthProvider();
const facekbookProvider = new FacebookAuthProvider();
const githubProvider = new GithubAuthProvider();

export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);
export const signInWithFacebook = () => signInWithPopup(auth, facekbookProvider);
export const signInWithGithub = () => signInWithPopup(auth, githubProvider);

export const signInWithEmailPassword = ({email, password}: {email: string, password: string}) => 
  signInWithEmailAndPassword(auth, email, password);

export const signUpWithEmailPassword = ({email, password}: {email: string, password: string}) => 
  createUserWithEmailAndPassword(auth, email, password);

export const logout = () => signOut(auth);

