import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [updatedData, setUpdatedData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
  });

  // Fetch all employees from backend
  const fetchEmployees = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/employee");
      setEmployees(res.data);
    } catch (err) {
      setError("Failed to fetch employees. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Handle delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;

    try {
      await axios.delete(`http://localhost:8080/api/employee/${id}`);
      alert("Employee deleted successfully!");
      fetchEmployees();
    } catch (err) {
      console.error(err);
      alert("Failed to delete employee. Please try again.");
    }
  };

  // Handle edit button click
  const handleEdit = (emp) => {
    setEditingEmployee(emp.id);
    setUpdatedData({
      name: emp.name,
      email: emp.email,
      phone: emp.phone,
      department: emp.department,
    });
  };

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle update
  const handleUpdate = async (id) => {
    try {
      await axios.put(`http://localhost:8080/api/employee/${id}`, updatedData);
      alert("Employee updated successfully!");
      setEditingEmployee(null);
      fetchEmployees();
    } catch (err) {
      console.error(err);
      alert("Failed to update employee. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg">
        Loading employees...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-600 text-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-10 bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Employee Dashboard
      </h2>

      {employees.length === 0 ? (
        <p className="text-center text-gray-600">No employees found.</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-blue-600 text-white text-left">
              <th className="p-3 border">ID</th>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Email</th>
              <th className="p-3 border">Phone</th>
              <th className="p-3 border">Department</th>
              <th className="p-3 border text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr
                key={emp.id}
                className="hover:bg-gray-100 transition-colors duration-150"
              >
                {editingEmployee === emp.id ? (
                  <>
                    <td className="p-3 border">{emp.id}</td>
                    <td className="p-3 border">
                      <input
                        type="text"
                        name="name"
                        value={updatedData.name}
                        onChange={handleChange}
                        className="border p-1 w-full rounded"
                      />
                    </td>
                    <td className="p-3 border">
                      <input
                        type="email"
                        name="email"
                        value={updatedData.email}
                        onChange={handleChange}
                        className="border p-1 w-full rounded"
                      />
                    </td>
                    <td className="p-3 border">
                      <input
                        type="text"
                        name="phone"
                        value={updatedData.phone}
                        onChange={handleChange}
                        className="border p-1 w-full rounded"
                      />
                    </td>
                    <td className="p-3 border">
                      <input
                        type="text"
                        name="department"
                        value={updatedData.department}
                        onChange={handleChange}
                        className="border p-1 w-full rounded"
                      />
                    </td>
                    <td className="p-3 border text-center">
                      <button
                        onClick={() => handleUpdate(emp.id)}
                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 mr-2"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingEmployee(null)}
                        className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                      >
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="p-3 border">{emp.id}</td>
                    <td className="p-3 border">{emp.name}</td>
                    <td className="p-3 border">{emp.email}</td>
                    <td className="p-3 border">{emp.phone}</td>
                    <td className="p-3 border">{emp.department}</td>
                    <td className="p-3 border text-center">
                      <button
                        onClick={() => handleEdit(emp)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(emp.id)}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Dashboard;
