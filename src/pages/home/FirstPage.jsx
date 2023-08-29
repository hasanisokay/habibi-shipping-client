import { HiClipboard, HiDocumentDuplicate, HiLocationMarker, HiOutlineArrowSmRight, HiScale } from "react-icons/hi";
import Banner from "../../components/Banner";
import { useState } from "react";
import Lottie from "lottie-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import loadingJson from "../../assets/loading.json"
const img_hosting_token = import.meta.env.VITE_Image_Upload_token;
const FirstPage = () => {
    localStorage.removeItem("paymentInfo")
    const [productQuantity, setProductQuantity] = useState(1);
    const [selectedProductType, setSelectedProductType] = useState("");
    const [productDetailsWindow, setProductDetailsWindow] = useState(false)
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [productWeight, setProductWeight] = useState("")
    const [productName, setProductName] = useState("")
    const [productImage, setProductImage] = useState(null);
    const [selectedFileName, setSelectedFileName] = useState("");
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setProductImage(file);
        setSelectedFileName(file.name);
    };
    const handleForm = (e) => {
        e.preventDefault();
        setProductDetailsWindow(!productDetailsWindow)
    }
    const handleContinue = async (e) => {
        e.preventDefault()
        if (productWeight < 0.1) {
            return alert("Minimum weight is 0.1kg")
        }
        if (productWeight > 40 || productQuantity * productWeight > 40) {
            return alert("Maximum weight is 40kg")
        }
        const product = { name: productName, weight: productWeight, type: selectedProductType, quantity: productQuantity, destination: selectedDistrict }
        if (productImage) {
            setLoading(true)
            const formData = new FormData();
            formData.append("image", productImage);
            try {
                const response = await axios.post(
                    `https://api.imgbb.com/1/upload?key=${img_hosting_token}`,
                    formData
                );
                product.image = response.data.data.url;
                setLoading(false)

            } catch (error) {
                console.error("Image upload error:", error);
            }
        }
        localStorage.setItem("product-details", JSON.stringify(product))
        navigate("/pickup-location")
    }
    return (
        <>
            {!loading && <div className="bg-[#a9d6e9]">
                <Banner></Banner>
                <form className="pb-10" onSubmit={handleForm}>
                    <div className="bg-white rounded flex flex-col lg:flex-row items-center py-2 w-[90%] mx-auto px-4">
                        <div className="w-full flex items-center">
                            <HiLocationMarker className=" text-blue-600" />
                            <input type="text" readOnly title="This is fixed value for this project. You can only change the destination." value="Dhaka" className="lg:border-r-2 focus:outline-none font-semibold w-full  text-gray-900 text-sm py-2 pl-5" placeholder="From" required name="from" />
                        </div>
                        <div className="w-full items-center flex lg:ml-4">
                            <HiLocationMarker className=" text-blue-600" />
                            <select
                                value={selectedDistrict}
                                onChange={(e) => setSelectedDistrict(e.target.value)}
                                className="w-full focus:outline-none font-semibold text-gray-900 text-sm rounded-r-lg py-2 pl-4"
                                required
                                name="destination"
                            >
                                <option value="">Select Destination</option>
                                {districts.map((district, index) => (
                                    <option key={index} value={district}>
                                        {district}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button type="submit" className="bg-[#00d896] w-full md:w-[50%] flex items-center justify-center gap-10 rounded-lg text-white py-1 font-semibold">
                            <p>Calculate Price</p>
                            <HiOutlineArrowSmRight className="w-8 h-5" />
                        </button>
                    </div>
                </form>
                {
                    productDetailsWindow &&
                    <div className="pb-10">
                        <h3 className="font-semibold py-2 text-center  lg:text-3xl  md:text-2xl text-xl">Your Product Details</h3>
                        <form onSubmit={handleContinue} className="bg-white rounded lg:w-[50%] mx-auto w-[90%] px-4 pb-4">
                            <div className=" w-full  rounded flex items-center">
                                <HiClipboard className="text-blue-600" />
                                <input value={productName} onChange={(e) => setProductName(e.target.value)} type="text" className="w-full p-3 rounded focus:outline-none font-semibold  text-gray-900 text-sm" placeholder="Product Name" required name="name" />
                            </div>
                            <div className="rounded flex items-center">
                                <HiScale className="text-blue-600" />
                                <input value={productWeight} onChange={(e) => setProductWeight(e.target.value)} type="number" className="p-3 rounded focus:outline-none font-semibold  text-gray-900 text-sm" placeholder="Weight" title="Minimum Weight 0.5kg" required name="weight" />
                                <span className="pl-1">kg</span>
                            </div>
                            <div className="w-full flex items-center">
                                <HiDocumentDuplicate className="text-blue-600" />
                                <input
                                    value={productQuantity === 1 ? "" : productQuantity}
                                    onChange={(e) => setProductQuantity(e.target.value)}
                                    type="number"
                                    className="w-full p-3 rounded focus:outline-none font-semibold  text-gray-900 text-sm"
                                    placeholder="Quantity"
                                    required
                                    name="quantity"
                                />
                            </div>
                            <div className="w-full py-2">
                                <select
                                    value={selectedProductType}
                                    onChange={(e) => setSelectedProductType(e.target.value)}
                                    className="w-full rounded focus:outline-none"
                                    required
                                    name="productType"
                                >
                                    <option value="">Select Product Type</option>
                                    {productTypes.map((type, index) => (
                                        <option key={index} value={type}>
                                            {type}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="w-full py-4">
                                <label className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg text-center">
                                    Product Image (optional)
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className="hidden"
                                        name="image"
                                    />
                                </label>
                                {selectedFileName && (
                                    <p className="mt-2 text-gray-500">Selected File: {selectedFileName}</p>
                                )}
                            </div>

                            <div className="flex justify-center py-4">
                                <button type="submit" className="bg-[#00d896] w-full md:w-[50%] flex items-center justify-center gap-10 rounded-lg text-white py-2 font-semibold">
                                    <p>Continue</p>
                                    <HiOutlineArrowSmRight className="w-8 h-5" />
                                </button>
                            </div>

                        </form>
                    </div>
                }
            </div>}
            {loading && <div className="w-[50%] mx-auto my-8">
                <h2 className="text-2xl font-semibold text-center">Please Wait</h2>
                <Lottie className="w-[50%] mx-auto" animationData={loadingJson} />
            </div>}
        </>
    );
};

export default FirstPage;


const districts = [
    "Sylhet",
    "Chittagong",
    "Khulna",
    "Barisal",
    "Rajshahi",
    "Rangpur",
    "Mymensingh",
    "Narsingdi",
    "Brahmanbaria",
    "Kishoreganj",
    "Jamalpur",
    "Comilla",
    "Feni",
    "Noakhali",
    "Panchagarh",
    "Thakurgaon",
    "Cox's Bazar",
    "Dinajpur",
    "Nilphamari",
    "Kurigram",
    "Lalmonirhat",
    "Barguna",
    "Rangamati",
    "Bandarban",
    "Natore",
    "Narayanganj",
    "Munshiganj",
    "Manikganj",
    "Gazipur",
    "Netrokona",
    "Tangail",
    "Shariatpur",
    "Rajbari",
    "Gopalganj",
    "Madaripur",
    "Faridpur",
    "Sherpur",
    "Lakshmipur",
    "Chandpur",
    "Sunamganj",
    "Moulvibazar",
    "Habiganj",
    "Khagrachari",
    "Naogaon",
    "Chapainawabganj",
    "Pabna",
    "Sirajganj",
    "Bogura",
    "Joypurhat",
    "Gaibandha",
    "Bagerhat",
    "Satkhira",
    "Jashore",
    "Magura",
    "Narail",
    "Kushtia",
    "Jhenaidah",
    "Chuadanga",
    "Meherpur",
    "Jhalokathi",
    "Pirojpur",
    "Bhola",
    "Patuakhali"
];

const productTypes = [
    "Glass",
    "Fluid",
    "Wood",
    "Steel",
    "Plastic",
    "Ceramic",
    "Fabric",
    "Leather",
    "Food"
];