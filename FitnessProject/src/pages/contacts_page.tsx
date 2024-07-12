import { Stack } from "@mui/material"
import ResponsiveAppBar from "../components/navbar"
import ClubsInfo from "../components/clubs_info"
import Contacts from "../components/contacts"

function ContactsPage(){
    return (
        <Stack spacing={2} alignItems={"center"}>
            <ResponsiveAppBar />
            <Contacts />
        </Stack>
    )
}

export default ContactsPage