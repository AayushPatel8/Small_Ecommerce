import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from './conf';
import { setAuth } from "../Actions/productSlice";


const signup =  async(email,password) => {
    const auth = getAuth(app);
    return createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            console.log(user);
            setAuth(true);
            return user;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            throw new Error(errorMessage);
        });
}

export default signup;
