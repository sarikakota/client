// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddUser from './components/Adduser';
import UserTable from './components/Usertable';
import EditUser from './components/Edituser';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<UserTable />} />
                <Route path="/add" element={<AddUser />} />
                <Route path="/edit/:id" element={<EditUser />} />
            </Routes>
        </Router>
    );
};

export default App;
