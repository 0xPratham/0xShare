import { extendTheme } from '@chakra-ui/react'

const theme = {
    config: {
        intialColorMode: 'dark',
        useSystemColorMode: true,
        disableTransitionOnChange: false
    },
    styles: {
        global: {
            body: {
                margin: 0,
                WebKitFontSmoothing: 'antialiased',
                MozOsxFontSmoothing: 'grayscale',
                transitionProperty: 'all',
                transitionDuration: '.5s',
                fontFamily: 'sofiapro-light'
            }
        }
    }
}

export default extendTheme(theme)
