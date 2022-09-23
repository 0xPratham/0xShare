import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import theme from '../lib/theme'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import { UserContext } from '../lib/context'
import { Elements } from '@stripe/react-stripe-js'
import { GetUserData } from '../lib/hooks'

function MyApp({ Component, pageProps }: AppProps) {
    const userData = GetUserData()
    return (
        <Elements stripe={userData.stripePromise}>
            <ChakraProvider theme={theme}>
                <ColorModeScript
                    initialColorMode={theme?.config?.initialColorMode}
                />
                <UserContext.Provider value={userData}>
                    <Navbar />
                    <Component {...pageProps} />
                    <Footer />
                </UserContext.Provider>
            </ChakraProvider>
        </Elements>
    )
}

export default MyApp
