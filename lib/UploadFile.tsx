import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL
} from 'firebase/storage'
import { v4 as uuidv4 } from 'uuid'
import { Dispatch, SetStateAction } from 'react'
import { fetchFromAPI } from '../helpers/fetchfromapi'

export const UploadFile = async (
    directory: string | undefined,
    extension: string,
    setUploading: Dispatch<SetStateAction<boolean>>,
    file: File,
    setProgress: Dispatch<SetStateAction<number>>,
    setDownloadURL: Dispatch<SetStateAction<string>>
) => {
    try {
        const storageRef = ref(
            getStorage(),
            `${directory}/${Date.now() + '___' + uuidv4()}.${extension}`
        )
        setUploading(true)
        const uploadTask = uploadBytesResumable(storageRef, file)
        uploadTask.on(
            'state_changed',
            snapshot => {
                const current_progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                setProgress(current_progress)
            },
            error => {
                console.log(error)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
                    fetchFromAPI('api/shorten', 'POST', {
                        url: downloadURL
                    }).then(res => {
                        if (res.status) {
                            setDownloadURL(res.url)
                        } else {
                            setDownloadURL(downloadURL)
                        }
                    })
                })
            }
        )
    } catch {
        return 'err'
    }
}
