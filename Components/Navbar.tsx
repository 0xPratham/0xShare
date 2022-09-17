import { IconButton, useColorMode, Flex, Avatar } from '@chakra-ui/react'
import { FaSun, FaMoon } from 'react-icons/fa'
import { GiVisoredHelm } from 'react-icons/gi'
import { RiVipCrown2Fill } from 'react-icons/ri'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import TooltipC from './Tooltip'
import { signInWithGoogle } from '../lib/auth'
import { useContext } from 'react'
import { UserContext } from '../lib/context'
import { useRouter } from 'next/router'

const navprofileStyle: object = {
    marginLeft: '10px',
    background: 'transparent'
}

const aStyle: object = {
    display: 'flex'
}

const Navbar: FC = () => {
    const router = useRouter()
    const { user } = useContext(UserContext)
    const { colorMode, toggleColorMode } = useColorMode()
    return (
        <Flex
            as="header"
            w="100%"
            padding={3}
            backgroundColor={'transparent'}
            justifyContent="space-between"
        >
            <Link href="/">
                <a style={aStyle}>
                    <Image
                        className="logo"
                        src="/logo.png"
                        alt="logo"
                        style={
                            colorMode === 'light'
                                ? { marginBottom: '-2px!important' }
                                : {
                                      marginBottom: '-2px!important',
                                      filter: 'invert(100%) sepia(0%) saturate(0%) hue-rotate(204deg) brightness(103%) contrast(102%)'
                                  }
                        }
                        width={160}
                        height={50}
                    />
                </a>
            </Link>

            <div id="links">
                <Link href="/vip">
                    <a style={aStyle}>
                        <TooltipC label="vip">
                            <IconButton
                                icon={<RiVipCrown2Fill />}
                                isRound={true}
                                size="lg"
                                alignSelf="end"
                                aria-label="Vip"
                                background="transparent"
                            />
                        </TooltipC>
                    </a>
                </Link>
                <IconButton
                    style={navprofileStyle}
                    icon={colorMode === 'light' ? <FaMoon /> : <FaSun />}
                    isRound={true}
                    size="lg"
                    alignSelf="end"
                    aria-label="ChangeThemeButton"
                    onClick={toggleColorMode}
                />
                {!user ? (
                    <TooltipC label="login">
                        <IconButton
                            style={navprofileStyle}
                            className="nav-profile"
                            icon={<GiVisoredHelm />}
                            isRound={true}
                            size="lg"
                            alignSelf="end"
                            aria-label="Login"
                            onClick={signInWithGoogle}
                        />
                    </TooltipC>
                ) : (
                    <Avatar
                        style={navprofileStyle}
                        className="nav-profile"
                        src={user?.photoURL ? user?.photoURL : ''}
                        onClick={() => router.push('/profile')}
                        cursor="pointer"
                    />
                )}
            </div>
        </Flex>
    )
}

export default Navbar
