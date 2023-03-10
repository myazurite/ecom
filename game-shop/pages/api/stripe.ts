import Stripe from 'stripe';

const stripe = require('stripe')(process.env.NEXT_PUBLIC_SRIPE_SECRET_KEY);

export default async function handler(req: { method: string; body: any[]; headers: { origin: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: any): void; new(): any; }; end: { (arg0: string): void; new(): any; }; }; setHeader: (arg0: string, arg1: string) => void; }) {
    console.log(process.env.NEXT_PUBLIC_SRIPE_SECRET_KEY)
    if (req.method === 'POST') {
        console.log('body: ' + typeof req.body)
        try {
            const params = {
                submit_type: 'pay',
                mode: 'payment',
                payment_method_types: ['card'],
                billing_address_collection: 'auto',
                shipping_options: [
                    {shipping_rate:'shr_1MLdRDKMfaIcyrbdyXHir4qg'},
                    {shipping_rate:'shr_1MLdRuKMfaIcyrbdWeCi9O3y'}
                ],
                line_items: req.body.map((item) => {
                    const img = item.image[0].asset._ref;
                    const newImage = img.replace('image-', 'https://cdn.sanity.io/images/jiviyszd/production/').replace('-webp', '.webp');
                    return {
                        price_data: {
                            currency: 'usd',
                            product_data: {
                                name: item.name,
                                images: [newImage],
                            },
                            unit_amount: item.price * 100,
                        },
                        adjustable_quantity: {
                            enabled: true,
                            minimum: 1,
                        },
                        quantity: item.quantity
                    }
                }),
                success_url: `${req.headers.origin}/success`,
                cancel_url: `${req.headers.origin}/canceled`,
            }
            // Create Checkout Sessions from body params.
            const session = await stripe.checkout.sessions.create(params);

            res.status(200).json(session);
        } catch (err) {
            // @ts-ignore
            res.status(err.statusCode || 500).json(err.message);
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}