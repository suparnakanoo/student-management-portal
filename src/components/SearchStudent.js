import React, { useState } from 'react';
import axios from 'axios';
import { Search ,Edit2, Trash } from 'lucide-react';
import EditStudentModal from './EditStudentModal'
import toast, { Toaster } from 'react-hot-toast';

const SearchStudent = () => {
  const [query, setQuery] = useState('');
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null); // State to hold selected student for editing
  const [modalIsOpen, setModalIsOpen] = useState(false); // State to manage modal visibility

  const openModal = (student) => {
    setSelectedStudent(student);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  
  const handleSearch = async (e) => {
    e.preventDefault();
    if (query.trim() === '') {
      setStudents([]);
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5000/students?search=${query}`);
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
      setStudents([]);
    }
  };

  const handleEdit = (studentId) => {
    const student = students.find(student => student._id === studentId);
    openModal(student);
  };

  const handleDelete = async (studentId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/students/${studentId}`);
      console.log('Student deleted:', response.data);
      // Filter out the deleted student from the local state
      setStudents(students.filter(student => student._id !== studentId));
      toast.success('Student deleted successfully!');
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };


  return (
    <div className='mt-5'>
      <form onSubmit={handleSearch}>
        <div className='bg-purple-600 rounded-full pr-2 flex flex-row w-96'>
        <div className='w-80'>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by First Name, Last Name, or Student ID"
          className='w-80 p-2 rounded-full focus:outline-none focus:outline-purple-400'
        />
        </div>
        <div className='flex justify-center items-center pl-2'>
        <button type="submit" className=''><Search className='text-zinc-50'/></button>
        </div>
        </div>
      </form>
      {students.length > 0 && (
        <table className='mt-5 w-full border-collapse bg-gradient-to-tr from-purple-500 to-purple-300'>
          <thead className=''>
            <tr>
              <th className='p-4 border border-purple-50'>First Name</th>
              <th className='p-4 border border-purple-50 hidden sm:table-cell'>Last Name</th>
              <th className='p-4 border border-purple-50'>Student ID</th>
              <th className='p-4 border border-purple-50 hidden md:table-cell'>Course</th>
              <th className='p-4 border border-purple-50 hidden md:table-cell'>Email</th>
              <th className='p-4 border border-purple-50 hidden md:table-cell'>Phone</th>
              <th className='p-4 border border-purple-50'>Edit</th>
              <th className='p-4 border border-purple-50'>Delete</th>
            </tr>
          </thead>
          <tbody className=''>
            {students.map(student => (
              <tr key={student._id}>
                <td className='p-4 border border-purple-50'>{student.firstName}</td>
                <td className='p-4 border border-purple-50 hidden sm:table-cell'>{student.lastName}</td>
                <td className='p-4 border border-purple-50'>{student.studentID}</td>
                <td className='p-4 border border-purple-50 hidden md:table-cell'>{student.course}</td>
                <td className='p-4 border border-purple-50 hidden md:table-cell'>{student.email}</td>
                <td className='p-4 border border-purple-50 hidden md:table-cell'>{student.phone}</td>
                <td className='p-4 border border-purple-50'>
                  <Edit2 onClick={() => handleEdit(student._id)} className='cursor-pointer mr-2 text-zinc-200' /> 
                </td>
                <td className='p-4 border border-purple-50'>
                  <Trash onClick={() => handleDelete(student._id)}  className='cursor-pointer text-zinc-200' />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {/* Render modal only when selectedStudent is not null */}
      {selectedStudent && (
        <EditStudentModal
          isOpen={modalIsOpen}
          onClose={closeModal}
          student={selectedStudent}
        />
      )}
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default SearchStudent;

