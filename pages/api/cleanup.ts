import type { NextApiRequest, NextApiResponse } from 'next'
import { bucket } from '../../lib/firebase-admin'
import { File } from '@google-cloud/storage'

const delete_item = async (folderName: string) => {
    try {
        await bucket.getFiles({ prefix: `${folderName}/` }).then(result => {
            result.length > 0 &&
                result.map(file => {
                    file.length > 0 &&
                        file.map((data: File) => {
                            let file_date: Date = new Date(
                                data.metadata.timeCreated
                            )
                            file_date.setMinutes(file_date.getMinutes() + 30)
                            if (new Date() > file_date) {
                                bucket.file(data?.metadata?.name).delete()
                            }
                        })
                })
        })
        return
    } catch {
        return
    }
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        try {
            if (req.headers?.authorization?.startsWith('Basic ')) {
                const auth_token = req.headers.authorization.split('Basic ')[1]
                if (auth_token === process.env.CLEANUP_TOKEN) {
                    const cleanup_object = [
                        {
                            id: 1,
                            folderName: process.env.NEXT_PUBLIC_ANONYMOUS_USER
                        },
                        {
                            id: 2,
                            folderName: process.env.NEXT_PUBLIC_LOGIN_USER
                        },
                        {
                            id: 3,
                            folderName: process.env.NEXT_PUBLIC_MONTHLY_USER
                        },
                        {
                            id: 4,
                            folderName: process.env.NEXT_PUBLIC_QUARTERLY_USER
                        },
                        {
                            id: 5,
                            folderName: process.env.NEXT_PUBLIC_YEARLY_USER
                        }
                    ]
                    await Promise.all(
                        cleanup_object.map(async data => {
                            await delete_item(
                                data.folderName ? data.folderName : ''
                            )
                        })
                    )
                    return res
                        .status(200)
                        .json({ status: true, msg: 'success' })
                } else {
                    return res
                        .status(401)
                        .json({ status: false, msg: 'Unauthorized!' })
                }
            } else {
                return res
                    .status(401)
                    .json({ status: false, msg: 'Unauthorized!' })
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
