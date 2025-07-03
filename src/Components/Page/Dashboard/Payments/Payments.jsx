import { Elements } from '@stripe/react-stripe-js';
import React from 'react';
import ChackOutRorm from './ChackOutRorm';
import { loadStripe } from '@stripe/stripe-js';

const Payments = () => {
    const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_KEY);
    return (
        <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg text-center">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Are you ready to pay?
            </h2>
            <Elements stripe={stripePromise}>
                <div className="mt-6">
                    <ChackOutRorm />
                </div>
            </Elements>
        </div>
    );
};

export default Payments;
