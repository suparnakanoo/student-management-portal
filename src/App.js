import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddStudent from './components/AddStudent';
import SearchStudent from './components/SearchStudent';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/add-student" element={<AddStudent />} />
          <Route path="/search-student" element={<SearchStudent />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
