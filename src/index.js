import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import UsersTable from './components/UsersTable'
import User from './components/User'
import './globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route exact path='/' element={<UsersTable/>}/>
        <Route path='/users/:id' element={<User/>}/>
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
