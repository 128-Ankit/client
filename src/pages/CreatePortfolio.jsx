import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createPortfolio } from "../api/portfolioApi";

const CreatePortfolio = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [token, setToken] = useState(null);
    const [formData, setFormData] = useState({
        templateId: id,
        name: ""
    });

    // Get token from localStorage
    useEffect(() => {
        const userData = localStorage.getItem("user");
        const user = userData ? JSON.parse(userData) : null;
        setToken(user?.token);
    }, []);

    console.log("token: ", token);

    // Handle form field changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            createPortfolio(formData, token);
            navigate("/portfolios"); 
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Create Portfolio</h2>

                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-medium">TemplateId</label>
                        <input
                            type="text"
                            name="templateId"
                            value={formData.templateId}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium">Name or Slug (Unique URL)</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                        disabled={loading}
                    >
                        {loading ? "Creating..." : "Create Portfolio"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreatePortfolio;
