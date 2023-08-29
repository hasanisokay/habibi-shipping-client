import { Outlet, useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"))
    return (
        <div className="min-h-[100vh]">
            <nav className="bg-[#a9d6e9] px-6 py-2 ">
                {user && <p className="font-semibold rounded"><span onClick={() => navigate("/profile")} title="Go to profile" className="bg-gray-200 cursor-pointer p-1 rounded">{user.name}</span></p>}
                {!user && <p><span onClick={() => navigate("/login")} title="Goto Login page" className="font-semibold cursor-pointer bg-gray-200 p-1 rounded">Login</span></p>}
            </nav>
            <Outlet></Outlet>
        </div>
    );
};

export default Home;