import { CardCvcElement, CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import useAxios from '../../../../hooks/useAxios';
import useCarts from '../../../../hooks/useCarts';
import useAuthContext from '../../../hooks/useAuthContext';
import Swal from 'sweetalert2';

const ChackOutRorm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxios();
    const [cart] = useCarts();
    const { user } = useAuthContext()
    console.log(user)
    const totalPrice = cart.reduce((total, item) => total + item.price, 0)
    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        axiosSecure.post('/create-checkout-session', { price: totalPrice })
            .then(res => {
                console.log(res.data.clientSecret)
                setClientSecret(res.data.clientSecret)
            })
    }, [axiosSecure, totalPrice])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return
        }
        const card = elements.getElement(CardElement);
        if (card == null) {
            return
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        })
        if (error) {
            console.log('[error]', error);
        } else {
            console.log('[PaymentMethod]', paymentMethod);
        }
        // confirm card payment
        const { paymentIntent, error: cardconfirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email,
                    name: user?.displayName
                },
            },
        })
        if (cardconfirmError) {
            console.log('error massage....')
        }
        else {
            console.log('successfully....')
            if (paymentIntent.status === 'succeeded') {
                Swal.fire({
                    icon: 'success',
                    title: 'Payment Succeeded!',
                    text: `Your transaction was successful. Id Number ${paymentIntent.id}`,
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK'
                });
                const payment = {
                    email : user.email,
                    price : totalPrice,
                    transactionId : paymentIntent.id,
                    date : new Date(),
                    cardId : cart.map(item => item._id),
                    menuId : cart.map(item => item.menuId),
                    status : 'pending'
                }
               const res = await axiosSecure.post('/payments', payment);
               console.log( "payment seve", res.data)
            }
        }
    }
    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
            <div className="p-4 border rounded-md shadow-sm bg-gray-50">
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                    className="p-3 border rounded-md bg-white"
                />
            </div>
            <button
                type="submit"
                disabled={!stripe || !clientSecret}
                className="mt-4 w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition disabled:bg-gray-400"
            >
                Pay
            </button>
        </form>

    );
};

export default ChackOutRorm;