import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem("user"))
    useEffect(()=>{
        if(!user){
            navigate("/login")
        }
    },[user])
    return (
        <>
            {user && <div className="bg-[#a9d6e9] min-h-[100vh]">
                <h1 className="text-center">Name: <span className="font-semibold">{user?.name}</span></h1>
                <h1 className="text-center">Email: <span className="font-semibold">{user?.email}</span></h1>
            </div>}
        </>
    );
};

export default Profile;