import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const CheckoutForm = () => {
    const product = JSON.parse(localStorage.getItem("product-details"))
    const { finalPrice } = product;
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"))
    const [transactionId, setTransactionId] = useState("")
    const [cardError, setCardError] = useState("");
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        axios.post("https://habibi-shipping.vercel.app/create-payment-intent", { finalPrice })
            .then(res => {
                setClientSecret(res.data.clientSecret)
            })

    }, [finalPrice])
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            setCardError(error.message)
        } else {
            setCardError("")
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: user?.name || "anonymous",
                        email: user?.email || "example@example.com",
                    },
                },
            },
        );

        if (confirmError) {
            setCardError(confirmError)
        }
        if (paymentIntent.status === "succeeded") {
            setTransactionId(paymentIntent.id);
            const payment = {
                name: user?.name,
                email: user?.email,
                transactionId: transactionId,
                productDetails: product,
                date: new Date(),
                status: 'Payment Done. Service Pending.',
            }
            axios.post("https://habibi-shipping.vercel.app/successful-payment", payment)
                .then(res => console.log(res))
            localStorage.setItem("paymentInfo", JSON.stringify(payment));
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Payment Successful',
                showConfirmButton: false,
                timer: 1500
            })
            navigate("/success")
        }

    };
    return (
        <div className=" w-[90%]">
            <form onSubmit={handleSubmit}>
                <CardElement className="px-10 py-6 m-4 border-2 rounded-xl"
                    options={{
                        style: {
                            base: {

                                fontSize: '24px',
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
                />
                <div className="m-4">
                    <button type="submit" className="bg-[#00d896] cursor-pointer font-semibold px-4 w-full py-2 hover:bg-red-600 rounded-lg text-white" disabled={!stripe || !clientSecret}>
                        Pay
                    </button>
                </div>
            </form>
            {
                cardError && <p className="text-red-600 text-xl font-semibold m-4">{cardError}</p>
            }
        </div>
    );
};

export default CheckoutForm;