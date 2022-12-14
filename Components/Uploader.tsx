import { FC, useRef, useState, ChangeEvent, useContext } from 'react'
import { VStack, Button } from '@chakra-ui/react'
import { AiFillFileAdd } from 'react-icons/ai'
import Progressbar from './ProgressBar'
import Copylink from './Copylink'
import { UserContext } from '../lib/context'
import { UploadFile } from '../lib/UploadFile'
import { useToast } from '@chakra-ui/react'
import getLimit from '../helpers/filesizelimit'
import getDirectoryName from '../helpers/getdirectoryname'
import getExtension from '../helpers/getExtension'

const Uploader: FC = () => {
    const toast = useToast()
    const { user, plan, active } = useContext(UserContext)
    const inputFile = useRef<HTMLInputElement | null>(null)
    const uploadTrigger = () => {
        inputFile?.current?.click()
    }
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
            const extension = getExtension(file.name)
            const file_size = file.size / 1024 / 1024
            if (user?.uid && !plan && !active) {
                if (file_size > 100) {
                    show_toast('File upload failed.', 'File size is too large.')
                    e.target.value = ''
                    return
                }
                const res = await UploadFile(
                    process.env.NEXT_PUBLIC_LOGIN_USER
                        ? process.env.NEXT_PUBLIC_LOGIN_USER
                        : '',
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
                e.target.value = ''
                return
            } else if (user?.uid && plan && active) {
                if (file_size > Number(getLimit(plan))) {
                    show_toast('File upload failed.', 'File size is too large.')
                    e.target.value = ''
                    return
                }
                const res = await UploadFile(
                    getDirectoryName(plan),
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
                e.target.value = ''
                return
            } else {
                if (file_size > 70) {
                    show_toast('File upload failed.', 'File size is too large.')
                    e.target.value = ''
                    return
                }
                const res = await UploadFile(
                    process.env.NEXT_PUBLIC_ANONYMOUS_USER
                        ? process.env.NEXT_PUBLIC_ANONYMOUS_USER
                        : '',
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
                e.target.value = ''
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
                        {user &&
                            !plan &&
                            !active &&
                            'Max file size 100MB. Buy subscription for more'}
                        {!user && 'Max file size 70MB. Sign Up for more'}
                        {user &&
                            plan &&
                            active &&
                            `Max file size ${getLimit(plan)}MB`}
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
