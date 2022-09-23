export default function getDirectoryName(current_plan: string) {
    switch (current_plan) {
        case 'yearly':
            return process.env.NEXT_PUBLIC_YEARLY_USER
        case 'quarterly':
            return process.env.NEXT_PUBLIC_QUARTERLY_USER
        case 'monthly':
            return process.env.NEXT_PUBLIC_MONTHLY_USER
    }
}
