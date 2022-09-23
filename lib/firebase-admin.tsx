import admin from 'firebase-admin'

const config = {
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY,
    projectId: process.env.NEXT_PUBLIC_PROJECTID
}

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(config),
        databaseURL: 'https://0xshare.firebaseio.com'
    })
}

export const db = admin.firestore()
export const auth = admin.auth()
