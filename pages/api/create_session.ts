import type { NextApiRequest, NextApiResponse } from 'next'
import { decodeJWT } from '../../utils/decodeJWT'
import { getOrCreateCustomer, createSession } from '../../utils/stripefunctions'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const plans = ['MONTHLY', 'QUARTERLY', 'YEARLY']
    if (req.method === 'POST') {
        if (
            !req.body.plan ||
            !plans.includes(req.body.plan.toString().toUpperCase())
        ) {
            return res.status(400).json({
                status: false,
                msg: 'Plan required!'
            })
        }
        const plan =
            process.env[
                `STRIPE_${req.body.plan.toString().toUpperCase()}_PLAN_ID`
            ]
        const user = await decodeJWT(req)
        if (user === 'Unauthorized!') {
            return res.status(401).json({
                status: false,
                msg: 'Unauthorized!'
            })
        }
        const customer_data = await getOrCreateCustomer(user.uid)
        if (customer_data === 'Error') {
            return res.status(500).json({
                status: false,
                msg: 'Somethings wents wrong'
            })
        }
        if (customer_data === 'Already Subscribed') {
            return res.status(200).json({
                status: false,
                msg: 'Already Subscribed'
            })
        }
        const session = await createSession(plan ? plan : '', customer_data.id)
        if (session === 'Error') {
            return res.status(500).json({
                status: false,
                msg: 'Somethings wents wrong'
            })
        }
        return res.status(200).json({
            status: true,
            session: session.id
        })
    } else {
        return res.status(405).json({
            status: false,
            msg: 'Method not allowed'
        })
    }
}
