import { Button, Grid, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { UserState } from "../redux/user"
import { useAppSelector } from "../redux/hooks"
import { RootState } from "../redux/store"
import axios from "axios"
import { changeModel } from "../models/models"

function UserCard() {

    const [changeState, changeSetState] = useState<boolean>(false)
    const [confirmChangeState, confirmChangeSetState] = useState<boolean>(false)
    const selector: UserState = useAppSelector((state: RootState) => state.user)

    useEffect(() => {
        let changeData: changeModel = {
            jwtA: localStorage.getItem("AToken")!, jwtR: localStorage.getItem("RToken")!,
            id: selector.Id, name: nameState, surname: surnameState, email: emailState,
            phone: phoneState, genderID: genderIdState
        }
        axios.put("https://localhost:7141/API/ChangeUser", changeData, {})
            .then(response => console.log(response))
    }, [confirmChangeState])

    const [nameState, nameSetState] = useState<string>(selector.Name ?? "")
    const [surnameState, surnameSetState] = useState<string>(selector.Surname ?? "")
    const [emailState, emailSetState] = useState<string>(selector.Email ?? "")
    const [phoneState, phoneSetState] = useState<string>(selector.Phone ?? "")
    const [genderIdState, genderIdSetState] = useState<string>(selector.GenderID!.toString())

    return (
        <>
            <Grid container>
                <Grid item xs={3}>
                    <Typography align="center">
                        <p>
                            Имя + Фамилия
                            {changeState == false ?
                                <>
                                    <p className="item_info_value">{selector.Name}</p>
                                    <p className="item_info_value">{selector.Surname}</p>
                                </>
                                :
                                <>
                                    <TextField
                                        type="text"
                                        color="primary"
                                        size="small"
                                        defaultValue={selector.Name}
                                        onChange={(e) => nameSetState(e.target.value)}
                                    />
                                    <TextField
                                        type="text"
                                        color="primary"
                                        size="small"
                                        defaultValue={selector.Surname}
                                        onChange={(e) => surnameSetState(e.target.value)}
                                    />
                                </>
                            }
                        </p>

                        <p>
                            Электронная почта
                            {changeState == false ?
                                <p className="item_info_value">{selector.Email}</p>
                                :
                                <TextField
                                    type="text"
                                    color="primary"
                                    size="small"
                                    defaultValue={selector.Email}
                                    onChange={(e) => emailSetState(e.target.value)}
                                />
                            }
                        </p>
                    </Typography>
                </Grid>

                <Grid item xs={3}>
                    <Typography align="center">
                        <p>
                            Номер телефона
                            {changeState == false ?
                                <p className="item_info_value">{selector.Phone}</p>
                                :
                                <TextField
                                    type="text"
                                    color="primary"
                                    size="small"
                                    defaultValue={selector.Phone}
                                    onChange={(e) => phoneSetState(e.target.value)}
                                />
                            }
                        </p>

                        <p>
                            Пол
                            {changeState == false ?
                                <p className="item_info_value">{selector.GenderID}</p>
                                :
                                <TextField
                                    type="text"
                                    color="primary"
                                    size="small"
                                    defaultValue={selector.GenderID}
                                    onChange={(e) => genderIdSetState(e.target.value)}
                                />
                            }
                        </p>
                    </Typography>
                </Grid>

                <Grid item xs={3}>
                    <Typography align="center">
                        <p>
                            Уровень программа лояльности
                            {changeState == false ?
                                <p className="item_info_value">{selector.LoyaltyID}</p>
                                :
                                <TextField
                                    type="text"
                                    color="primary"
                                    size="small"
                                    defaultValue={selector.LoyaltyID}
                                />
                            }
                        </p>

                        <p>
                            Бонусы
                            {changeState == false ?
                                <p className="item_info_value">{selector.Scores}</p>
                                :
                                <TextField
                                    type="text"
                                    color="primary"
                                    size="small"
                                    defaultValue={selector.Scores}
                                />
                            }
                        </p>
                    </Typography>
                </Grid>

                <Grid item xs={3} >
                    <Typography align="center">
                        <p>
                            Абонемент
                            {changeState == false ?
                                <p className="item_info_value">{selector.SubID}</p>
                                :
                                <TextField
                                    type="text"
                                    color="primary"
                                    size="small"
                                    defaultValue={selector.SubID}
                                />
                            }
                        </p>

                        <p>
                            Клуб
                            {changeState == false ?
                                <p className="item_info_value">{selector.ClubID}</p>
                                :
                                <TextField
                                    type="text"
                                    color="primary"
                                    size="small"
                                    defaultValue={selector.ClubID}
                                />
                            }
                        </p>
                    </Typography>
                </Grid>
            </Grid>
            {
                changeState == true ?
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={() => {
                            confirmChangeSetState(!confirmChangeState)
                            changeSetState(false)
                        }}
                    >
                        Сохранить
                    </Button> : false
            }
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => {
                    changeState == false ? changeSetState(true) : changeSetState(false)
                }}
            >
                {changeState == false ? "Изменить данные" : "Отменить"}
            </Button>
        </>
    )
}

export default UserCard