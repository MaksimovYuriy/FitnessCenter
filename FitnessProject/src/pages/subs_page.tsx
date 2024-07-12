import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "../redux/hooks"
import { useEffect } from "react"
import { logout } from "../redux/user"
import { Stack } from "@mui/material"
import ResponsiveAppBar from "../components/navbar"
import Subs from "../components/subs"

function SubsPage(){

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    return(
        <Stack spacing={2}>
            <ResponsiveAppBar />
            <Subs />
        </Stack>
    )
}

export default SubsPage