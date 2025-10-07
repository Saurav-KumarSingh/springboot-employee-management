import axios from "axios";
import { useState } from "react";

const AddEmployee = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
  });

  const fields = [
    { name: "firstName", label: "First Name", type: "text", placeholder: "Enter first name" },
    { name: "lastName", label: "Last Name", type: "text", placeholder: "Enter last name" },
    { name: "emailId", label: "Email", type: "email", placeholder: "Enter email" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Save data to backend
      const res = await axios.post(
        "http://localhost:8080/api/v1/employee",
        formData
      );

      console.log("Employee saved successfully:", res.data);

      // Clear form after successful submission
      setFormData({
        firstName: "",
        lastName: "",
        emailId: "",
      });

      alert("Employee saved successfully!");
    } catch (error) {
      console.error(
        error.response?.data?.message || "Failed to save employee. Please try again."
      );
      alert(
        error.response?.data?.message || "Failed to save employee. Please try again."
      );
    }
  };

  const handleClear = () => {
    setFormData({
      firstName: "",
      lastName: "",
      emailId: "",
    });
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-6">Add New Employee</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {fields.map((field) => (
          <div key={field.name}>
            <label className="block text-gray-700 mb-1">{field.label}</label>
            <input
              type={field.type}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              placeholder={field.placeholder}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        ))}

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            type="submit"
            className="cursor-pointer flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Save
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="cursor-pointer flex-1 bg-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-400 transition duration-200"
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEmployee;
