import React, { useState, useEffect } from 'react';

export default function UserForm({ initialData, onSubmit }) {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    rollno: '',
    phoneno: '',
    _id: ''
  });

  // Reset form when initial data changes
  useEffect(() => {
    if (initialData) {
      setFormData({
        firstname: initialData.firstname || '',
        lastname: initialData.lastname || '',
        rollno: initialData.rollno || '',
        phoneno: initialData.phoneno || '',
        _id: initialData._id
      });
    } else {
      // Reset form when no initial data
      setFormData({
        firstname: '',
        lastname: '',
        rollno: '',
        phoneno: ''
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.firstname || !formData.lastname || !formData.rollno || !formData.phoneno) {
      alert('Please fill in all fields');
      return;
    }

    // Determine if we're editing or creating
    const isEditing = !!formData.rollno;
    
    // Call the onSubmit prop with form data and editing status
    onSubmit(formData, isEditing);
  };

  return (
    <div className="p-8 w-full">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="firstname" className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          />
        </div>
        <div>
          <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          />
        </div>
        <div>
          <label htmlFor="rollno" className="block text-sm font-medium text-gray-700">
            Roll No
          </label>
          <input
            type="text"
            id="rollno"
            name="rollno"
            value={formData.rollno}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          />
        </div>
        <div>
          <label htmlFor="phoneno" className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="tel"
            id="phoneno"
            name="phoneno"
            value={formData.phoneno}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          {formData._id ? 'Update' : 'Submit'}
        </button>
      </form>
    </div>
  );
}
