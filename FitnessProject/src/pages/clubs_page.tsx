import { Stack } from "@mui/material"
import ResponsiveAppBar from "../components/navbar"
import ClubsInfo from "../components/clubs_info"

function ClubsPage(){
    return (
        <Stack spacing={2} alignItems={"center"}>
            <ResponsiveAppBar />
            <ClubsInfo />
        </Stack>
    )
}

export default ClubsPage