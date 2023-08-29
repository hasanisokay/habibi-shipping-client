import { FaNeuter } from "react-icons/fa6";
import camera from "../../assets/camera.jpg";
import { HiOutlineArrowSmRight } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Cart = () => {
    const [showUserInputField, setShowUserInputField] = useState(false)
    const user = JSON.parse(localStorage.getItem("user"))
    const navigate = useNavigate()
    const [userName, setUserName] = useState(user?.name || "")
    const [userEmail, setUserEmail] = useState(user?.email || "")
    const [userPassword, setUserPassword] = useState("")
    const checkout = () => {
        if (user) {
            return navigate("/payment")
        }
        setShowUserInputField(true)
    }
    const handleFormSubmit = (e) => {
        e.preventDefault();
        const user = { name: userName, email: userEmail, password: userPassword }
        localStorage.setItem("user", JSON.stringify({ name: userName, email: userEmail }))
        navigate("/payment")
        axios.post("https://habibi-shipping.vercel.app/newUser", user)
            .then(res => {
                console.log(res)
                
            })
    }
    const product = JSON.parse(localStorage.getItem("product-details"))
    return (
        <div className="flex gap-4 flex-col lg:flex-row-reverse justify-center mx-4 lg:my-8 md:my-6 my-4">
            <div className="flex gap-4 flex-col lg:flex-row-reverse justify-center">
                <div className="bg-blue-100 py-4 px-4 rounded">
                    <h3 className="font-semibold text-2xl text-blue-500">Your delivery</h3>
                    <p className="text-blue-500 text-lg font-semibold lg:min-w-[300px]">{product?.name || "Loading..."} ({product?.type || "Please Wait"})</p>
                    <p className="text-blue-600 font-semibold">Pickup: <span>{product.pickupFrom === "home" && "From home" || product.pickupFrom === "move" && "Need a move" || product.pickupFrom === "store" && "From a store" || product.pickupFrom === "auction" && "From an auction"}</span></p>

                    <div className="flex justify-between pr-4">
                        <p className="text-gray-500">Base price</p>
                        <p className="font-semibold">{product.basePrice || "00.00"}tk</p>
                    </div>
                    <div className="flex flex-col justify-center">
                        <div className="flex gap-10 items-center">
                            <FaNeuter className="text-blue-600" />
                            <p className="font-semibold text-gray-700">Dhaka</p>
                        </div>
                        <div className="border-l-2 h-6 border-blue-600 border-dashed ml-[7px]"></div>
                        <div className="flex gap-10 items-center mb-4">
                            <FaNeuter className=" rotate-180  text-blue-600" />
                            <p className="font-semibold text-gray-700">{product.destination}</p>
                        </div>
                        <div className="flex justify-between pr-4">
                            <p className="font-semibold ">{product.pickupDate}</p>
                            <p className=" font-semibold"><span>{product.selectedDateOption === "tomorrow" && "20tk"}</span><span>{product.selectedDateOption === "threeDaysLater" && "15tk"}</span><span>{product.selectedDateOption === "tenDaysLater" && "10tk"}</span></p>
                        </div>
                        <div className="flex justify-between pr-4" >
                            <p className="font-semibold">{product.locationHeight === "secondFloor" && "From Second Floor" || product.locationHeight === "groundFloor" && "From Ground Floor" || product.locationHeight === "firstFloor" && "From First Floor"} </p>
                            <p className="font-semibold">{product.locationHeight === "secondFloor" && "2tk" || product.locationHeight === "groundFloor" && "0tk" || product.locationHeight === "firstFloor" && "2tk"} </p>
                        </div>

                        <hr className="h-[3px] mt-4 mb-2 w-full bg-blue-600" />
                        <div className="flex justify-between pr-4">
                            <p className="text-blue-600 font-semibold">Now {product?.discount || 0}% discount </p>
                            <p className="font-semibold">{product.finalPrice}tk</p>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <h2 className="lg:text-4xl md:text-3xl my-4 text-2xl font-semibold text-center">
                    Your Item(s)
                </h2>
                <div>
                    <div className="rounded border shadow-xl flex gap-6 p-4 items-center lg:min-w-[500px] min-w-full">
                        <div className="w-[100px] h-[100px]">
                            <img src={product.image || camera} alt="" className="w-full h-full" />
                        </div>
                        <div>
                            <p className="font-semibold text-blue-600">{product.name} <span>({product.type})</span></p>
                            <p>Quantity: {product.quantity}</p>
                            <p className="text-red-600 font-semibold cursor-pointer" onClick={() => navigate("/")}>Changed mind? Start from the beginning again.</p>
                        </div>
                    </div>
                    {showUserInputField && !user && <div className="my-10">
                        <p className="font-semibold text-lg">Please fill the form below before checkout</p>
                        <form onSubmit={handleFormSubmit}>
                            <div className=" w-full border rounded flex items-center">
                                <input value={userName} onChange={(e) => setUserName(e.target.value)} type="text" className="w-full p-3 rounded focus:outline-none font-semibold  text-gray-900 text-sm" placeholder="Your Name" required name="name" />
                            </div>
                            <div className="w-full border rounded flex items-center">
                                <input value={userEmail} onChange={(e) => setUserEmail(e.target.value)} type="email" className="w-full p-3 rounded focus:outline-none font-semibold  text-gray-900 text-sm" placeholder="Your Email" required name="email" />
                            </div>
                            <div className="w-full border rounded flex items-center">
                                <input value={userPassword} onChange={(e) => setUserPassword(e.target.value)} type="password" className="w-full p-3 rounded focus:outline-none font-semibold  text-gray-900 text-sm" placeholder="Your Password" required name="password" />
                            </div>
                            <p className="text-sm text-red-600">Remember the password for future login.</p>

                            <div className="w-[50%] mx-auto mt-10" title="You will be redirected to payment procedure">
                                <button type="submit" className="bg-[#00d896] w-full flex items-center justify-center gap-10 rounded-lg text-white py-2 font-semibold">
                                    <p>Checkout</p>
                                    <HiOutlineArrowSmRight className="w-8 h-5" />
                                </button>
                            </div>
                        </form>
                    </div>}
                    {!showUserInputField && <div className="w-[50%] mx-auto mt-10" title="You will be redirected to payment procedure">
                        <button onClick={checkout} className="bg-[#00d896] w-full flex items-center justify-center gap-10 rounded-lg text-white py-2 font-semibold">
                            <p>Checkout</p>
                            <HiOutlineArrowSmRight className="w-8 h-5" />
                        </button>
                    </div>}
                </div>
            </div>
        </div>
    );
};

export default Cart;