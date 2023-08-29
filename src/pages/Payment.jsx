import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../components/CheckoutForm";


const Payment = () => {
    const product = JSON.parse(localStorage.getItem("product-details"))
    const stripePromise = loadStripe(import.meta.env.VITE_Payement_Gateway_Pk)
    return (
        <>
          <h2 className="text-xl font-semibold text-center mt-10">You will pay: {product.finalPrice}tk</h2>  
            <div className="flex justify-center">
                <Elements stripe={stripePromise}>
                    <CheckoutForm></CheckoutForm>
                </Elements>
            </div>
            <div className="font-semibold w-[80%] mx-auto">
                <p>Use any card from <a className="text-blue-600" href="https://stripe.com/docs/testing">Stripe Test cards</a> </p>
                <p>To save time you can use this card info:</p>
                <p>Card: 4242 4242 4242 4242 </p>
                <p>Date: 02/33</p>
                <p>CVC: 223 </p>
                <p>Zip: 43232 </p>
            </div>
        </>
    );
};

export default Payment;