import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL
} from 'firebase/storage'
import { v4 as uuidv4 } from 'uuid'
import { Dispatch, SetStateAction } from 'react'

export const UploadFile = async (
    directory: string,
    uid: string | undefined,
    extension: string,
    setUploading: Dispatch<SetStateAction<boolean>>,
    file: File,
    setProgress: Dispatch<SetStateAction<number>>,
    setDownloadURL: Dispatch<SetStateAction<string>>
) => {
    try {
        const storageRef = ref(
            getStorage(),
            uid?.length && uid.length > 0
                ? `${directory}/${uid}/${
                      Date.now() + '___' + uuidv4()
                  }.${extension}`
                : `${directory}/${Date.now() + '___' + uuidv4()}.${extension}`
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
                    setDownloadURL(downloadURL)
                })
            }
        )
    } catch {
        return 'err'
    }
}
