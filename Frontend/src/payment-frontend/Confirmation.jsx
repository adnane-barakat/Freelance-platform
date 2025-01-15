import { useLocation } from "react-router-dom";

const Confirmation = () => {
    const location = useLocation();
    const { status, error, paymentIntent } = location.state || {};

    return (
        <div className="confirmation-page">
            {status === "succeeded" ? (
                <h1>Payment succeeded! Thank you for your purchase.</h1>
            ) : status === "failed" ? (
                <h1>Payment failed. Please try again.</h1>
            ) : (
                <h1>Unknown payment status.</h1>
            )}

            {paymentIntent && (
                <div>
                    <p>Amount: ${(paymentIntent.amount / 100).toFixed(2)}</p>
                    <p>Currency: {paymentIntent.currency.toUpperCase()}</p>
                    <p>Payment ID: {paymentIntent.id}</p>
                </div>
            )}

            {error && <p>Error: {error}</p>}
        </div>
    );
};

export default Confirmation;
