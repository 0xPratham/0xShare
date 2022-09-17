import { FC } from 'react'
import {
    ButtonGroup,
    Container,
    IconButton,
    Stack,
    Text,
    Divider,
    Button
} from '@chakra-ui/react'
import { FaHeartbeat, FaGithub, FaStackOverflow } from 'react-icons/fa'
import { TbBrandNextjs } from 'react-icons/tb'
import { SiChakraui, SiFirebase } from 'react-icons/si'
import Image from 'next/image'
import { useColorMode } from '@chakra-ui/react'
import Link from 'next/link'

const Footer: FC = () => {
    const { colorMode } = useColorMode()
    return (
        <Container
            as="footer"
            role="contentinfo"
            py={{ base: '12', md: '16' }}
            maxW="70%"
        >
            <Divider variant="dashed" mb="7" />
            <Stack spacing={{ base: '4', md: '5' }}>
                <Stack justify="space-between" direction="row" align="center">
                    <Image
                        alt="logo"
                        src="/logo.png"
                        height="50"
                        width="160"
                        style={
                            colorMode === 'dark'
                                ? {
                                      filter: 'invert(100%) sepia(0%) saturate(0%) hue-rotate(204deg) brightness(103%) contrast(102%)'
                                  }
                                : {}
                        }
                    />
                    <ButtonGroup variant="ghost">
                        <IconButton
                            as="a"
                            href="https://github.com/0xPratham"
                            target="_blank"
                            aria-label="GitHub"
                            icon={<FaGithub fontSize="1.25rem" />}
                        />
                        <IconButton
                            as="a"
                            href="https://stackoverflow.com/users/19824962/pratham"
                            target="_blank"
                            aria-label="Twitter"
                            icon={<FaStackOverflow fontSize="1.25rem" />}
                        />
                    </ButtonGroup>
                </Stack>
                <Stack justify="space-between" direction="row" align="center">
                    <Text fontSize="sm" color="subtle">
                        &copy; {new Date().getFullYear()} 0xShare, Inc. All
                        rights reserved.
                        <br />
                        <Link href="/terms">
                            <Button variant="link" size="xs">
                                Terms & Conditions
                            </Button>
                        </Link>{' '}
                        |{' '}
                        <Link href="/privacy">
                            <Button variant="link" size="xs">
                                Privacy Policy
                            </Button>
                        </Link>
                    </Text>
                    <Text fontSize="sm" color="subtle" display="flex">
                        Created with &nbsp;
                        <FaHeartbeat color="red" size={18} />
                        &nbsp; and &nbsp;
                        <TbBrandNextjs
                            color="white"
                            size={18}
                            style={{ background: 'black', borderRadius: '50%' }}
                        />
                        &nbsp;
                        <SiFirebase size={18} color="#ffc24a" />
                        &nbsp;
                        <SiChakraui color="#4FD1C5" size={18} />
                    </Text>
                </Stack>
            </Stack>
        </Container>
    )
}

export default Footer
