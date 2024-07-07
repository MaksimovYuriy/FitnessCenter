import { useEffect } from "react";
import Logout from "../components/logout";
import ResponsiveAppBar from "../components/navbar";
import navbar from "../components/navbar";
import { useAppDispatch } from "../redux/hooks";
import { logout } from "../redux/user";
import { useNavigate } from "react-router-dom";
import UserCard from "../components/usercard";
import TimeTable from "../components/timetable";
import Calculator from "../components/calculator";
import { Stack } from "@mui/material";
import Bodytest from "../components/bodytest";
import ProfileNavbar from "../components/profile_navbar";

function ProfilePage() {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem("AToken") == null || localStorage.getItem("AToken") == undefined) {
            dispatch(logout())
            navigate("/")
        }
    }, [])

    return (
        <Stack spacing={2}>
            <ResponsiveAppBar />
            <ProfileNavbar />
            <UserCard />
            <Logout />
        </Stack>
    )
}

export default ProfilePage;