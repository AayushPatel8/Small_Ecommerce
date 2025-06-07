import { getAuth, signOut } from "firebase/auth";
import { setAuth } from "../Actions/productSlice";

const logOut =  async (dispatch) => {
  const auth = getAuth();
  try {
    await signOut(auth);
    dispatch(setAuth(false));
    // Sign-out successful.
  } catch (error) {
    // An error happened.
    console.error("Sign-out error:", error);
    throw error;
  }
};

export default logOut;

