import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import theme from '../lib/theme'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import { UserContext } from '../lib/context'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../lib/firebase'

function MyApp({ Component, pageProps }: AppProps) {
    const [user]: any = useAuthState(auth)
    return (
        <>
            <ChakraProvider theme={theme}>
                <ColorModeScript
                    initialColorMode={theme?.config?.initialColorMode}
                />
                <UserContext.Provider value={{ user }}>
                    <Navbar />
                    <Component {...pageProps} />
                    <Footer />
                </UserContext.Provider>
            </ChakraProvider>
        </>
    )
}

export default MyApp
