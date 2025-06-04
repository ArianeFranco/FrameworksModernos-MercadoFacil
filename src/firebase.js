import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBpe_BKzv4FXh0MhF4qEFiMQYuK7jSwrkk",
  authDomain: "atividade-frameworks-308bd.firebaseapp.com",
  projectId: "atividade-frameworks-308bd",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup, signOut };
