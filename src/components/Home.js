import React, { useState } from 'react'
import AddStudent from './AddStudent'
import SearchStudent from './SearchStudent'

function Home() {
  const [showModal, setShowModal] = useState(false)
  const [search, setSearch] = useState(false)


  return (
    <div className='h-screen flex flex-col  items-center bg-gray-200'>
        <h1 className=' text-xl md:text-2xl xl:text-4xl font-extrabold my-4'>Student Management Dashboard</h1>
        <div className='flex flex-col md:flex-row xl:flex-row gap-2'>
            <button className='bg-indigo-700 px-5 py-2 rounded-md text-zinc-50' onClick={() => setShowModal(true)}>Add Student</button>
            {showModal&&<AddStudent onClose={() => setShowModal(false)}/>}
            
            <button className='bg-purple-700 px-5 py-2 rounded-md text-zinc-50' onClick={() => setSearch(!search)}>
            {search ? 'Close Search' : 'Search'}
            </button>
        </div>
        {search&&<SearchStudent/>}
    </div>
  )
}

export default Home
