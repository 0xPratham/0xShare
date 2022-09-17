import { Box, SimpleGrid, useColorModeValue } from '@chakra-ui/react'
import { useContext } from 'react'
import { UserContext } from '../lib/context'
import { signOut } from '../lib/auth'
import { FC } from 'react'
import ProfileCard from './ProfileCard'
import { useRouter } from 'next/router'
import AuthCheck from './AuthCheck'

const Profile: FC = () => {
    const { user } = useContext(UserContext)
    const router = useRouter()
    const data = [
        {
            img: user?.photoURL,
            heading: user?.displayName,
            sub_heading: user?.email,
            description: 'Current membership status is free',
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
            sub_heading: 'Become A Vip User',
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
                    title: 'Subscription',
                    bg: 'green.500',
                    hoverColor: 'green.300',
                    link: () => {
                        router.push('/subscription')
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
        </AuthCheck>
    )
}

export default Profile
