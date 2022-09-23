import { Box, Heading, Text, Button } from '@chakra-ui/react'
import Seo from '../Components/Seo'
import { useRouter } from 'next/router'

const Notfound = () => {
    const router = useRouter()
    return (
        <>
            <Seo title="0xShare - 404" url="/404" />
            <Box textAlign="center" py={44} px={6}>
                <Heading
                    display="inline-block"
                    as="h2"
                    size="2xl"
                    bgGradient="linear(to-r, pink.500, pink.300, blue.500)"
                    bgClip="text"
                >
                    404
                </Heading>
                <Text fontSize="18px" mt={3} mb={2}>
                    Page Not Found
                </Text>
                <Text color={'gray.500'} mb={6}>
                    The page you&apos;re looking for does not seem to exist
                </Text>

                <Button
                    colorScheme="teal"
                    bgGradient="linear(to-r, pink.500, pink.300, blue.500)"
                    color="white"
                    variant="solid"
                    onClick={() => router.push('/')}
                >
                    Go to Home
                </Button>
            </Box>
        </>
    )
}

export default Notfound
