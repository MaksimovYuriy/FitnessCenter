import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useNavigate } from 'react-router-dom';

const pages = ['Главная', 'Личный кабинет', 'Клубы', 'Тренировки', 'Абонементы', 'Контакты'];

function ResponsiveAppBar() {

    const navigate = useNavigate()

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>

                    <Button
                        key={pages[0]}
                        sx={{ my: 2, color: 'white', display: 'block' }}
                        onClick={() => navigate("/news")}
                    >
                        {pages[0]}
                    </Button>

                    <Button
                        key={pages[1]}
                        sx={{ my: 2, color: 'white', display: 'block' }}
                        onClick={() => navigate("/auth")}
                    >
                        {pages[1]}
                    </Button>

                    <Button
                        key={pages[2]}
                        sx={{ my: 2, color: 'white', display: 'block' }}
                        onClick={() => navigate("/clubsinfo")}
                    >
                        {pages[2]}
                    </Button>

                    <Button
                        key={pages[3]}
                        sx={{ my: 2, color: 'white', display: 'block' }}
                        onClick={() => navigate("/trainings")}
                    >
                        {pages[3]}
                    </Button>

                    <Button
                        key={pages[4]}
                        sx={{ my: 2, color: 'white', display: 'block'}}
                        onClick={() => navigate("/subs")}
                    >
                        {pages[4]}
                    </Button>

                    <Button
                        key={pages[5]}
                        sx={{ my: 2, color: 'white', display: 'block'}}
                        onClick={() => navigate("/contacts")}
                    >
                        {pages[5]}
                    </Button>

                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar;