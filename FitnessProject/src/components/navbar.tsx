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

const pages = ['Личный кабинет', 'Клубы', 'Тренировки', 'Абонементы', 'Контакты'];

function ResponsiveAppBar() {
    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>

                    <Button
                        key={pages[0]}
                        sx={{ my: 2, color: 'white', display: 'block' }}
                    >
                        {pages[0]}
                    </Button>

                    <Button
                        key={pages[1]}
                        sx={{ my: 2, color: 'white', display: 'block' }}
                    >
                        {pages[1]}
                    </Button>

                    <Button
                        key={pages[2]}
                        sx={{ my: 2, color: 'white', display: 'block' }}
                    >
                        {pages[2]}
                    </Button>

                    <Button
                        key={pages[3]}
                        sx={{ my: 2, color: 'white', display: 'block' }}
                    >
                        {pages[3]}
                    </Button>

                    <Button
                        key={pages[4]}
                        sx={{ my: 2, color: 'white', display: 'block'}}
                    >
                        {pages[4]}
                    </Button>

                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar;