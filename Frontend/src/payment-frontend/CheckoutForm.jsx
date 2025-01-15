import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { useNavigate } from "react-router-dom";

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }


        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Keep this empty since we are handling navigation manually
            },
            redirect: "if_required", // Prevent automatic redirection
        });

        if (error) {
            console.error("Payment failed:", error.message);
            // Navigate to /confirmation with failure status
            navigate("/confirmation", { state: { status: "failed", error: error.message } });
        } else {
            console.log("Payment succeeded!", paymentIntent);
            // Navigate to /confirmation with success status
            navigate("/confirmation", { state: { status: "succeeded", paymentIntent } });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <PaymentElement />
            <button type="submit" disabled={!stripe}>
                Pay Now
            </button>
        </form>
    );
};

export default CheckoutForm;
