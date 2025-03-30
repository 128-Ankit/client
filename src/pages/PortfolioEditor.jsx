import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = 'http://localhost:5000/api';

const PortfolioEditor = () => {
  const [loading, setLoading] = useState(true);
  const [section, setSection] = useState([]);

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
        setSection(response.data[0].sections);
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
      {section.map((section) => (
        <div key={section._id} className="p-6 bg-gray-100 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800">{section.name}</h2>
          {section.type === "text" && typeof section.content === "object" ? (
            Array.isArray(section.content) ? (
              <ul className="mt-4 space-y-2">
                {section.content.map((item, index) => (
                  <li key={index} className="text-gray-700">{item.title}: {item.description}</li>
                ))}
              </ul>
            ) : (
              <div className="mt-4">
                {section.content.image && <img src={section.content.image} alt={section.name} className="w-32 h-32 rounded-full" />}
                <p className="text-gray-700">{section.content.description || section.content.aboutDescription}</p>
              </div>
            )
          ) : null}
          {section.type === "education" && (
            <ul className="mt-4 space-y-2">
              {section.content.map((edu, index) => (
                <li key={index} className="text-gray-700">
                  <strong>{edu.degree}</strong> - {edu.institution} ({edu.year})
                </li>
              ))}
            </ul>
          )}
          {section.type === "contact" && (
            <div className="mt-4 text-gray-700">
              <p>Email: {section.content.email}</p>
              <p>Phone: {section.content.phone}</p>
              <p>Address: {section.content.address}</p>
            </div>
          )}
        </div>
      ))}

    </div>
  );
};

export default PortfolioEditor;
