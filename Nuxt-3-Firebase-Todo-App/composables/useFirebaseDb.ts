import {
    collection, addDoc, getFirestore, Timestamp
} from "firebase/firestore";
import { getAuth } from "@firebase/auth";
export const addTodo = async (todo: string, completed: boolean) => {
    const auth = getAuth();
    const db = getFirestore()
    const docRef = collection(db, "todos");
    await addDoc(docRef, {
        id: auth?.currentUser?.uid,
        todo,
        completed,
        createdAt: Timestamp.fromDate(new Date())
    });
};