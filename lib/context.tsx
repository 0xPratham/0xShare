import { createContext } from 'react'
import { userobject } from './types'

interface AppContextInterface {
    user: userobject | null | undefined
}

export const UserContext = createContext<AppContextInterface>({
    user: null
})
