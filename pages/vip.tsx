import { Box, SimpleGrid, useColorModeValue } from '@chakra-ui/react'
import { SiHive, SiMarketo, SiMicrosoft } from 'react-icons/si'
import { ActionButton } from '../Components/ActionButton'
import { PricingCard } from '../Components/PricingCard'
import type { NextPage } from 'next'
import { useState, ChangeEvent, MouseEventHandler } from 'react'
import { fetchFromAPI } from '../helpers/fetchfromapi'
import { useStripe } from '@stripe/react-stripe-js'
import { useToast } from '@chakra-ui/react'
import Seo from '../Components/Seo'

const Pro: NextPage = () => {
    const [loading, setLoading] = useState('')
    const toast = useToast()
    const stripe = useStripe()
    const show_toast = (title: string, description?: string) => {
        return toast({
            title,
            description,
            status: 'error',
            duration: 5000,
            isClosable: true
        })
    }
    const checkout = async (e: ChangeEvent<HTMLInputElement>) => {
        setLoading(e.target.id)
        const plan = e.target.id
        const {
            session: sessionId,
            msg,
            status
        } = await fetchFromAPI('/api/create_session', 'POST', {
            plan
        })
        if (msg !== '' && !status) {
            setLoading('')
            return show_toast('Error', msg)
        }
        if (stripe && sessionId) {
            const { error } = await stripe.redirectToCheckout({
                sessionId
            })
            if (error) {
                setLoading('')
                return show_toast('Error', error?.message)
            }
        } else {
            setLoading('')
            return
        }
    }
    return (
        <>
            <Seo title="0xShare - VIP" url="/vip" />
            <Box
                as="section"
                bg={useColorModeValue('gray.50', 'gray.800')}
                py="14"
                px={{ base: '4', md: '8' }}
                mt="9"
            >
                <SimpleGrid
                    columns={{ base: 1, lg: 3 }}
                    spacing={{ base: '8', lg: '0' }}
                    maxW="7xl"
                    mx="auto"
                    justifyItems="center"
                    alignItems="center"
                >
                    <PricingCard
                        data={{
                            price: '₹49',
                            per: 'mo',
                            name: 'Monthly',
                            features: [
                                '150MB file uplaod limit',
                                'Upload any file type',
                                'Your subscription helps cover server costs'
                            ]
                        }}
                        icon={SiMicrosoft}
                        button={
                            <ActionButton
                                variant="outline"
                                borderWidth="2px"
                                id="MONTHLY"
                                onClick={
                                    checkout as unknown as MouseEventHandler<HTMLButtonElement>
                                }
                                isLoading={loading === 'MONTHLY'}
                            >
                                Buy now
                            </ActionButton>
                        }
                    />
                    <PricingCard
                        zIndex={1}
                        isPopular
                        transform={{ lg: 'scale(1.05)' }}
                        data={{
                            price: '₹199',
                            per: 'yr',
                            name: 'Yearly',
                            features: [
                                '300MB file upload limit',
                                'Upload any file type',
                                'Your subscription helps cover server costs'
                            ]
                        }}
                        icon={SiMarketo}
                        button={
                            <ActionButton
                                id="YEARLY"
                                onClick={
                                    checkout as unknown as MouseEventHandler<HTMLButtonElement>
                                }
                                isLoading={loading === 'YEARLY'}
                            >
                                Buy now
                            </ActionButton>
                        }
                    />
                    <PricingCard
                        data={{
                            price: '₹149',
                            per: '3mo',
                            name: 'Quarterly',
                            features: [
                                '200MB file upload limit',
                                'Upload any file type',
                                'Your subscription helps cover server costs'
                            ]
                        }}
                        icon={SiHive}
                        button={
                            <ActionButton
                                id="QUARTERLY"
                                onClick={
                                    checkout as unknown as MouseEventHandler<HTMLButtonElement>
                                }
                                variant="outline"
                                borderWidth="2px"
                                isLoading={loading === 'QUARTERLY'}
                            >
                                Buy now
                            </ActionButton>
                        }
                    />
                </SimpleGrid>
            </Box>
        </>
    )
}

export default Pro
