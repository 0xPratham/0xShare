import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class CustomDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <link
                        rel="icon"
                        type="image/svg+xml"
                        href="/favicon/favicon.svg"
                    />
                    <link
                        rel="icon"
                        type="image/png"
                        href="/favicon/favicon.png"
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}
