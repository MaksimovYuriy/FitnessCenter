import { useEffect } from "react";
import Logout from "../components/logout";
import ResponsiveAppBar from "../components/navbar";
import navbar from "../components/navbar";
import { useAppDispatch } from "../redux/hooks";
import { logout } from "../redux/user";
import { useNavigate } from "react-router-dom";
import UserCard from "../components/usercard";

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
        <>
            <ResponsiveAppBar />
            <UserCard />
            <Logout />
        </>
    )
}

export default ProfilePage;