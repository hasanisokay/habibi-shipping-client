import axios from "axios";
import { useState } from "react";
import { HiOutlineArrowSmRight } from "react-icons/hi";
import Swal from "sweetalert2";

const Login = () => {

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const user = { email: userEmail, password: userPassword }
        axios.post("https://habibi-shipping.vercel.app/login", user)
            .then(res => {
                console.log(res);
                if(res?.data?.message ==="Login successful"){
                    localStorage.setItem("user", JSON.stringify({email:userEmail}));
                    localStorage.setItem("token", JSON.stringify(res?.data?.token));
                }
                
            })
            .catch(err => {
                console.log(err)
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Credential error! New here? Make a delivery to register',
                })
            })

    }
    const [userEmail, setUserEmail] = useState("")
    const [userPassword, setUserPassword] = useState("")
    return (
        <div className="w-[80%] mx-auto my-10">
            <form onSubmit={handleFormSubmit}>
                <div className="w-full border rounded flex items-center">
                    <input value={userEmail} onChange={(e) => setUserEmail(e.target.value)} type="email" className="w-full p-3 rounded focus:outline-none font-semibold  text-gray-900 text-sm" placeholder="Your Email" required name="email" />
                </div>
                <div className="w-full border rounded flex items-center">
                    <input value={userPassword} onChange={(e) => setUserPassword(e.target.value)} type="password" className="w-full p-3 rounded focus:outline-none font-semibold  text-gray-900 text-sm" placeholder="Your Password" required name="password" />
                </div>
                <p className="text-sm text-red-600">Remember the password for future login.</p>

                <div className="w-[50%] mx-auto mt-4" title="You will be redirected to payment procedure">
                    <button type="submit" className="bg-[#00d896] w-full flex items-center justify-center gap-10 rounded-lg text-white py-2 font-semibold">
                        <p>Login</p>
                        <HiOutlineArrowSmRight className="w-8 h-5" />
                    </button>
                </div>
            </form>

        </div>
    );
};

export default Login;