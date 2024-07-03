import { Box, Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getTotalKcal } from "../scripts/totalKcal";
import { regCheck } from "../scripts/regCheck";
import { isIntegerOrFractionalNumber, regex } from "../scripts/regExp";
import { UserState } from "../redux/user";
import { useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/store";
import { genders } from "../models/datasets";

function Calculator() {

    const selector: UserState = useAppSelector((state: RootState) => state.user)

    const [weight, setWeight] = useState<string>("")
    const [height, setHeight] = useState<string>("")
    const [selectActivity, setSelectActivity] = useState<string>("")
    const [selectAim, setSelectAim] = useState<string>("")


    const [calculationButton, setCalculationButton] = useState<boolean>(false)
    const [totalKcal, setTotalKcal] = useState<number>(0)

    useEffect(() => {
        if (isIntegerOrFractionalNumber(weight) && isIntegerOrFractionalNumber(height)) {
            let result = getTotalKcal(
                Number(weight),
                Number(height),
                selector.Age!,
                selectActivity,
                genders[selector.GenderID!]!,
                selectAim
            )
            result = Number(result.toFixed(0))
            setTotalKcal(result)
        }
        else {
            console.log("Дробные числа через точку!")
        }
    }, [calculationButton])

    useEffect(() => {
        console.log(totalKcal)
    }, [totalKcal])

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
                    Калькулятор калорий
                </Typography>
            </Box>

            <TextField id="outlined-basic" label="Ваш вес (кг)" variant="outlined" onChange={(e) => setWeight(e.target.value)}>
                Ваш вес (кг)
            </TextField>

            <TextField id="outlined-basic" label="Ваш рост (см)" variant="outlined" onChange={(e) => setHeight(e.target.value)}>
                Ваш рост (см)
            </TextField>

            <FormControl fullWidth>
                <InputLabel id="activity-select">Уровень активности в течение дня</InputLabel>
                <Select
                    labelId="activity-select"
                    id="activity-select"
                    label="Активность в течение дня"
                    onChange={(e) => setSelectActivity(e.target.value as string)}
                >
                    <MenuItem key="0" value="Очень низкая">
                        Очень низкая
                    </MenuItem>

                    <MenuItem key="1" value="Низкая">
                        Низкая
                    </MenuItem>

                    <MenuItem key="2" value="Средняя">
                        Средняя
                    </MenuItem>

                    <MenuItem key="3" value="Высокая">
                        Высокая
                    </MenuItem>

                    <MenuItem key="4" value="Очень высокая">
                        Очень высокая
                    </MenuItem>
                </Select>
            </FormControl>

            <FormControl fullWidth>
                <InputLabel id="aim-select">Цель</InputLabel>
                <Select
                    labelId="aim-select"
                    id="aim-select"
                    label="Цель изменения веса"
                    onChange={(e) => setSelectAim(e.target.value as string)}
                >
                    <MenuItem key="0" value="Снизить вес">
                        Снизить вес
                    </MenuItem>

                    <MenuItem key="1" value="Сохранить вес">
                        Сохранить вес
                    </MenuItem>

                    <MenuItem key="2" value="Набрать вес">
                        Набрать вес
                    </MenuItem>
                </Select>
            </FormControl>

            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography component="h1" variant="h5">
                    Ваша норма калорий
                </Typography>
                <Typography component="h1" variant="h5">
                    {totalKcal}
                </Typography>

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={() => setCalculationButton(!calculationButton)}
                >
                    Рассчитать норму калорий
                </Button>
            </Box>
        </Stack >
    )
}

export default Calculator;