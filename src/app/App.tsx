import React from 'react';
import './App.css';
import {Box, ThemeProvider} from "@mui/material";
import {useSelector} from "react-redux";
import {RootState} from "./store";
import {ThemeMode} from "./app-reducer";
import {getTheme} from "../common/theme/theme";
import {Header} from "../common/components/Header";
import {Main} from "./Main";
import {useAppSelector} from "../common/hooks/useAppSelector";
import {selectThemeMode} from "./appSelectors";


export const App = () => {
    const themeMode = useAppSelector(selectThemeMode)
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


