import { FC, useState, useEffect } from 'react'
import { HStack, useClipboard, Input, Button, Heading } from '@chakra-ui/react'

interface props {
    downloadURL?: string | null
    reset?: () => void
}

const Copylink: FC<props> = props => {
    const [value, setValue] = useState(
        props.downloadURL ? props.downloadURL : ''
    )
    const { hasCopied, onCopy } = useClipboard(value)
    useEffect(() => {
        setValue(props.downloadURL ? props.downloadURL : '')
    }, [props.downloadURL])
    return (
        <>
            <HStack w="100%">
                <Input value={value} isReadOnly placeholder="Welcome" />
                <Button onClick={onCopy} ml={2}>
                    {hasCopied ? 'Copied' : 'Copy'}
                </Button>
            </HStack>
            <span style={{ fontSize: '13px' }}>
                file will only be valid for{' '}
                <b style={{ color: 'red' }}>30min</b>
            </span>
            <Heading size="sm" color="red.100">
                Upload more files?{' '}
                <b style={{ cursor: 'pointer' }} onClick={props.reset}>
                    click here
                </b>
            </Heading>
        </>
    )
}

export default Copylink
