import type { NextApiRequest, NextApiResponse } from 'next'
import { decodeJWT } from '../../utils/decodeJWT'
import {
    getSubscriptionExpireTime,
    getUserData
} from '../../utils/stripefunctions'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        try {
            const user = await decodeJWT(req)
            if (user === 'Unauthorized!') {
                return res.status(401).json({
                    status: false,
                    msg: 'Unauthorized!'
                })
            }
            if (!user.active && user.plan === null) {
                return res.status(403).json({
                    status: false,
                    msg: 'Not subscribed to any plan!'
                })
            }
            const stripeUserID = await getUserData(user.uid)
            if (stripeUserID === 'error') {
                return res.status(500).json({
                    status: false,
                    msg: 'Somethings wents wrong'
                })
            }
            if (stripeUserID === 'new_customer') {
                return res.status(200).json({
                    status: false,
                    msg: 'No Invoice Found!'
                })
            }
            const time = await getSubscriptionExpireTime(stripeUserID)
            if (typeof time === 'object') {
                return res.status(200).json({
                    status: true,
                    msg: time.time
                })
            } else {
                return res.status(400).json({
                    status: false,
                    msg: time
                })
            }
        } catch {
            return res.status(500).json({
                status: false,
                msg: 'Somethings wents wrong!'
            })
        }
    } else {
        return res.status(405).json({
            status: false,
            msg: 'Method not allowed'
        })
    }
}
