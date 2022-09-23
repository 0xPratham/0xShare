import type { NextApiRequest, NextApiResponse } from 'next'
import {
    updateStatus,
    verifySignature,
    updateSubscription,
    deleteSubscription,
    getFirebaseUserID
} from '../../utils/stripefunctions'

export const config = {
    api: {
        bodyParser: false
    }
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const { event, error } = await verifySignature(req)
        if (error === 'Error' || !event) {
            return res.status(401).json({
                status: false,
                msg: 'Not authorized!'
            })
        }
        try {
            const res_object: any = event.data.object
            const customer_id: string = res_object?.customer
            const firebase_uid =
                customer_id && (await getFirebaseUserID(customer_id))
            switch (event.type) {
                case 'customer.subscription.created':
                    const plan: string = res_object?.plan?.nickname
                    plan && firebase_uid
                        ? await updateSubscription(plan, firebase_uid)
                        : ''
                    return res.status(200).json({})
                case 'customer.subscription.deleted':
                    firebase_uid && (await deleteSubscription(firebase_uid))
                    return res.status(200).json({})
                case 'checkout.session.completed':
                    firebase_uid && (await updateStatus(firebase_uid))
                    return res.status(200).json({})
                default:
                    return res.status(500).json({
                        status: false,
                        msg: 'Something wents wrong'
                    })
            }
        } catch {
            return res.status(500).json({
                status: false,
                msg: 'Something wents wrong'
            })
        }
    } else {
        return res.status(405).json({
            status: false,
            msg: 'Method not allowed'
        })
    }
}
