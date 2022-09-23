import type { NextPage } from 'next'
import { VStack, Heading } from '@chakra-ui/react'
import Uploader from '../Components/Uploader'
import Seo from '../Components/Seo'

const Home: NextPage = () => {
    return (
        <>
            <Seo title="0xShare" url="" />
            <VStack as="main" mt={55}>
                <Heading
                    mb="8"
                    fontWeight="extrabold"
                    size="3xl"
                    bgGradient="linear(to-r, pink.500, pink.300, blue.500)"
                    bgClip="text"
                >
                    0xShare
                </Heading>
                <Heading as="h6" style={{ marginTop: '-1.5rem' }} size="xs">
                    Share your files with one click
                </Heading>
                <Uploader />
            </VStack>
        </>
    )
}

export default Home
