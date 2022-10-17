import { useFirebaseUser } from "../composables/useState";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, setDoc, getFirestore, updateDoc } from "firebase/firestore";
export const registerUser = async (email: string, password: string) => {
    const auth = getAuth();
    const db = getFirestore();
    const response = await createUserWithEmailAndPassword(auth, email, password);
    if (response) {
        await setDoc(doc(db, "users", response.user.uid), {
            id: response.user.uid,
            email: response.user.email,
            online: true
        });
    };
    return response;
};

export const loginUser = async (email: string, password: string) => {
    const auth = getAuth();
    const db = getFirestore();
    const response = await signInWithEmailAndPassword(auth, email, password);
    await updateDoc(doc(db, "users", response.user.uid), {
        online: true
    })
};

export const googleOauth = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider)
        .then((res) => {
            console.log(res)
        }).catch((err) => {
            console.log(err.message)
        });
};

export const initUser = async () => {
    const firebaseUser = useFirebaseUser();
    const loadingState = useLoadingState();
    const auth = getAuth();
    firebaseUser.value = auth?.currentUser;
    const userCookie: any = useCookie("userCookie");
    const router = useRouter();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            router.push("/home")
        } else {
            router.push("/")
        };
        loadingState.value = false;
        firebaseUser.value = user;
        userCookie.value = user;

        $fetch("/api/auth", {
            method: "POST",
            body: { user }
        })
    });
};

export const logOutUser = async () => {
    const auth = getAuth();
    await signOut(auth);
}