import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AfterPayment = () => {
    const paymentInfo = JSON.parse(localStorage.getItem("paymentInfo"))
    const navigate = useNavigate();
    useEffect(() => {
        if (!paymentInfo) {
            return navigate("/")
        }
    }, [])
    return (
        <>
            {paymentInfo && <div className="text-center font-semibold my-10">
                <h2 className="text-2xl text-green-600">Your payment is successfull </h2>
                <p>Transaction id:  <span className="text-sm font-normal">{paymentInfo?.transactionId}</span></p>
                <p>Paid amount:  <span>{paymentInfo?.productDetails?.finalPrice}tk</span></p>
                <p>Paid for product: {paymentInfo?.productDetails.name}</p>
                <p>Product Weight: {paymentInfo?.productDetails?.weight}</p>
                <p>Product Quantity: {paymentInfo?.productDetails?.quantity}</p>
                <p>Pickup Date: {paymentInfo?.productDetails?.pickupDate}</p>
                <button onClick={() => navigate("/")} className="p-2 bg-[#00d896] text-white rounded-lg my-6">Return Home</button>
            </div>}
        </>
    );
};

export default AfterPayment;