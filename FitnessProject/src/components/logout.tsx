import { Button } from "@mui/material";
import { useAppDispatch } from "../redux/hooks";
import { logout } from "../redux/user";
import { useNavigate } from "react-router-dom";

function Logout() {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    return (
        <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => {dispatch(logout()); navigate("/")}}
        >
           Выйти 
        </Button>
    )
}

export default Logout;