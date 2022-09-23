import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../lib/firebase'
import { loadStripe } from '@stripe/stripe-js'
import { useState, useEffect } from 'react'
import { db } from '../lib/firebase'
import { onSnapshot, doc } from 'firebase/firestore'

export function GetUserData() {
    const stripePromise = loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
            ? process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
            : ''
    )
    const [user]: any = useAuthState(auth)
    const [plan, setPlan] = useState<string | null>(null)
    const [active, setActive] = useState<boolean>(false)

    useEffect(() => {
        let unsubscribe
        if (user) {
            const ref = doc(db, 'users', user?.uid)
            unsubscribe = onSnapshot(ref, doc => {
                setPlan(doc.data()?.plan)
                setActive(doc.data()?.active)
            })
        } else {
            setPlan(null)
            setActive(false)
        }
        return unsubscribe
    }, [user])
    return { user, plan, active, stripePromise }
}
