import React, { useEffect, useState } from 'react'
import { getTemplatesId } from '../../api/templateApi';
import { useNavigate, useParams } from 'react-router-dom';

const TemplatePreview = () => {
  const { id } = useParams();
  const [sections, setSections] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await getTemplatesId(id);
        setSections(response.sections);
        console.log("templates response: ", response.sections);
      } catch (error) {
        console.error("Error fetching templates:", error);
      } finally {
        // setLoading(false);
      }
    };
    fetchTemplates();
  }, []);

  const handleConfirm = () => {
    setIsPopupOpen(false);
    navigate(`/create-portfolio/${id}`);
  }

  return (
    <div className="container mx-auto p-6 space-y-8 pt-20 relative">
      <button
        onClick={() => setIsPopupOpen(true)}
        className="fixed top-24 right-8 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md shadow-md transition-colors"
      >
        Use Template
      </button>

      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Use This Template</h3>
            <p className="mb-4">Would you like to use this template for your portfolio?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsPopupOpen(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {sections.map((section) => (
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
  )
}

export default TemplatePreview