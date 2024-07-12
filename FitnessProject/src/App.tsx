import { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import { Box, Button, Container, Typography } from '@mui/material';
import auth_reg_form from './components/auth';
import navbar from './components/navbar';
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import ProfilePage from './pages/profile_page';
import { useAppDispatch } from './redux/hooks';
import { login } from './redux/user';
import ProfilePageTimetable from './pages/profile_page_timetable';
import ProfilePageCalculator from './pages/profile_page_calculator';
import ProfilePageBodytest from './pages/profile_page_bodytest';
import SubsPage from './pages/subs_page';
import MainPage from './pages/main_page';
import NewsPage from './pages/news_page';
import ClubsPage from './pages/clubs_page';
import TrainingsPage from './pages/trainings_page';
import ContactsPage from './pages/contacts_page';


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
        <Route path="/" element={<Navigate to="/news" />} />
        <Route path="/auth" element={<MainPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profile/timetable" element={<ProfilePageTimetable/>}/>
        <Route path="/profile/calculator" element={<ProfilePageCalculator/>}/>
        <Route path="/profile/bodytest" element={<ProfilePageBodytest/>}/>
        <Route path="/subs" element={<SubsPage/>}/>
        <Route path="/news" element={<NewsPage/>}/>
        <Route path="/clubsinfo" element={<ClubsPage/>}/>
        <Route path="/trainings" element={<TrainingsPage/>}/>
        <Route path="/contacts" element={<ContactsPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
