import { useFirebaseUser, useLoadingState } from "./state";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
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

export const initUser = async () => {
    const firebaseUser = useFirebaseUser();
    const loadingState = useLoadingState();
    const auth = getAuth();
    firebaseUser.value = auth?.currentUser;
    const router = useRouter();
    const userCookie: any = useCookie("userCookie");
    onAuthStateChanged(auth, (user) => {
        if (user) {
            router.push("/feed")
        } else {
            router.push("/")
        };

        loadingState.value = false;
        firebaseUser.value = user;
        userCookie.value = user;

        $fetch("/api/auth", {
            method: "POST",
            body: { user }
        });
    });
};


export const signOutUser = async () => {
    const auth = getAuth();
    await signOut(auth);
}