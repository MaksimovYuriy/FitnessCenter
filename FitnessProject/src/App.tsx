import { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import { Box, Button, Container, Typography } from '@mui/material';
import auth_reg_form from './components/auth';
import navbar from './components/navbar';
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import MainPage from './pages/main_page';
import ProfilePage from './pages/profile_page';
import { useAppDispatch } from './redux/hooks';
import { login } from './redux/user';
import ProfilePageTimetable from './pages/profile_page_timetable';
import ProfilePageCalculator from './pages/profile_page_calculator';
import ProfilePageBodytest from './pages/profile_page_bodytest';


function App() {

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (localStorage.getItem("AToken") != null && localStorage.getItem("AToken") != undefined) {
      let data: string = localStorage.getItem("AToken")!
      dispatch(login(data))
    }
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<MainPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profile/timetable" element={<ProfilePageTimetable/>}/>
        <Route path="/profile/calculator" element={<ProfilePageCalculator/>}/>
        <Route path="/profile/bodytest" element={<ProfilePageBodytest/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
