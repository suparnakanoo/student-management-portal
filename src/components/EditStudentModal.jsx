// EditStudentModal.jsx
import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    maxWidth: '600px',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    background: '#fff',
  },
};

Modal.setAppElement('#root'); // Set the root element for accessibility

const EditStudentModal = ({ isOpen, onClose, student }) => {
  const [editedStudent, setEditedStudent] = useState(student); // Initialize editedStudent state with current student details

  const handleChange = (e) => {
    setEditedStudent({
      ...editedStudent,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(`http://localhost:5000/students/${editedStudent._id}`, editedStudent);
      console.log('Updated student details:', response.data);
      onClose(); // Close the modal after successful update
      toast.success('Details updated successfully!');
    } catch (error) {
      console.error('Error updating student:', error);
      // Handle error (e.g., show error message)
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="Edit Student Modal"
    >
      <h2 className='text-2xl font-bold my-2'>Edit Student Details</h2>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input 
            className='w-full bg-gray-200 p-2 rounded-md mt-2'
            type="text"
            name="firstName"
            value={editedStudent.firstName}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Last Name:
          <input
          className='w-full bg-gray-200 p-2 rounded-md mt-2'
            type="text"
            name="lastName"
            value={editedStudent.lastName}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Student ID:
          <input
          className='w-full bg-gray-200 p-2 rounded-md mt-2'
            type="text"
            name="studentID"
            value={editedStudent.studentID}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Course:
          <input
          className='w-full bg-gray-200 p-2 rounded-md mt-2'
            type="text"
            name="course"
            value={editedStudent.course}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Email:
          <input
          className='w-full bg-gray-200 p-2 rounded-md mt-2'
            type="text"
            name="email"
            value={editedStudent.email}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Phone:
          <input
          className='w-full bg-gray-200 p-2 rounded-md mt-2'
            type="text"
            name="phone"
            value={editedStudent.phone}
            onChange={handleChange}
          />
        </label>
        <br />
        <div className='flex items-center justify-center my-4'>
        <button type="submit" className='bg-green-600 py-2 px-5 rounded-md '>Save Changes</button>
        </div>
      </form>
      <Toaster position='top-center' reverseOrder={false} />
    </Modal>
  );
};

export default EditStudentModal;
