import { NextApiRequest } from 'next'
import { auth } from '../lib/firebase-admin'

export const decodeJWT = async (req: NextApiRequest) => {
    if (req.headers?.authorization?.startsWith('Bearer ')) {
        const idToken = req.headers.authorization.split('Bearer ')[1]
        try {
            const decodedToken = await auth.verifyIdToken(idToken)
            return decodedToken
        } catch (err) {
            return 'Unauthorized!'
        }
    } else {
        return 'Unauthorized!'
    }
}
