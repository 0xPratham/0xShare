import type { NextApiRequest, NextApiResponse } from 'next'
import { setURL } from '../../lib/redis'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (req.method === 'POST') {
            if (!req.body.url) {
                return res.status(400).json({
                    status: false,
                    msg: 'Url required!'
                })
            }
            const url = new URL(req.body.url)
            if (
                url.host !== 'firebasestorage.googleapis.com' ||
                !url.pathname.startsWith('/v0/b/xshare-bb9db.appspot.com/o/')
            ) {
                return res.status(422).json({
                    status: false,
                    msg: 'Domain is not allowed!'
                })
            }
            const shortURL = await setURL(req.body.url)
            if (typeof shortURL === 'string') {
                return res.status(200).json({
                    status: true,
                    url: shortURL
                })
            }
            return res.status(500).json({
                status: false,
                msg: "Can't generate a short url"
            })
        } else {
            return res.status(405).json({
                status: false,
                msg: 'Method not allowed'
            })
        }
    } catch (e: any) {
        if (e.message === 'Invalid URL') {
            return res.status(400).json({
                status: false,
                msg: 'Invalid URL'
            })
        }
        return res.status(500).json({
            status: false,
            msg: 'Something went wrong'
        })
    }
}
