import { auth, provider } from './firebase'
import { signInWithPopup } from 'firebase/auth'

export const signInWithGoogle = async () => {
    try {
        await signInWithPopup(auth, provider)
    } catch {
        return
    }
}

export const signOut = async () => {
    try {
        auth.signOut()
    } catch (e) {
        console.log(e)
        return
    }
}
