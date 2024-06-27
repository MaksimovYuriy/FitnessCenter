import { useNavigate } from "react-router-dom";
import auth_reg_form from "../components/auth";
import navbar from "../components/navbar";
import ResponsiveAppBar from "../components/navbar";
import AuthRegForm from "../components/auth";

function MainPage() {

    return (
        <>
            <ResponsiveAppBar/>
            <AuthRegForm/>
        </>
    )
}

export default MainPage;