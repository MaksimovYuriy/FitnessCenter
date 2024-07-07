import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "../redux/hooks"
import { useEffect } from "react"
import { logout } from "../redux/user"
import { Stack } from "@mui/material"
import ResponsiveAppBar from "../components/navbar"
import ProfileNavbar from "../components/profile_navbar"
import Logout from "../components/logout"
import TimeTable from "../components/timetable"

function ProfilePageTimetable() {

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
            <Logout />
            <TimeTable />
        </Stack>
    )
}

export default ProfilePageTimetable;