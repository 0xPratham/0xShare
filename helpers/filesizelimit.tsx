export default function getLimit(current_plan: string) {
    switch (current_plan) {
        case 'yearly':
            return '300'
        case 'quarterly':
            return '200'
        case 'monthly':
            return '150'
    }
}
