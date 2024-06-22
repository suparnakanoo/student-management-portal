import React, { useState } from 'react';
import axios from 'axios';
import { X } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';


const AddStudent = ({onClose}) => {
  const [student, setStudent] = useState({
    firstName: '',
    lastName: '',
    studentID: '',
    course: '',
    email: '',
    phone: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/students', student);
      setStudent({
        firstName: '',
        lastName: '',
        studentID: '',
        course: '',
        email: '',
        phone: ''
      });
      toast.success('Student added successfully!');
    } catch (error) {
      console.error('Error adding student', error);
    }
  };

  return (
    <div  className='fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm felx justify-center items-center'>
      <div className='mt-10 flex flex-col justify-center'>
        <button className='place-self-end' onClick={onClose}><X className='text-zinc-50'/></button>
        <div className='flex flex-col items-center bg-indigo-700 m-auto px-5 py-10 w-96 rounded-lg'>
          <h1 className='text-2xl text-zinc-50 font-bold mb-4'>Student Details</h1>
          <form onSubmit={handleSubmit} className='flex flex-col'>
            <input  className='p-2 mb-4 rounded-md w-80 focus:outline-none focus:ring focus:border-blue-500'type="text" name="firstName" placeholder="First Name" value={student.firstName} onChange={handleChange} required />
            <input  className='p-2 mb-4 rounded-md w-80 focus:outline-none focus:ring focus:border-blue-500'type="text" name="lastName" placeholder="Last Name" value={student.lastName} onChange={handleChange} required />
            <input  className='p-2 mb-4 rounded-md w-80 focus:outline-none focus:ring focus:border-blue-500'type="text" name="studentID" placeholder="Student ID" value={student.studentID} onChange={handleChange} required />
            <input  className='p-2 mb-4 rounded-md w-80 focus:outline-none focus:ring focus:border-blue-500'type="text" name="course" placeholder="Course" value={student.course} onChange={handleChange} required />
            <input  className='p-2 mb-4 rounded-md w-80 focus:outline-none focus:ring focus:border-blue-500'type="email" name="email" placeholder="Email" value={student.email} onChange={handleChange} required />
            <input  className='p-2 mb-4 rounded-md w-80 focus:outline-none focus:ring focus:border-blue-500'type="text" name="phone" placeholder="Phone Number" value={student.phone} onChange={handleChange} required />
            <button type="submit" className='text-zinc-50 bg-green-600 hover:bg-green-700 px-5 py-2 rounded-md'>Add Student</button>
          </form>
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default AddStudent;
