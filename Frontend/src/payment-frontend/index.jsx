import React, { useState, useEffect, useRef } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe('your_public_stripe_api_key');

const Checkout = () => {
    const [clientSecret, setClientSecret] = useState("");
    const isFetched = useRef(false); 

    
    useEffect(() => {
        if (isFetched.current) return; 
        isFetched.current = true;

        fetch("http://localhost:8005/api/payments/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount: 5000, currency: "usd" }), 
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("Client Secret received:", data.clientSecret);
                setClientSecret(data.clientSecret);
            })
            .catch((error) => {
                console.error("Error fetching client secret:", error); 
            });
    }, []);

    const options = {
        clientSecret,
    };

    return clientSecret ? (
        <Elements stripe={stripePromise} options={options}>
            <CheckoutForm />
        </Elements>
    ) : (
        <div>Loading...</div>
    );
};

export default Checkout;
