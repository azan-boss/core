import { signInWithPopup, signOut as firebaseSignOut } from "firebase/auth";
import { provider } from "./firebase";
import { auth } from "./firebase";

export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, provider);
        return result.user;
    } catch (error) {
        console.error("Error signing in with Google:", error);
        throw error;
    }
}

export const signOutUser = async (): Promise<void> => {
    try {
        await firebaseSignOut(auth);
    } catch (error) {
        console.error("Error signing out:", error);
        throw error;
    }
}
