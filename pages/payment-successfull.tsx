import { Box, Heading, Text, Button } from '@chakra-ui/react'
import { CheckCircleIcon } from '@chakra-ui/icons'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Seo from '../Components/Seo'

const PaymentSuccessfull: NextPage = () => {
    const router = useRouter()
    return (
        <>
            <Seo
                title="0xShare - Payment Successfull"
                url="/payment-successfull"
            />
            <Box textAlign="center" py="44" px={6}>
                <CheckCircleIcon boxSize={'50px'} color={'green.500'} />
                <Heading
                    bgGradient="linear(to-r, pink.500, pink.300, blue.500)"
                    bgClip="text"
                    as="h2"
                    size="xl"
                    mt={6}
                    mb={2}
                >
                    Payment Successfull
                </Heading>
                <Text color={'gray.500'}>Thank you for supporting us.</Text>

                <Button
                    bgGradient="linear(to-r, pink.500, pink.300, blue.500)"
                    color="white"
                    variant="solid"
                    mt="6"
                    onClick={() => router.push('/')}
                >
                    Go to Home
                </Button>
            </Box>
        </>
    )
}

export default PaymentSuccessfull
