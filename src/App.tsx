import React from 'react'
import './App.css'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ResumeEditor from './editor/ResumeEditor'
import ResumePage from './ResumePage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/editor' element={<ResumeEditor />} />
        <Route path='/theme/:themeName' element={<ResumePage />} />
        <Route path='/' element={<ResumePage />} />
      </Routes>
    </BrowserRouter>
  )
}
