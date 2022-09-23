import Stripe from 'stripe'
import { db } from '../lib/firebase-admin'
import type { NextApiRequest } from 'next'
import { buffer } from 'micro'

const stripe = new Stripe(
    process.env.STRIPE_SECRET_KEY ? process.env.STRIPE_SECRET_KEY : '',
    {
        apiVersion: '2022-08-01'
    }
)
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET

export async function getOrCreateCustomer(
    userId: string,
    params?: Stripe.CustomerCreateParams
) {
    try {
        const userSnapshot = await db.collection('users').doc(userId).get()
        const user_data = userSnapshot.data()
        const email = user_data?.email && user_data?.email
        const stripeCustomerId =
            user_data?.stripeCustomerId && user_data?.stripeCustomerId
        const plan = user_data?.plan && user_data?.plan
        const activePlan: boolean = user_data?.active && user_data?.active
        if (plan || activePlan) return 'Already Subscribed'
        if (!user_data?.stripeCustomerId) {
            if (!email) return 'Error'
            const customer = await stripe.customers.create({
                email,
                metadata: {
                    firebaseUID: userId
                },
                ...params
            })
            await userSnapshot.ref.update({ stripeCustomerId: customer.id })
            return customer
        } else {
            if (!stripeCustomerId) return 'Error'
            return (await stripe.customers.retrieve(
                stripeCustomerId
            )) as Stripe.Customer
        }
    } catch {
        return 'Error'
    }
}

export async function createSession(item_id: string, customer: string) {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            success_url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/payment-successfull`,
            cancel_url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/payment-canceled`,
            line_items: [{ price: item_id, quantity: 1 }],
            mode: 'subscription',
            allow_promotion_codes: true,
            customer
        })
        return session ? session : 'Error'
    } catch {
        return 'Error'
    }
}

export async function verifySignature(req: NextApiRequest) {
    try {
        const buf = await buffer(req)
        const sig = req.headers['stripe-signature']
        let event: Stripe.Event
        if (sig && endpointSecret) {
            event = stripe.webhooks.constructEvent(buf, sig, endpointSecret)
        } else {
            return { error: 'Error' }
        }
        return { event }
    } catch {
        return { error: 'Error' }
    }
}

export async function updateSubscription(plan: string, customer_id: string) {
    try {
        await db.collection('users').doc(customer_id).update({
            plan
        })
        return 'Success'
    } catch {
        return 'Error'
    }
}

export async function updateStatus(customer_id: string) {
    try {
        await db.collection('users').doc(customer_id).update({
            active: true
        })
        return 'Success'
    } catch {
        return 'Error'
    }
}

export async function deleteSubscription(customer_id: string) {
    try {
        await db.collection('users').doc(customer_id).update({
            plan: null,
            active: false
        })
        return 'Success'
    } catch {
        return 'Error'
    }
}

export async function getFirebaseUserID(customer_id: string) {
    try {
        const stripe_customer_object: Stripe.Customer | Stripe.DeletedCustomer =
            await stripe.customers.retrieve(customer_id)
        if (!stripe_customer_object.deleted) {
            return stripe_customer_object.metadata.firebaseUID
        }
    } catch {
        return 'error'
    }
}

export async function getInvoices(customer_id: string) {
    try {
        const invoices = await stripe.invoices.list({
            customer: customer_id,
            limit: 15
        })
        if (!invoices.has_more) {
            return 'no_more'
        }
        let filter_invoices = invoices.data.map(function (item) {
            return {
                id: item.id,
                amount_paid: item.amount_paid / 100,
                date: item.created,
                pdf: item.invoice_pdf
            }
        })
        return filter_invoices
    } catch {
        return 'error'
    }
}

export async function getUserData(userId: string) {
    try {
        const userSnapshot = await db.collection('users').doc(userId).get()
        const user_data = userSnapshot.data()
        if (user_data?.stripeCustomerId) {
            return user_data?.stripeCustomerId
        } else {
            return 'new_customer'
        }
    } catch {
        return 'error'
    }
}

export async function unsubscribe(customer_id: string, firebaseUID: string) {
    try {
        const customer: Stripe.Customer | Stripe.DeletedCustomer =
            await stripe.customers.retrieve(customer_id)
        if (customer.deleted !== true) {
            if (customer.metadata.firebaseUID !== firebaseUID) {
                return 'not authorized!'
            }
            const subscription = await stripe.subscriptions.list({
                customer: customer_id
            })
            if (subscription.data.length === 0) {
                return 'no subscription found'
            }
            if (subscription.data[0].id) {
                await stripe.subscriptions.update(subscription.data[0].id, {
                    cancel_at_period_end: true
                })
                return 'success'
            } else {
                return 'no subscription found'
            }
        } else {
            return 'customer deleted'
        }
    } catch {
        return 'Something wents wrong'
    }
}

export async function getSubscriptionExpireTime(customer_id: string) {
    try {
        const subscription = await stripe.subscriptions.list({
            customer: customer_id
        })
        if (subscription.data.length === 0) {
            return 'no subscription found'
        }
        if (subscription.data[0].current_period_end) {
            return {
                status: true,
                time: subscription.data[0].current_period_end
            }
        } else {
            return 'no subscription found'
        }
    } catch {
        return 'Something wents wrong'
    }
}
