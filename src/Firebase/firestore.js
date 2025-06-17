import { getFirestore } from 'firebase/firestore'
import { app } from './conf';
import { collection,addDoc,setDoc,doc,getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const db = getFirestore(app);

export async function addUser(userData) {
    const auth = getAuth(app);
    const user = auth.currentUser;

    if (!user) {
        throw new Error("No authenticated user found");
    }
    
    try {
        await setDoc(doc(db,'users',user.uid),userData,{merge:true});
        console.log("Document successfully written!");
    } catch (e) {
        console.error("Error adding document: ", e);
        throw e;
    }
}

export async function getUser() {
    const auth = getAuth(app);
    const user = auth.currentUser;

    if (!user) {
        throw new Error("No authenticated user found");
    }
    try {
        const userData = await getDoc(doc(db,'users',user.uid))
        return userData.exists()?userData.data():null;
    } catch (error) {
        console.log(error);
        throw error;
    }

}



