import { useNavigate } from "react-router-dom";
import auth_reg_form from "../components/auth";
import navbar from "../components/navbar";
import ResponsiveAppBar from "../components/navbar";
import AuthRegForm from "../components/auth";
import { Stack } from "@mui/material";
import { useEffect } from "react";
import { login } from "../redux/user";
import { useAppDispatch } from "../redux/hooks";

function MainPage() {
    return (
        <Stack spacing={2} alignItems={"center"}>
            <ResponsiveAppBar/>
            <AuthRegForm/>
        </Stack>
    )
}

export default MainPage
