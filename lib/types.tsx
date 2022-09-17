export interface userobject {
    accessToken: string
    auth: object
    displayName: string
    email: string
    emailVerified: boolean
    isAnonymous: boolean
    metadata: object
    phoneNumber: number | null
    photoURL: string | null
    proactiveRefresh: object
    providerId: string
    reloadListener: null
    reloadUserInfo: object
    stsTokenManager: object
    tenantId: string | null
    uid: string
    refreshToken: string
}

export interface profileCardprops {
    img: string | null | undefined
    heading: string | null | undefined
    sub_heading: string | undefined
    description: string | undefined
    active: boolean
    buttons: {
        title: string
        bg: string
        hoverColor: string
        link: any
    }[]
}
