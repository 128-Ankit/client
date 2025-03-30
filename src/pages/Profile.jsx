import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    if (!user) {
        navigate("/login");
        return null;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
                <h2 className="text-2xl font-bold mb-4">Welcome, {user.name}!</h2>
                <p className="mb-4">Email: {user.email}</p>
                <button onClick={() => { logout(); navigate("/login"); }}
                    className="bg-red-500 text-white p-2 w-full rounded">
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Profile;
