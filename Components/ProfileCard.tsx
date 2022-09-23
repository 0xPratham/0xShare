import {
    Heading,
    Avatar,
    Box,
    Text,
    Stack,
    Button,
    useColorModeValue
} from '@chakra-ui/react'
import { profileCardprops } from '../lib/types'
import { FC } from 'react'

const ProfileCard: FC<profileCardprops> = props => {
    const bgColor = useColorModeValue('white', 'gray.900')
    const textColor = useColorModeValue('gray.700', 'gray.400')
    return (
        <Box
            maxW={'320px'}
            w={'full'}
            bg={bgColor}
            boxShadow={'2xl'}
            rounded={'lg'}
            p={6}
            textAlign={'center'}
        >
            <Avatar
                background="transparent"
                size="xl"
                src={props.img ? props.img : ''}
                mb={4}
                pos="relative"
                _after={
                    props.active
                        ? {
                              content: '""',
                              w: 4,
                              h: 4,
                              bg: 'green.300',
                              border: '2px solid white',
                              rounded: 'full',
                              pos: 'absolute',
                              bottom: 0,
                              right: 3
                          }
                        : {}
                }
            />
            <Heading fontSize={'2xl'} fontFamily={'body'}>
                {props.heading}
            </Heading>
            <Text fontWeight={600} color={'gray.500'} mb={4}>
                {props.sub_heading}
            </Text>
            {props?.description && (
                <Text textAlign={'center'} color={textColor} px={3}>
                    {props.description}&nbsp;
                    {props.plan ? (
                        <b style={{ fontWeight: 'bolder' }}>
                            {props.plan.charAt(0).toUpperCase() +
                                props.plan.slice(1)}
                        </b>
                    ) : (
                        'Free'
                    )}
                </Text>
            )}
            <Stack mt={8} direction={'row'} spacing={4}>
                {props.buttons.map((button, keys) => {
                    return (
                        <Button
                            key={keys}
                            flex={1}
                            fontSize={'sm'}
                            rounded={'full'}
                            bg={button.bg}
                            color={'white'}
                            _hover={{
                                bg: button.hoverColor
                            }}
                            _focus={{
                                bg: button.hoverColor
                            }}
                            onClick={button.link}
                        >
                            {button.title}
                        </Button>
                    )
                })}
            </Stack>
        </Box>
    )
}

export default ProfileCard
