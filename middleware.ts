import { NextRequest, NextResponse } from 'next/server'
import { getURl } from './lib/redis'

export const config = {
    matcher: ['/s/:shortid*']
}

export async function middleware(req: NextRequest) {
    try {
        const urlObj = new URL(req.url)
        const shortID = urlObj.pathname.split('/')[2]
        const url = await getURl(shortID)
        if (url) {
            return NextResponse.redirect(url)
        }
        return
    } catch {
        return
    }
}
