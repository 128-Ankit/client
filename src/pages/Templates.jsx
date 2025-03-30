import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTemplates } from "../api/templateApi";
const Templates = () => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await getTemplates();
        console.log("response: ", response);
        setTemplates(response);
      } catch (error) {
        console.error("Error fetching templates:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTemplates();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Choose a Template</h2>
      {loading ? (
        <p className="text-center">Loading templates...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <div key={template._id} className="border rounded-lg shadow-lg overflow-hidden">
              <img src={template.thumbnail} alt={template.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold">{template.name}</h3>
                <p className="text-sm text-gray-500 mb-2">{template.description}</p>
                <p className="text-sm text-gray-500 mb-2">{template.category}</p>
                <Link
                  to={`/templates/${template._id}`}
                  className="block text-center bg-blue-500 hover:bg-blue-600 text-white py-2 rounded mt-4"
                >
                  View Template
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Templates;
