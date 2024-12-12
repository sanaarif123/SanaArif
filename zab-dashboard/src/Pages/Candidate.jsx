import React, { useEffect, useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import CandidateDataTable from '../components/Datatables/CandidateDataTable';
import CandidateForm from '../components/CandidateForm';
import Modal from '../components/Modal';
import axios from 'axios';
import Swal from 'sweetalert2';
const BASE_URL= import.meta.env.BASE_URL

const Candidate = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [CandidateData, setCandidateData] = useState('')

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const getCandidateData= async()=>{
   try {
    const response=  await axios.get(`${BASE_URL}/api/candidates`);
    if(response.data){
      setCandidateData(response.data);
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
  }

  useEffect(() => {

   getCandidateData();
  }, [])
  

  const sampleData = [
    { id:1, name: "Jane Doe",
      description: "An experienced software engineer.",
      imageName: "jane_profile.jpg"},
      { id:2, name: "Jane Doe",
        description: "An experienced software engineer.",
        imageName: "jane_profile.jpg"},
        { id:3, name: "Jane Doe",
          description: "An experienced software engineer.",
          imageName: "jane_profile.jpg"},
  ];
  const openEditModal = (rowData) => {
    setSelectedRowData(rowData);
    setIsModalOpen(true);
  };
  const openModal = () => {
    setSelectedRowData('');
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRowData(null);
  };
  const handleEdit = (rowData) => {
    console.log("Editing row:", rowData);
    openEditModal(rowData)
  };

  const handleDelete = (rowData) => {
    console.log("Deleting row:", rowData);
    // Implement logic to confirm and delete the row
   
  };
  return (
    <div className={`flex min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <Sidebar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />

      <main className="flex-1 p-8">
        <div className={`overflow-x-auto  p-6 shadow-lg rounded-lg  ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-50 text-gray-900'}`}>
          <div className="flex justify-between mx-5">
            <h2 className="text-[20px] font-bold">Candidates</h2>
            <button 
              className="btn btn-primary"
              onClick={openModal}
            >
              Create
            </button>
          </div>
          <CandidateDataTable   data={CandidateData}
        isDarkMode={isDarkMode}
        onEdit={handleEdit}
        onDelete={handleDelete} />
        </div>

        <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2 className="text-lg font-bold mb-4">Candidates Information</h2>
        <CandidateForm
          initialData={selectedRowData} // Pass row data as props to the form
        />
      </Modal>
         
      </main>
    </div>
  );
}

export default Candidate;
