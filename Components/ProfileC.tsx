import { Box, SimpleGrid, useColorModeValue } from '@chakra-ui/react'
import { useContext, useState, useEffect } from 'react'
import { UserContext } from '../lib/context'
import { signOut } from '../lib/auth'
import { FC } from 'react'
import ProfileCard from './ProfileCard'
import { useRouter } from 'next/router'
import AuthCheck from './AuthCheck'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button
} from '@chakra-ui/react'
import { fetchFromAPI } from '../helpers/fetchfromapi'
import { useToast } from '@chakra-ui/react'

const Profile: FC = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [expiretime, setExpireTime] = useState<number | undefined>()
    const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { user, plan, active } = useContext(UserContext)
    const router = useRouter()

    const show_toast = (
        title: string,
        description?: string,
        varient?: boolean
    ) => {
        return toast({
            title,
            description,
            status: varient ? 'success' : 'error',
            duration: 6000,
            isClosable: true
        })
    }

    useEffect(() => {
        if (user) {
            fetchFromAPI('/api/expire', 'POST').then(res => {
                if (res.status) {
                    setExpireTime(res.msg)
                }
            })
        }
        return
    }, [user])

    const unsubscribe_customer = async () => {
        setLoading(true)
        const data = await fetchFromAPI('/api/unsubscribe', 'POST')
        if (data.status) {
            setLoading(false)
            return show_toast('Success', data?.msg, data.status)
        } else {
            setLoading(false)
            return show_toast('Error', data?.msg, data.status)
        }
    }

    const data = [
        {
            img: user?.photoURL,
            heading: user?.displayName,
            sub_heading: user?.email,
            description: `Current membership status is`,
            active: true,
            button: [
                {
                    title: 'Logout',
                    bg: 'red.500',
                    hoverColor: 'red.300',
                    link: signOut
                }
            ]
        },
        {
            img: '/vip.png',
            heading: 'VIP',
            sub_heading: `${
                plan && active
                    ? expiretime &&
                      `Expired on ${new Date(expiretime * 1000).toDateString()}`
                    : 'Become A Vip User'
            }`,
            description: 'Manage Membership',
            active: false,
            button: [
                {
                    title: 'Invoice History',
                    bg: 'blue.500',
                    hoverColor: 'blue.300',
                    link: () => {
                        router.push('/invoices')
                    }
                },
                {
                    title: `${
                        plan && active ? 'Unsubscribe' : 'Buy Subscription'
                    }`,
                    bg: `${plan && active ? 'red.500' : 'green.500'}`,
                    hoverColor: `${plan && active ? 'red.300' : 'green.300'}`,
                    link: () => {
                        plan && active ? onOpen() : router.push('/vip')
                    }
                }
            ]
        }
    ]
    return (
        <AuthCheck>
            <Box
                as="section"
                bg={useColorModeValue('gray.50', 'gray.800')}
                py="14"
                px={{ base: '4', md: '8' }}
                mt="9"
            >
                <SimpleGrid
                    columns={{ base: 1, lg: 2 }}
                    spacing={{ base: '8', lg: '0' }}
                    maxW="4xl"
                    mx="auto"
                    justifyItems="center"
                    alignItems="center"
                >
                    {data.map((profile, keys) => {
                        return (
                            <ProfileCard
                                plan={plan && active ? plan : null}
                                key={keys}
                                img={profile?.img}
                                heading={profile?.heading}
                                sub_heading={profile?.sub_heading}
                                description={profile?.description}
                                active={profile?.active}
                                buttons={profile.button.map(prop => {
                                    return {
                                        title: prop.title,
                                        bg: prop.bg,
                                        hoverColor: prop.hoverColor,
                                        link: prop.link
                                    }
                                })}
                            />
                        )
                    })}
                </SimpleGrid>
            </Box>
            {plan && active && (
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Warning!</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <p>
                                After you unsubscribe the plan, your plan will
                                expire at the end of the period and at that
                                time, you can&apos;t buy another plan and your
                                card doesn&apos;t get charged at the end of the
                                period.
                            </p>
                        </ModalBody>

                        <ModalFooter>
                            <Button
                                colorScheme="red"
                                mr={3}
                                onClick={unsubscribe_customer}
                                isLoading={loading}
                            >
                                Unsubscribe
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            )}
        </AuthCheck>
    )
}

export default Profile
