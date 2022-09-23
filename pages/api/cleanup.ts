import type { NextApiRequest, NextApiResponse } from 'next'
import {
    getStorage,
    ref,
    listAll,
    deleteObject,
    StorageReference
} from 'firebase/storage'

const delete_item = async (storageref: StorageReference) => {
    try {
        await listAll(storageref)
            .then(result => {
                result.items.length > 0 &&
                    result.items.forEach(file => {
                        deleteObject(file)
                    })
            })
            .catch(err => {
                console.log(err)
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
                            ref: ref(
                                getStorage(),
                                process.env.NEXT_PUBLIC_ANONYMOUS_USER
                            )
                        },
                        {
                            id: 2,
                            ref: ref(
                                getStorage(),
                                process.env.NEXT_PUBLIC_LOGIN_USER
                            )
                        },
                        {
                            id: 3,
                            ref: ref(
                                getStorage(),
                                process.env.NEXT_PUBLIC_MONTHLY_USER
                            )
                        },
                        {
                            id: 4,
                            ref: ref(
                                getStorage(),
                                process.env.NEXT_PUBLIC_QUARTERLY_USER
                            )
                        },
                        {
                            id: 5,
                            ref: ref(
                                getStorage(),
                                process.env.NEXT_PUBLIC_YEARLY_USER
                            )
                        }
                    ]
                    await Promise.all(
                        cleanup_object.map(async data => {
                            await delete_item(data.ref)
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
