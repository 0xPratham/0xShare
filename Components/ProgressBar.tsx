import { FC, useEffect, useState } from 'react'
import { Progress } from '@chakra-ui/react'

interface props {
    progress?: number
}

const Progressbar: FC<props> = props => {
    const [progress, setProgress] = useState<number>(
        props.progress ? props.progress : 0
    )
    useEffect(() => {
        setProgress(props.progress ? props.progress : 0)
    }, [props.progress])
    return (
        <Progress
            hasStripe
            value={progress}
            isAnimated
            max={100}
            min={0}
            width="100%"
            colorScheme="pink"
        />
    )
}
export default Progressbar
