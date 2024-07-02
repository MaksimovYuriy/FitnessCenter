import { Box, Button, Container, Divider, FormControl, InputLabel, MenuItem, Select, Stack, TableCell, TableHead, TableRow, Typography, formControlClasses } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import axios from "axios";
import { Dayjs } from 'dayjs';
import { useEffect, useState } from "react";
import { freeCoach, makeTrainModel, nextTrainModel } from "../models/models";
import { json } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { UserState } from "../redux/user";
import { RootState } from "../redux/store";

function TimeTable() {

    const selector: UserState = useAppSelector((state: RootState) => state.user)

    const [date, setDate] = useState<Dayjs | null>()

    const [update, setUpdate] = useState<boolean>(false)
    const [makeTrain, setMakeTrain] = useState<boolean>(false)

    const [freeTypes, setFreeTypes] = useState<number[] | null>()
    const [freeCoaches, setFreeCoaches] = useState<freeCoach[] | null>()

    const [selectCoach, setSelectCoach] = useState<freeCoach | null>()
    const [selectType, setSelectType] = useState<number>(0)

    const [nextButton, setNextButton] = useState<boolean>(false)
    const [nextTrain, setNextTrain] = useState<nextTrainModel>()

    useEffect(() => {
        let d = date?.format('YYYY-MM-DD')
        axios.get("https://localhost:7141/API/SelectDate?date=" + d + "&userID=" + selector.Id, {})
            .then(response => 
                setFreeCoaches(response.data)
            )
            .catch(() => setFreeCoaches(null))
    }, [update])

    useEffect(() => {
        if (selectCoach == null || selectCoach == undefined) {
            let array: number[] = []
            if (freeCoaches != null) {
                for (let item of freeCoaches) {
                    array.includes(item.typeId) == false ? array.push(item.typeId) : false
                }
            }
            setFreeTypes(array)
        }
    }, [freeCoaches])

    useEffect(() => {
        let d = date?.format('YYYY-MM-DD')
        let makeTrainData: makeTrainModel = { date: d!, user_id: selector.Id, coach_id: selectCoach?.id! }
        axios.post("https://localhost:7141/API/MakeTrain", makeTrainData, {})
            .then(response => console.log(response))
    }, [makeTrain])

    useEffect(() => {
        axios.get("https://localhost:7141/API/NextTrain?userId=" + selector.Id, {})
            .then((response) => {
                if (response.status == 200) {
                    setNextTrain(response.data)
                }
                else {
                    console.log("NotFound net train")
                }
            })
    }, [nextButton])

    return (
        <>
            <Box sx={{
                textAlign: "center"
            }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Дата"
                        defaultValue={date}
                        format="DD/MM/YYYY"
                        onChange={(newValue) => { setDate(newValue), setUpdate(!update) }}
                        sx={{
                            marginTop: 1,
                            marginBottom: 2
                        }} />
                </LocalizationProvider>
            </Box>

            <Stack spacing={2}>
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Запись на тренировку
                    </Typography>
                </Box>

                <FormControl fullWidth>
                    <InputLabel id="coach-select">Свободные тренеры</InputLabel>
                    <Select
                        labelId="coach-select"
                        id="coach-select"
                        label="Свободные тренеры"
                        value={selectCoach}
                        onChange={(e) => {
                            const coach = e.target.value as string
                            const parsed: string[] = coach.split(' ')
                            const findCoach = freeCoaches?.find((coach) => coach.name == parsed[0] && coach.surname == parsed[1])
                            if (findCoach != undefined && findCoach != null) {
                                setSelectCoach(findCoach)
                                setSelectType(findCoach.typeId)
                            }
                        }}
                    >
                        {
                            freeCoaches?.map((coach) => (
                                <MenuItem key={coach.id} value={coach.name + " " + coach.surname}>
                                    {coach.name + " " + coach.surname}
                                </MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>

                <FormControl fullWidth>
                    <InputLabel id="coach-type">Тип тренировки</InputLabel>
                    <Select
                        labelId="coach-type"
                        id="coach-type"
                        label="Тип тренировки"
                        value={selectType}
                        onChange={(e) => {
                            if (selectCoach == null || selectCoach == undefined) {
                                let finds = freeCoaches?.filter((coach) => coach.typeId == e.target.value)
                                if (finds != undefined) {
                                    setFreeCoaches(finds)
                                }
                            }
                            setSelectType(e.target.value as number)
                        }}
                    >
                        {
                            freeTypes?.map((type) => (
                                <MenuItem key={type} value={type}>
                                    {type}
                                </MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={() => setMakeTrain(!makeTrain)}
                >
                    Записаться
                </Button>
            </Stack>

            <Stack spacing={2}>
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={() => setNextButton(!nextButton)}
                    >
                        Показать следующую тренировку
                    </Button>
                </Box>
                <Container>
                    <Typography component="h1" variant="h5">
                        Дата
                    </Typography>
                    <Typography component="h1" variant="h5">
                        {nextTrain?.date}
                    </Typography>
                </Container>

                <Divider orientation="horizontal" flexItem />

                <Container>
                    <Typography component="h1" variant="h5">
                        Тренер
                    </Typography>
                    <Typography component="h1" variant="h5">
                        {nextTrain?.coach}
                    </Typography>
                </Container>

                <Divider orientation="horizontal" flexItem />

                <Container>
                    <Typography component="h1" variant="h5">
                        Направление
                    </Typography>
                    <Typography component="h1" variant="h5">
                        {nextTrain?.type}
                    </Typography>
                </Container>
            </Stack>
        </>
    )
}

export default TimeTable;