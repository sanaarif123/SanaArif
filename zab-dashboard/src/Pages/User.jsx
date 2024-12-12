import React, { useEffect, useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import UserDataTable from '../components/Datatables/UserDataTable';
import UserForm from '../components/UserForm';
import Modal from '../components/Modal';
import axios from 'axios';
import Swal from 'sweetalert2';
const BASE_URL= import.meta.env.BASE_URL;
const User = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [userData, setUserData] = useState([]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const openEditModal = (rowData) => {
    setSelectedRowData(rowData);
    setIsModalOpen(true);
  };

  const openModal = () => {
    setSelectedRowData(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRowData(null);
  };

  const getUsers = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/users`);
      if (response.data) {
        setUserData(response.data);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      Swal.fire({
        title: 'Error',
        text: 'Failed to fetch user data',
        icon: 'error',
        showConfirmButton: false,
        timer: 1500
      });
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleEdit = (rowData) => {
    openEditModal(rowData);
  };

  const handleDelete = async (rowData) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'You won\'t be able to revert this!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      });

      if (result.isConfirmed) {
        await axios.delete(`${BASE_URL}/api/users/${rowData.rollno}`);
        
        Swal.fire({
          title: 'Deleted!',
          text: 'User has been deleted.',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500
        });

        // Refresh the user list
        getUsers();
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      Swal.fire({
        title: 'Error',
        text: 'Failed to delete user',
        icon: 'error',
        showConfirmButton: false,
        timer: 1500
      });
    }
  };

  const handleUserSubmit = async (formData, isEditing) => {
    isEditing = selectedRowData !== null;
    try {
      let response;
      console.log(isEditing);
      if (isEditing) {
        // Update existing user
        response = await axios.put(`${BASE_URL}/api/users/${formData.rollno}`, formData);
      } else {
        // Create new user
        response = await axios.post(`${BASE_URL}/api/users`, formData);
      }

      if (response) {
        Swal.fire({
          title: 'Success',
          text: isEditing ? 'User updated successfully' : 'User created successfully',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500
        });

        // Refresh the user list
        getUsers();
        // Close the modal
        closeModal();
      }
    } catch (error) {
      console.error('Error saving user:', error);
      Swal.fire({
        title: 'Error',
        text: isEditing ? 'Failed to update user' : 'Failed to create user',
        icon: 'error',
        showConfirmButton: false,
        timer: 1500
      });
    }
  };

  return (
    <div className={`flex min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <Sidebar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />

      <main className="flex-1 p-8">
        <div className={`overflow-x-auto p-6 shadow-lg rounded-lg ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-50 text-gray-900'}`}>
          <div className="flex justify-between mx-5">
            <h2 className="text-[20px] font-bold">Students</h2>
            <button 
              className="btn btn-primary"
              onClick={openModal}
            >
              Create
            </button>
          </div>
          <UserDataTable
            data={userData}
            isDarkMode={isDarkMode}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
          
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <h2 className="text-lg font-bold mb-4">
            {selectedRowData ? 'Edit Student' : 'Add New Student'}
          </h2>
          <UserForm
            initialData={selectedRowData}
            onSubmit={handleUserSubmit}
          />
        </Modal>
      </main>
    </div>
  );
};

export default User;
