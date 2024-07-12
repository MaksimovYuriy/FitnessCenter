import { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import { Box, Button, Container, Typography } from '@mui/material';
import { regCheck } from '../scripts/regCheck';
import axios from 'axios'
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { UserState, login } from '../redux/user';
import { RootState } from '../redux/store';
import { useNavigate } from 'react-router-dom';
import { authModel, regModel } from '../models/models';

function AuthRegForm() {

    const dispatch = useAppDispatch()
    const selector: UserState = useAppSelector((state: RootState) => state.user)
    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem("AToken") != null && localStorage.getItem("AToken") != undefined) {
          let data: string = localStorage.getItem("AToken")!
          dispatch(login(data))
          navigate("/profile")
        }
      }, [])

    const [accountState, accountSetState] = useState<boolean>(true)

    const [registrationState, registrationSetState] = useState<boolean>(false);
    const [loginState, loginSetState] = useState<boolean>(false);

    const [emailLoginState, emailLoginSetState] = useState<string>("")
    const [passwordLoginState, passwordLoginSetState] = useState<string>("")

    const [emailState, emailSetState] = useState<string>("")
    const [phoneState, phoneSetState] = useState<string>("")
    const [passwordFirstState, passwordFirstSetState] = useState<string>("")
    const [passwordSecondState, passwordSecondSetState] = useState<string>("")

    useEffect(() => {
        if (regCheck(emailState!, phoneState!, passwordFirstState!, passwordSecondState!)) {
            let regData: regModel = { email: emailState!, phone: phoneState!, password: passwordFirstState! }
            axios.post("https://localhost:7141/API/Registration", regData, {})
                .then((response) => console.log(response))
        }
        else {
            console.log("Введите данные!")
        }
    }, [registrationState])

    useEffect(() => {
        let authData: authModel = { email: emailLoginState!, password: passwordLoginState! }
        axios.post("https://localhost:7141/API/Authorization", authData, {})
            .then((response) => {
                if (response.status == 200) {
                    localStorage.setItem("AToken", response.data[0])
                    localStorage.setItem("RToken", response.data[1])
                    dispatch(login(response.data[0]))
                    navigate("/profile")
                }
                else{
                    console.log("Wrong login or password!")
                }
            })
    }, [loginState])

    if (accountState == true) {
        return (
            <>
                <Container component="main" maxWidth="xs">
                    <Box
                        sx={{
                            marginTop: 8,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <Typography component="h1" variant="h5">
                            Вход в личный кабинет
                        </Typography>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={(e) => emailLoginSetState(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={(e) => passwordLoginSetState(e.target.value)}
                        />
                    </Box>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={() => loginSetState(!loginState)}
                    >
                        Войти
                    </Button>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={() => accountSetState(false)}
                    >
                        Ещё нет аккаунта?
                    </Button>
                </Container>
            </>
        )
    }
    else {
        return (
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Регистрация
                    </Typography>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Адрес электронной почты"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={(e) => emailSetState(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Номер телефона"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={(e) => phoneSetState(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Пароль"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={(e) => passwordFirstSetState(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Подтверждение пароля"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={(e) => passwordSecondSetState(e.target.value)}
                    />
                </Box>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={() => registrationSetState(!registrationState)}
                >
                    Зарегистрироваться
                </Button>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={() => accountSetState(true)}
                >
                    Уже есть аккаунт?
                </Button>
            </Container>
        )
    }
}

export default AuthRegForm;