import { useEffect, useState } from "react";
import { getUserPortfolios } from "../api/portfolioApi";
import axios from "axios";
import { Link } from "react-router-dom";

const API_URL = 'http://localhost:5000/api';

const Portfolio = () => {
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const userData = localStorage.getItem("user");
        const user = userData ? JSON.parse(userData) : null;

        if (!user?.token) {
          throw new Error("Please login to view portfolios");
        }

        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const response = await axios.get(`${API_URL}/portfolios`, config);
        console.log("response: ", response.data)
        setPortfolios(response.data);

      } catch (error) {
        setError(error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolios();
  }, []);




  return (
    <div className="min-h-screen bg-gray-100 p-6 pt-20">
      <h1 className="text-3xl font-bold text-center text-gray-800">My Portfolios</h1>

      {loading ? (
        <p className="text-center mt-6">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {portfolios.map((portfolio) => (
            <div key={portfolio._id} className="bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition">
              <h2 className="text-xl font-semibold">{portfolio.name}</h2>
              <p className="text-gray-600 mt-2">{portfolio.description || "No description available"}</p>
              <Link
                to={`/edit-portfolio`}
                className="inline-block mt-3 text-blue-600 hover:underline"
              >
                View Portfolio →
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Portfolio;
