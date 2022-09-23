import { Button, ButtonProps } from '@chakra-ui/react'

export const ActionButton = (props: ButtonProps) => (
    <Button
        as="button"
        colorScheme="blue"
        size="lg"
        w="full"
        fontWeight="extrabold"
        py={{ md: '8' }}
        {...props}
    />
)
