import Head from 'next/head'
import { seo } from '../lib/types'

const Seo = (props: seo) => {
    return (
        <>
            <Head>
                <meta
                    property="og:title"
                    content="Share your files with one click"
                />
                <meta property="og:locale" content="en_US" />
                <meta
                    name="description"
                    content="share your files anonymously and we don't store logs of your files and they are deleted on the server after 30 minutes of uploading."
                />
                <meta
                    property="og:description"
                    content="share your files anonymously and we don't store logs of your files and they are deleted on the server after 30 minutes of uploading."
                />
                <link
                    rel="canonical"
                    href={`${process.env.NEXT_PUBLIC_WEBSITE_URL}${props.url}`}
                />
                <meta
                    property="og:url"
                    content={`${process.env.NEXT_PUBLIC_WEBSITE_URL}${props.url}`}
                />
                <meta property="og:site_name" content="0xShare" />
                <title>{props.title}</title>
                <meta
                    name="apple-mobile-web-app-title"
                    content="0xShare Blog"
                />
                <meta name="application-name" content="0xShare Blog" />
            </Head>
        </>
    )
}

export default Seo
