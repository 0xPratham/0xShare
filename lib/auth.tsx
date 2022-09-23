import { auth, provider } from './firebase'
import { signInWithPopup } from 'firebase/auth'
import { db } from '../lib/firebase'
import { setDoc, doc } from 'firebase/firestore'

export const signInWithGoogle = async () => {
    try {
        const credential = await signInWithPopup(auth, provider)
        const { uid, email } = credential.user
        await setDoc(
            doc(db, 'users', uid),
            {
                email
            },
            { merge: true }
        )
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
