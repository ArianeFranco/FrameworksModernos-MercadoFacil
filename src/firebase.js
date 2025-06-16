import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAESuqGm_0E1wwfTHbS4iToRgRQdQPVQZA",
  authDomain: "av02-frameworks.firebaseapp.com",
  projectId: "Sav02-frameworks",
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export { auth, provider }
