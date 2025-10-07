import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
  });

  const fields = [
    { name: "name", label: "Full Name", type: "text", placeholder: "Enter full name" },
    { name: "email", label: "Email", type: "email", placeholder: "Enter email" },
    { name: "phone", label: "Phone", type: "text", placeholder: "Enter phone number" },
    { name: "department", label: "Department", type: "text", placeholder: "Enter department" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:8080/api/employee",
        formData
      );
      console.log("Employee saved successfully:", res.data);

      setFormData({
        name: "",
        email: "",
        phone: "",
        department: "",
      });

      alert("Employee saved successfully!");
      navigate("/");
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
      name: "",
      email: "",
      phone: "",
      department: "",
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

        <div className="flex gap-4">
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Save
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-400 transition duration-200"
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEmployee;
