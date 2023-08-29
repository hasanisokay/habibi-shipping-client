import { useEffect, useState } from "react";
import { HiOutlineArrowSmRight, HiOutlineHome } from "react-icons/hi";
import { FaGavel, FaNeuter, FaPeopleCarryBox, FaStore } from "react-icons/fa6";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Bounce, Fade, Slide } from "react-awesome-reveal";
const SecondPage = () => {
    const navigate = useNavigate()
    const [price, setPrice] = useState(0)
    const product = JSON.parse(localStorage.getItem("product-details"))
    const [showDate, setShowDate] = useState(false)
    const [selectedPickup, setSelectedPickup] = useState("")
    const [showHeightPicker, setShowHeightPicker] = useState(false)
    const [height, setHeight] = useState("")
    const [selectedDateOption, setSelectedDateOption] = useState(null);
    const today = new Date();
    const tomorrow = new Date();
    const threeDaysLater = new Date();
    const tenDaysLater = new Date();
    tomorrow.setDate(today.getDate() + 1);
    threeDaysLater.setDate(today.getDate() + 3);
    tenDaysLater.setDate(today.getDate() + 10);

    const handleContinue = (show) => {
        if (selectedPickup === "") {
            return alert("Please select an option to continue.")
        }
        if (show === "showDate") {
            setShowDate(true)
        }
        if (show === "showHeight") {
            if (!selectedDateOption) {
                return alert("Please select a pickup date to continue.")
            }
            setShowDate(false)
            setShowHeightPicker(true)
        }
    }
    const gotoNextPage = () => {
        if (height === "") {
            return alert("Please select an option to continue.")
        }
        product.locationHeight = height;
        if (selectedDateOption === "tomorrow") {
            product.pickupDate = formatDate(tomorrow);
            product.selectedDateOption = "tomorrow"
        }
        if (selectedDateOption === "threeDaysLater") {
            product.pickupDate = formatDate(threeDaysLater);
            product.selectedDateOption = "threeDaysLater"
        }
        if (selectedDateOption === "tenDaysLater") {
            product.pickupDate = formatDate(tenDaysLater);
            product.selectedDateOption = "tenDaysLater"
        }
        product.basePrice = price;
        product.pickupFrom = selectedPickup;
        product.finalPrice = price + (height !== "" && height !== "firstFloor" && 2) + (selectedDateOption ? (selectedDateOption === "tomorrow" && 20 || selectedDateOption === "threeDaysLater" && 15 || selectedDateOption === "tenDaysLater" && 10) : 0)

        localStorage.setItem("product-details", JSON.stringify(product))
        navigate("/cart")
    }

    useEffect(() => {
        axios.post("https://habibi-shipping.vercel.app/calculate-price", product)
            .then(data => setPrice(data.data.fare))
    }, [])

    return (
        <div className="mx-4 lg:my-8 md:my-6 my-4">
            <h2 className="lg:text-4xl md:text-3xl text-2xl font-semibold text-center">
                <span>{showDate && "Select pickup date"}</span>
                <span>{selectedPickup === "" && "From where do we pick it up?"}</span>
                <span>{!showDate && showHeightPicker && "Select product pickup height"}</span>
            </h2>
            <div className="flex gap-4 flex-col lg:flex-row-reverse justify-center">
                <div className="lg:mt-10 md:mt-6 mt-4 max-h-[50%]">
                    <div className="bg-blue-100 py-4 px-4 rounded">
                        <h3 className="font-semibold text-2xl text-blue-500">Your delivery</h3>
                        <p className="text-blue-500 text-lg font-semibold lg:min-w-[300px]">{product?.name || "Loading..."} ({product?.type || "Please Wait"})</p>
                        {
                            selectedPickup !== "" && <p className="text-blue-600 font-semibold">Pickup: <span>{selectedPickup === "home" && "From home" || selectedPickup === "move" && "Need a move" || selectedPickup === "store" && "From a store" || selectedPickup === "auction" && "From an auction"}</span></p>
                        }
                        <div className="flex justify-between pr-4">
                            <p className="text-gray-500">Base price</p>
                            <p className="font-semibold">{price || "00.00"}tk</p>
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
                            {
                                selectedDateOption !== "" && <div className="flex justify-between pr-4">
                                    <p className="font-semibold "><span>{selectedDateOption === "tomorrow" && formatDate(tomorrow)}</span> <span>{selectedDateOption === "threeDaysLater" && formatDate(threeDaysLater)}</span> <span>{selectedDateOption === "tenDaysLater" && formatDate(tenDaysLater)}</span> </p>
                                    <p className=" font-semibold"><span>{selectedDateOption === "tomorrow" && "20tk"}</span><span>{selectedDateOption === "threeDaysLater" && "15tk"}</span><span>{selectedDateOption === "tenDaysLater" && "10tk"}</span></p>
                                </div>
                            }
                            {
                                height && <div  className="flex justify-between pr-4" >
                                    <p className="font-semibold">{height==="secondFloor" &&"From Second Floor" || height==="groundFloor" &&"From Ground Floor" ||height==="firstFloor" &&"From First Floor"} </p>
                                    <p className="font-semibold">{height==="secondFloor" && "2tk" || height==="groundFloor" &&"0tk" ||height==="firstFloor" &&"2tk"} </p>
                                </div>
                            }
                            <hr className="h-[3px] mt-4 mb-2 w-full bg-blue-600" />
                            <div className="flex justify-between pr-4">
                                <p className="text-blue-600 font-semibold">Now {product?.discount || 0}% discount </p>
                                <p className="font-semibold">{price + (height !== "" && height !== "groundFloor" && 2) + (selectedDateOption ? (selectedDateOption === "tomorrow" && 20 || selectedDateOption === "threeDaysLater" && 15 || selectedDateOption === "tenDaysLater" && 10) : 0)}tk</p>
                            </div>
                        </div>
                    </div>
                </div>
                {!showDate && !showHeightPicker && <Fade duration={3000}>
                    <div className="flex flex-col gap-4 lg:mt-10 md:mt-6 mt-4">
                        <div onClick={() => setSelectedPickup("home")} className={`${selectedPickup === "home" ? "bg-blue-300" : "hover:bg-blue-100"} shadow-md lg:min-h-[110px] min-h-[140px] lg:min-w-[600px] md:min-w-[400px] min-w-[300px] cursor-pointer flex items-center gap-4 border rounded-xl px-4 `}>
                            <HiOutlineHome className="text-blue-600 hover:text-blue-700 w-8 h-8" />
                            <div>
                                <h4 className="font-medium text-lg">From a private home</h4>
                                <p>From your home or someone you know</p>
                            </div>
                        </div>
                        <div onClick={() => setSelectedPickup("store")} className={`${selectedPickup === "store" ? "bg-blue-300" : "hover:bg-blue-100"} shadow-md lg:min-h-[110px] min-h-[140px] lg:min-w-[600px] md:min-w-[400px] min-w-[300px] cursor-pointer flex items-center gap-4 border rounded-xl px-4 `}>
                            <FaStore className="text-blue-600 hover:text-blue-700 w-8 h-8" />
                            <div>
                                <h4 className="font-medium text-lg">From a store</h4>
                                <p>For example from a furniture store</p>
                            </div>
                        </div>
                        <div onClick={() => setSelectedPickup("auction")} className={`${selectedPickup === "auction" ? "bg-blue-300" : "hover:bg-blue-100"} shadow-md lg:min-h-[110px] min-h-[140px] lg:min-w-[600px] md:min-w-[400px] min-w-[300px] cursor-pointer flex items-center gap-4 border rounded-xl px-4 `}>
                            <FaGavel className="text-blue-600 hover:text-blue-700 w-8 h-8" />
                            <div>
                                <h4 className="font-medium text-lg">From an auction</h4>
                                <p>From Troostwijk for example</p>
                            </div>
                        </div>
                        <div onClick={() => setSelectedPickup("move")} className={`${selectedPickup === "move" ? "bg-blue-300" : "hover:bg-blue-100"} shadow-md lg:min-h-[110px] min-h-[140px] lg:min-w-[600px] md:min-w-[400px] min-w-[300px] cursor-pointer flex items-center gap-4 border rounded-xl px-4 `}>
                            <FaPeopleCarryBox className="text-blue-600 hover:text-blue-700 w-8 h-8" />
                            <div>
                                <h4 className="font-medium text-lg">Small move</h4>
                                <p>Need a small move</p>
                            </div>
                        </div>
                        <div className="w-[50%] mx-auto">
                            <button onClick={() => handleContinue("showDate")} className="bg-[#00d896] w-full flex items-center justify-center gap-10 rounded-lg text-white py-2 font-semibold">
                                <p>Continue</p>
                                <HiOutlineArrowSmRight className="w-8 h-5" />
                            </button>
                        </div>
                    </div>
                </Fade>}

                {
                    showDate && !showHeightPicker &&
                    <div>
                        <Slide duration={3000}>
                            <div className="flex flex-col gap-4 lg:mt-10 md:mt-6 mt-4">
                                <Bounce duration={3000}>
                                    <div onClick={() => setSelectedDateOption("tomorrow")} className={`${selectedDateOption === "tomorrow" ? "bg-blue-300" : "hover:bg-blue-100"} rounded-xl py-2 px-4 cursor-pointer flex justify-between lg:min-w-[450px] md:min-w-[300px] min-w-[200px]  shadow-lg border`}>
                                        <p>{formatDate(tomorrow)}</p>
                                        <p className="font-semibold text-red-600">+20tk </p>
                                    </div>
                                </Bounce>
                                <Bounce duration={3000}>
                                    <div onClick={() => setSelectedDateOption("threeDaysLater")} className={`${selectedDateOption === "threeDaysLater" ? "bg-blue-300" : "hover:bg-blue-100"} rounded-xl py-2 px-4 cursor-pointer flex justify-between lg:min-w-[450px] md:min-w-[300px] min-w-[200px]  shadow-lg border`}>
                                        <p>{formatDate(threeDaysLater)}</p>
                                        <p className="font-semibold text-yellow-500">+15tk </p>
                                    </div>
                                </Bounce>
                                <Bounce duration={3000}>
                                    <div onClick={() => setSelectedDateOption("tenDaysLater")} className={`${selectedDateOption === "tenDaysLater" ? "bg-blue-300" : "hover:bg-blue-100"} rounded-xl py-2 px-4 cursor-pointer flex justify-between lg:min-w-[450px] md:min-w-[300px] min-w-[200px]  shadow-lg border`}>
                                        <p>{formatDate(tenDaysLater)}</p>
                                        <p className="font-semibold text-green-600">+10tk </p>
                                    </div>
                                </Bounce>
                            </div>
                        </Slide>
                        <Fade duration={5000}>
                            <div className="w-[50%] mx-auto mt-10">
                                <button onClick={() => handleContinue("showHeight")} className="bg-[#00d896] w-full flex items-center justify-center gap-10 rounded-lg text-white py-2 font-semibold">
                                    <p>Continue</p>
                                    <HiOutlineArrowSmRight className="w-8 h-5" />
                                </button>
                            </div>
                        </Fade>
                    </div>
                }
                {
                    showHeightPicker &&
                    <div>

                        <div className="flex flex-col gap-4 lg:mt-10 md:mt-6 mt-4">
                            <Fade duration={2000}>
                                <div onClick={() => setHeight("groundFloor")} className={`${height === "groundFloor" ? "bg-blue-300" : "hover:bg-blue-100"} rounded-xl py-2 px-4 cursor-pointer flex justify-between lg:min-w-[450px] md:min-w-[300px] min-w-[200px]  shadow-lg border`}>
                                    <p className="font-semibold">Ground Floor</p>
                                    <p className="font-semibold text-green-600">+0tk</p>
                                </div>
                            </Fade>
                            <Fade duration={2000}>
                                <div onClick={() => setHeight("firstFloor")} className={`${height === "firstFloor" ? "bg-blue-300" : "hover:bg-blue-100"} rounded-xl py-2 px-4 cursor-pointer flex justify-between lg:min-w-[450px] md:min-w-[300px] min-w-[200px]  shadow-lg border`}>
                                    <p className="font-semibold">First Floor</p>
                                    <p className="font-semibold text-yellow-600">+2tk </p>
                                </div>
                            </Fade>
                            <Fade duration={2000}>
                                <div onClick={() => setHeight("secondFloor")} className={`${height === "secondFloor" ? "bg-blue-300" : "hover:bg-blue-100"} rounded-xl py-2 px-4 cursor-pointer flex justify-between lg:min-w-[450px] md:min-w-[300px] min-w-[200px]  shadow-lg border`}>
                                    <p className="font-semibold">Second Floor or above</p>
                                    <p className="font-semibold text-yellow-600">+2tk </p>
                                </div>
                            </Fade>
                        </div>

                        <Fade duration={5000}>
                            <div className="w-[50%] mx-auto mt-10">
                                <button onClick={gotoNextPage} className="bg-[#00d896] w-full flex items-center justify-center gap-10 rounded-lg text-white py-2 font-semibold">
                                    <p>Continue</p>
                                    <HiOutlineArrowSmRight className="w-8 h-5" />
                                </button>
                            </div>
                        </Fade>
                    </div>
                }


            </div>
        </div >
    );
};

export default SecondPage;

const formatDate = (date) => {
    const options = { weekday: 'long', day: 'numeric', month: 'long' };
    return date.toLocaleDateString('en-US', options);
};