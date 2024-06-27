import { Grid, Typography } from "@mui/material"

function UserCard() {
    return (
        <Grid container>
            <Grid item xs={3}>
                <Typography align="center">
                    <p>
                        Имя + Фамилия
                    </p>

                    <p>
                        Электронная почта
                    </p>
                </Typography>
            </Grid>

            <Grid item xs={3}>
                <Typography align="center">
                    <p>
                        Номер телефона
                    </p>

                    <p>
                        Пол
                    </p>
                </Typography>
            </Grid>

            <Grid item xs={3}>
                <Typography align="center">
                    <p>
                        Уровень программа лояльности
                    </p>

                    <p>
                        Бонусы
                    </p>
                </Typography>
            </Grid>

            <Grid item xs={3} >
                <Typography align="center">
                    <p>
                        Абонемент
                    </p>

                    <p>
                        Клуб
                    </p>
                </Typography>
            </Grid>
        </Grid>
    )
}

export default UserCard