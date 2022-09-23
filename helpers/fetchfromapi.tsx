import { auth } from '../lib/firebase'

export async function fetchFromAPI(
    endpointURL: string,
    method: string,
    body?: object
) {
    const user = auth.currentUser
    const token = user && (await user.getIdToken())

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_WEBSITE_URL}/${endpointURL}`,
        {
            method,
            body: JSON?.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }
    )

    return res.json()
}
