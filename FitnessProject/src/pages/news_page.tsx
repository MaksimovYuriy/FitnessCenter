import { Stack } from "@mui/material"
import ResponsiveAppBar from "../components/navbar"
import News from "../components/news"

function NewsPage() {
    return (
        <Stack spacing={2} alignItems={"center"}>
            <ResponsiveAppBar />
            <News />
        </Stack>
    )
}

export default NewsPage