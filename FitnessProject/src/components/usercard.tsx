import { Button, FormControl, Grid, InputLabel, MenuItem, Select, stepButtonClasses, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { loyalty, UserState } from "../redux/user"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { RootState } from "../redux/store"
import axios from "axios"
import { addBonusModel, changeModel, getClubModel, getLoyaltyModel, getSubModel } from "../models/models"
import { clubs, genders, subs } from "../models/datasets"

function UserCard() {

    const [changeState, changeSetState] = useState<boolean>(false)
    const [confirmChangeState, confirmChangeSetState] = useState<boolean>(false)
    const [updateLoyalty, setUpdateLoyalty] = useState<boolean>(false)
    const selector: UserState = useAppSelector((state: RootState) => state.user)
    const dispatch = useAppDispatch()

    useEffect(() => {
        let changeData: changeModel = {
            jwtA: localStorage.getItem("AToken")!, jwtR: localStorage.getItem("RToken")!,
            id: selector.Id, age: ageState, name: nameState, surname: surnameState, email: emailState,
            phone: phoneState, genderID: genderIdState, scores: scores
        }
        console.log(changeData)
        axios.put("https://localhost:7141/API/ChangeUser", changeData, {})
            .then(response => console.log(response))
    }, [confirmChangeState])

    const [ageState, ageSetState] = useState<string>(selector.Age!.toString())
    const [nameState, nameSetState] = useState<string>(selector.Name ?? "")
    const [surnameState, surnameSetState] = useState<string>(selector.Surname ?? "")
    const [emailState, emailSetState] = useState<string>(selector.Email ?? "")
    const [phoneState, phoneSetState] = useState<string>(selector.Phone ?? "")
    const [genderIdState, genderIdSetState] = useState<string>(selector.GenderID!.toString())
    const [scores, setScores] = useState<string>(selector.Scores.toString())

    useEffect(() => {
        axios.get("https://localhost:7141/API/GetLoyalty?userId=" + selector.Id + "&scores=" + selector.Scores)
            .then(response => {
                let data: getLoyaltyModel = response.data
                dispatch(loyalty(data.id))
            })
    }, [updateLoyalty])

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

                        <p>
                            Возраст
                            {changeState == false ?
                                <p className="item_info_value">{selector.Age}</p>
                                :
                                <TextField
                                    type="text"
                                    color="primary"
                                    size="small"
                                    defaultValue={selector.Age}
                                    onChange={(e) => ageSetState(e.target.value)}
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
                                <p className="item_info_value">{genders[selector.GenderID!]}</p>
                                :
                                <FormControl fullWidth>
                                    <InputLabel id="gender">Пол</InputLabel>
                                    <Select
                                        labelId="gender"
                                        id="gender"
                                        label="Пол"
                                        defaultValue={genders[selector.GenderID!]}
                                        onChange={(e) => genderIdSetState(genders.indexOf(e.target.value).toString())}
                                    >

                                        <MenuItem key={1} value={genders[1]}>
                                            {genders[1]}
                                        </MenuItem>

                                        <MenuItem key={2} value={genders[2]}>
                                            {genders[2]}
                                        </MenuItem>

                                    </Select>
                                </FormControl>
                            }
                        </p>
                    </Typography>
                </Grid>

                <Grid item xs={3}>
                    <Typography align="center">
                        <p>
                            Уровень программы лояльности
                            <p className="item_info_value">{selector.LoyaltyID}</p>
                        </p>

                        <p>
                            Бонусы
                            <p className="item_info_value">{selector.Scores}</p>
                        </p>
                    </Typography>
                </Grid>

                <Grid item xs={3} >
                    <Typography align="center">
                        <p>
                            Абонемент
                            <p className="item_info_value">{subs[selector.SubID]}</p>
                        </p>

                        <p>
                            Клуб
                            <p className="item_info_value">{clubs[selector.ClubID]}</p>
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