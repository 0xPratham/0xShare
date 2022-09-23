import { createContext } from 'react'
import { userobject } from './types'

interface AppContextInterface {
    user: userobject | null | undefined
    plan: string | null
    active: boolean
}

export const UserContext = createContext<AppContextInterface>({
    user: null,
    plan: null,
    active: false
})
