import { useContext } from 'react'
import { UserContext } from '../lib/context'
import { ReactNode } from 'react'
import Link from 'next/link'
import { FC } from 'react'
import { VStack } from '@chakra-ui/react'

interface props {
    children?: ReactNode | undefined
    fallback?: JSX.Element | any
}

const AuthCheck: FC<props> = props => {
    const { user } = useContext(UserContext)
    return user
        ? props?.children
        : props?.fallback || (
              <VStack mt={40} mb={40}>
                  <Link href="/">You must be signed in</Link>
              </VStack>
          )
}

export default AuthCheck
