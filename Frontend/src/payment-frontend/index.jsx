import React, { useState, useEffect, useRef } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe('pk_test_51Qg8EpKD44DTCNGUGEvR5q7FRSWV00VP78Hek0KRZvnupim45MjNXjVDXk5RJ8ElGmDRzAGc2NQah122Naz1ZvJ600EUcRB7nP'); // Replace with your Stripe Publishable Key

const Checkout = () => {
    const [clientSecret, setClientSecret] = useState("");
    const isFetched = useRef(false); // Persistent reference to track if the API has been called

    // Fetch clientSecret from the backend
    useEffect(() => {
        if (isFetched.current) return; // Prevent duplicate fetches
        isFetched.current = true;

        fetch("http://localhost:8005/api/payments/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount: 5000, currency: "usd" }), // Example amount ($50)
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("Client Secret received:", data.clientSecret);
                setClientSecret(data.clientSecret);
            })
            .catch((error) => {
                console.error("Error fetching client secret:", error); // Log errors
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
