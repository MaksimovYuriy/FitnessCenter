import { Button, responsiveFontSizes, TextField, Typography } from "@mui/material";
import { Box, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { isIntegerOrFractionalNumber } from "../scripts/regExp";
import { bodytestModel, chartDataModel } from "../models/models";
import { bonus, logout, UserState } from "../redux/user";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/store";
import axios from "axios";
import { LineChart } from '@mui/x-charts/LineChart';
import { dates, series } from "../models/datasets";
import { ChartParse } from "../scripts/chartParse";
import { useNavigate } from "react-router-dom";

function Bodytest() {

    const selector: UserState = useAppSelector((state: RootState) => state.user)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const [currentWeight, setCurrentWeight] = useState<string>("")
    const [currentFat, setCurrentFat] = useState<string>("")

    const [resultButton, setResultButton] = useState<boolean>(false)
    const [chartButton, setChartButton] = useState<boolean>(false)

    const [chartKeys, setChartKeys] = useState<Date[]>([])
    const [chartValuesWeight, setChartValuesWeight] = useState<number[]>([])
    const [chartValuesFat, setChartValuesFat] = useState<number[]>([])

    useEffect(() => {
        if (isIntegerOrFractionalNumber(currentWeight) && isIntegerOrFractionalNumber(currentFat)) {
            const data: bodytestModel = {
                userId: selector.Id,
                weight: Number(currentWeight),
                fat: Number(currentFat)
            }
            axios.post("https://localhost:7141/API/AddBodytest", data, {})
                .then(response => {
                    if (response.status == 401) {
                        dispatch(logout())
                        navigate("/auth")
                    }
                    else {
                        console.log(response);
                        dispatch(bonus(10));
                        alert("Вы получили 10 баллов!");
                        return response
                    }
                }
                )
                .catch((error) => {
                    if(error.response.status == 401){
                        dispatch(logout())
                        alert("Требуется повторная авторизация!")
                    }
                    else{
                        alert("Вы сегодня уже фиксировали результаты!")
                    }
                })
        }
        else {
            console.log("Числа через точку")
        }
    }, [resultButton])

    useEffect(() => {
        axios.get("https://localhost:7141/API/GetBodytest?userId=" + selector.Id)
            .then(response => {
                let data: chartDataModel[] = response.data
                let xData: Date[] = []
                let yDataWeight: number[] = []
                let yDataFat: number[] = []
                for (let item of data) {
                    const xParse = item.date.split(' ')
                    xData.push(new Date(Number(xParse[2]), Number(xParse[1]) - 1, Number(xParse[0])))
                    yDataWeight.push(item.weight)
                    yDataFat.push(item.fat)
                }
                setChartKeys(xData)
                setChartValuesWeight(yDataWeight)
                setChartValuesFat(yDataFat)
            })
    }, [chartButton])

    const valueFormatter = (date: Date) =>
        date.toLocaleDateString('sv', {
            month: '2-digit',
            day: '2-digit',
        })

    return (
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
                    Обновление данных по результатам тренировок
                </Typography>
            </Box>

            <TextField id="outlined-basic" label="Ваш вес (кг)" variant="outlined" onChange={(e) => setCurrentWeight(e.target.value)}>
                Ваш вес (кг)
            </TextField>

            <TextField id="outlined-basic" label="Ваш процент жира" variant="outlined" onChange={(e) => setCurrentFat(e.target.value)}>
                Ваш процент жира
            </TextField>

            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => { setResultButton(!resultButton) }}
            >
                Добавить результат
            </Button>

            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                }}
            >

                <LineChart
                    xAxis={[
                        {
                            data: chartKeys,
                            scaleType: 'time',
                            valueFormatter,
                        }
                    ]}
                    series={[
                        {
                            color: "#008000",
                            label: "Вес тела, кг",
                            data: chartValuesWeight
                        }
                    ]}
                    width={500}
                    height={300}
                />

                <LineChart
                    xAxis={[
                        {
                            data: chartKeys,
                            scaleType: 'time',
                            valueFormatter,
                        }
                    ]}
                    series={[
                        {
                            color: "#FFA500",
                            label: "Процент жира, %",
                            data: chartValuesFat
                        }
                    ]}
                    width={500}
                    height={300}
                />

            </Box>

            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => setChartButton(!chartButton)}
            >
                Построить графики изменений
            </Button>
        </Stack>
    )
}

export default Bodytest;