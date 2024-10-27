import React from 'react';
import './App.css';
import {Box, ThemeProvider} from "@mui/material";
import {useSelector} from "react-redux";
import {RootState} from "./store";
import {ThemeMode} from "./app-reducer";
import {getTheme} from "../common/theme/theme";
import {Header} from "../Header";
import {Main} from "../Main";


export const App = () => {
    const themeMode = useSelector<RootState, ThemeMode>(state => state.app.themeMode)
    return (
        <div>
            <ThemeProvider theme={getTheme(themeMode)}>
                <Box sx={{ backgroundColor: 'background.default', minHeight: '100vh', p: 2 }}>
            <Header/>
            <Main/>
                </Box>
            </ThemeProvider>
        </div>
    );
}


