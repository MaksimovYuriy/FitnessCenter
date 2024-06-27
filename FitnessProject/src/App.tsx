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
      </Routes>
    </BrowserRouter>
  )
}

export default App
