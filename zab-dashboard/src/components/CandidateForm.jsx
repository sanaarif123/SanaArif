import React, { useState, useRef } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
const BASE_URL= import.meta.env.BASE_URL
export default function CandidateForm({ initialData, onSuccess }) {
  
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    description: initialData?.description || '',
    image: initialData?.image || '',
    _id: initialData?._id || '',
  });
  const [imageFile, setImageFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);

      // Create a preview of the image
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          image: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async () => {
    if (!imageFile) return null;
  
    const formData = new FormData();
    formData.append('image', imageFile);
  
    try {
      const response = await axios.post(`${BASE_URL}/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return response.data.filePath; // Assuming the backend returns the file path
    } catch (error) {
      console.error('Image upload error:', error);
      Swal.fire({
        title: 'Upload Error',
        text: 'Failed to upload image',
        icon: 'error',
        showConfirmButton: false,
        timer: 1500,
      });
      return null;
    }
  };
  

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      // Upload image if a new file is selected
      let imagePath = formData.image;
      if (imageFile) {
        const uploadedImagePath = await uploadImage();
        if (uploadedImagePath) {
          imagePath = uploadedImagePath;
        } else {
          return; // Stop submission if image upload fails
        }
      }

      const dataToSubmit = {
        name: formData.name,
        description: formData.description,
        image: imagePath
      };

      const baseUrl = `${BASE_URL}/api/candidates`;
      let response;

      if (formData._id) {
        // Update existing candidate
        response = await axios.put(`${baseUrl}/${formData._id}`, dataToSubmit);
      } else {
        // Create new candidate
        response = await axios.post(baseUrl, dataToSubmit);
      }

      if (response.data) {
        Swal.fire({
          title: 'Success',
          text: formData._id
            ? 'Candidate updated successfully'
            : 'Candidate created successfully',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500,
        });

        // Reset form and image state
        setFormData({
          name: '',
          description: '',
          image: '',
          _id: '',
        });
        setImageFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }

        onSuccess?.();
      }
    } catch (error) {
      console.error('Error submitting candidate:', error);
      Swal.fire({
        title: 'Error',
        text: formData._id
          ? 'Failed to update candidate'
          : 'Failed to create candidate',
        icon: 'error',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handleImageRemove = () => {
    setFormData((prev) => ({
      ...prev,
      image: '',
    }));
    setImageFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="p-8 w-full max-w-md mx-auto">
      <form className="space-y-6" onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            placeholder="Tell us about the candidate..."
            value={formData.description}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          ></textarea>
        </div>

        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">
            Profile Image
          </label>
          <div className="mt-1 flex items-center">
            <input
              type="file"
              id="image"
              name="image"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            />
            {formData.image && (
              <button
                type="button"
                onClick={handleImageRemove}
                className="ml-2 text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            )}
          </div>
          
          {formData.image && (
            <div className="mt-4 flex justify-center">
              <img 
                src={formData.image} 
                alt="Preview" 
                className="h-40 w-40 object-cover rounded-full border-2 border-gray-300"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {formData._id ? 'Update Candidate' : 'Create Candidate'}
        </button>
      </form>
    </div>
  );
}