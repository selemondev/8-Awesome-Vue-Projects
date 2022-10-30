import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc, getFirestore } from "firebase/firestore";
export const registerUser = async (username: string, email: string, password: string) => {
    const auth = getAuth();
    const db = getFirestore();
    const response = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, "users", response.user.uid), {
        id: response.user.uid,
        email: response.user.email,
        username: username,
        online: true,
    });

    return response;
};


export const loginUser = async (email: string, password: string) => {
    const auth = getAuth();
    const db = getFirestore();
    const response = await signInWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, "users", response.user.uid), {
        id: response.user.uid,
        email: response.user.uid,
        online: true
    })
};