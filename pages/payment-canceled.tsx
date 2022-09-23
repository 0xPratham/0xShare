import { Button, Box, Flex, Heading, Text } from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'
import { useRouter } from 'next/router'
import type { NextPage } from 'next'
import Seo from '../Components/Seo'

const PaymentCancel: NextPage = () => {
    const router = useRouter()
    return (
        <>
            <Seo title="0xShare - Payment Canceled" url="/payment-canceled" />
            <Box textAlign="center" py="44" px={6}>
                <Box display="inline-block">
                    <Flex
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                        bg={'red.500'}
                        rounded={'50px'}
                        w={'55px'}
                        h={'55px'}
                        textAlign="center"
                    >
                        <CloseIcon boxSize={'20px'} color={'white'} />
                    </Flex>
                </Box>
                <Heading
                    bgGradient="linear(to-r, pink.500, pink.300, blue.500)"
                    bgClip="text"
                    as="h2"
                    size="2xl"
                    mt={6}
                    mb={2}
                >
                    Payment unsuccessful
                </Heading>
                <Text color={'gray.500'}>
                    For some reason your payment could not be completed
                </Text>
                <Button
                    color="white"
                    bgGradient="linear(to-r, pink.500, pink.300, blue.500)"
                    variant="solid"
                    mt="6"
                    onClick={() => router.push('/')}
                >
                    Go to Home
                </Button>
                <Button
                    bgGradient="linear(to-r, pink.500, pink.300, blue.500)"
                    color="white"
                    variant="solid"
                    mt="6"
                    ml="4"
                    onClick={() => router.push('/vip')}
                >
                    Try Again
                </Button>
            </Box>
        </>
    )
}

export default PaymentCancel
