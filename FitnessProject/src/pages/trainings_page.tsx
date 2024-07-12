import { Stack } from "@mui/material"
import ResponsiveAppBar from "../components/navbar"
import Trainings from "../components/trainings"

function TrainingsPage(){
    return (
        <Stack spacing={2} alignItems={"center"}>
            <ResponsiveAppBar />
            <Trainings />
        </Stack>
    )
}

export default TrainingsPage