import { ReactNode } from 'react'
import { Tooltip } from '@chakra-ui/react'

interface props {
    children?: ReactNode | undefined
    label?: string
}

const TooltipC = (props: props) => {
    return (
        <Tooltip hasArrow label={props?.label} bg="gray.300" color="black">
            {props.children}
        </Tooltip>
    )
}
export default TooltipC
