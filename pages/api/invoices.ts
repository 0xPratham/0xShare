import type { NextApiRequest, NextApiResponse } from 'next'
import { getInvoices, getUserData } from '../../utils/stripefunctions'
import { decodeJWT } from '../../utils/decodeJWT'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const user = await decodeJWT(req)
        if (user === 'Unauthorized!') {
            return res.status(401).json({
                status: false,
                msg: 'Unauthorized!'
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
        const invoices = await getInvoices(stripeUserID)
        if (invoices === 'error') {
            return res.status(500).json({
                status: false,
                msg: 'Somethings wents wrong!'
            })
        }
        if (invoices === 'no_more') {
            return res.status(200).json({
                status: false,
                msg: 'No Invoice Found!'
            })
        }
        return res.status(200).json(invoices)
    } else {
        return res.status(405).json({
            status: false,
            msg: 'Method not allowed'
        })
    }
}
