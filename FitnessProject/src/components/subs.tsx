import { useEffect, useState } from "react"
import { getClubModel, getSubModel, setSubModel } from "../models/models"
import axios from "axios"
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from "@mui/material"
import { logout, UserState } from "../redux/user"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { RootState } from "../redux/store"

function Subs() {

    const dispatch = useAppDispatch()
    const selector: UserState = useAppSelector((state: RootState) => state.user)
    const [allSubs, setAllSubs] = useState<getSubModel[]>()
    const [allClubs, setAllClubs] = useState<getClubModel[]>()

    const [selectedClub, setSelectedClub] = useState<getClubModel>()

    useEffect(() => {
        console.log(selectedClub)
    }, [selectedClub])

    useEffect(() => {
        axios.get("https://localhost:7141/API/GetSub", {})
            .then(response => {
                setAllSubs(response.data)
            })
        axios.get("https://localhost:7141/API/GetClub", {})
            .then(response => {
                setAllClubs(response.data)
            })
    }, [])

    return (
        <>
            <FormControl fullWidth>
                <InputLabel id="club-id">Клуб</InputLabel>
                <Select
                    labelId="club-id"
                    id="club-id"
                    label="Клуб"
                    value={selectedClub}
                    onChange={(e) => {
                        setSelectedClub(allClubs?.find(item => item.name === e.target.value))
                    }}
                >
                    {allClubs?.map((item) => (
                        <MenuItem key={item.id} value={item.name}>
                            {item.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Grid container spacing={2}>
                {allSubs?.map((sub) => (
                    <Grid item xs={3} key={sub.id}>
                        <Typography align="center">
                            <h3>{sub.name}</h3>
                            <span>{sub.price}</span>
                            <p>{sub.description}</p>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={() => {
                                    if (localStorage.getItem("AToken") == null || localStorage.getItem("AToken") == undefined) {
                                        dispatch(logout())
                                        console.log("Авторизируйтесь!")
                                    }
                                    else {
                                        if (selectedClub != undefined) {
                                            let data: setSubModel = { userId: selector.Id, subId: sub.id, clubId: selectedClub.id }
                                            axios.put("https://localhost:7141/API/SetSub", data, {})
                                                .then(response => console.log(response))
                                        }
                                        else{
                                            console.log("Выберите клуб!")
                                        }
                                    }
                                }}
                            >
                                Купить абонемент
                            </Button>
                        </Typography>
                    </Grid>
                ))}
            </Grid>
        </>
    )
}

export default Subs