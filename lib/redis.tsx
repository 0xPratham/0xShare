import { Redis } from '@upstash/redis'
import { nanoid } from 'nanoid'

const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL || '',
    token: process.env.UPSTASH_REDIS_REST_TOKEN || ''
})

export async function setURL(url: string): Promise<string | boolean> {
    try {
        const shortID = nanoid(8).toLowerCase()
        await redis.set(shortID, url, { ex: 1800 })
        const shortURL = `${process.env.NEXT_PUBLIC_WEBSITE_URL}/s/${shortID}`
        return shortURL
    } catch (e) {
        return false
    }
}

export async function getURl(shortID: string): Promise<string | null> {
    try {
        const response: string | null = await redis.get(shortID)
        return response
    } catch (e) {
        return null
    }
}
