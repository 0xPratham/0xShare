import { FC, useRef, useState, ChangeEvent, useContext } from 'react'
import { VStack, Button } from '@chakra-ui/react'
import { AiFillFileAdd } from 'react-icons/ai'
import { useColorMode } from '@chakra-ui/react'
import Progressbar from './ProgressBar'
import Copylink from './Copylink'
import { UserContext } from '../lib/context'
import { UploadFile } from '../lib/UploadFile'
import { useToast } from '@chakra-ui/react'

const Uploader: FC = () => {
    const toast = useToast()
    const { user } = useContext(UserContext)
    const inputFile = useRef<HTMLInputElement | null>(null)
    const uploadTrigger = () => {
        inputFile?.current?.click()
    }
    const { colorMode } = useColorMode()
    const [uploading, setuploading] = useState<boolean>(false)
    const [progress, setProgress] = useState<number>(0)
    const [downloadURL, setDownloadURL] = useState<string>('')

    const reset = () => {
        setuploading(false)
        setProgress(0)
        setDownloadURL('')
    }

    const show_toast = (title: string, description: string) => {
        return toast({
            title,
            description,
            status: 'error',
            duration: 4000,
            isClosable: true
        })
    }

    const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
        try {
            if (!e.target.files) return
            const file = e.target.files[0]
            const extension = file.type.split('/')[1]
            const file_size = file.size / 1024 / 1024
            if (user?.uid) {
                if (file_size > 100) return
                const res = await UploadFile(
                    process.env.NEXT_PUBLIC_LOGIN_USER
                        ? process.env.NEXT_PUBLIC_LOGIN_USER
                        : '',
                    user.uid,
                    extension,
                    setuploading,
                    file,
                    setProgress,
                    setDownloadURL
                )
                if (res === 'err') {
                    show_toast(
                        'File upload failed.',
                        'Something went wrong, try again later.'
                    )
                }
                return
            } else {
                if (file_size > 70) {
                    show_toast('File upload failed.', 'File size is too large.')
                    return
                }
                const res = await UploadFile(
                    process.env.NEXT_PUBLIC_ANONYMOUS_USER
                        ? process.env.NEXT_PUBLIC_ANONYMOUS_USER
                        : '',
                    '',
                    extension,
                    setuploading,
                    file,
                    setProgress,
                    setDownloadURL
                )
                if (res === 'err') {
                    show_toast(
                        'File upload failed.',
                        'Something went wrong, try again later.'
                    )
                }
                return
            }
        } catch (e) {
            show_toast(
                'File upload failed.',
                'Something went wrong, try again later.'
            )
            return
        }
    }

    return (
        <VStack
            borderColor="gray.100"
            borderWidth="2px"
            p="4"
            borderRadius="lg"
            w="100%"
            maxW={{ base: '90vw', sm: '80vw', lg: '50vw', xl: '40vw' }}
            style={
                !uploading
                    ? { marginTop: '3rem', height: '19rem' }
                    : { marginTop: '3rem', height: 'auto' }
            }
            bgColor={'transparent'}
        >
            {!uploading ? (
                <VStack h="100%" justifyContent="center">
                    <input
                        type="file"
                        id="file"
                        ref={inputFile}
                        style={{ display: 'none' }}
                        onChange={handleChange}
                    />
                    <Button
                        bgGradient="linear(to-r, pink.500, pink.300, blue.500)"
                        onClick={uploadTrigger}
                    >
                        <AiFillFileAdd size={25} />
                        &nbsp;Choose Files
                    </Button>
                    <p>
                        {user
                            ? 'Max file size 100MB. Buy subscription for more'
                            : 'Max file size 70MB. Sign Up for more'}
                    </p>
                </VStack>
            ) : (
                ''
            )}
            {uploading && downloadURL.length === 0 ? (
                <Progressbar progress={progress} />
            ) : (
                ''
            )}
            {downloadURL.length > 0 ? (
                <Copylink downloadURL={downloadURL} reset={reset} />
            ) : (
                ''
            )}
        </VStack>
    )
}
export default Uploader
