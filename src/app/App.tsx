import React, {useEffect} from 'react';
import './App.css';
import {Box, CircularProgress, ThemeProvider} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatchType, RootState} from "./store";
import {ThemeMode} from "./app-reducer";
import {getTheme} from "../common/theme/theme";
import {Header} from "../common/components/Header";
import {Main} from "./Main";
import {useAppSelector} from "../common/hooks/useAppSelector";
import {selectStatusMode, selectThemeMode} from "./appSelectors";
import { getTodolistsTC} from "../features/todolists/model/todolists-reducer";
import {useAppDispatch} from "common/hooks/useAppDispatch";
import {ErrorSnackbar} from "common/components/ErrorSnackbar";
import {Outlet} from "react-router-dom";
import {selectIsInitialized, selectIsLoggedIn} from "../features/auth/model/authSelectors";
import {initializeAppTC} from "../features/auth/model/auth-reducer";
import s from "./App.module.css"

export const App = () => {
    const dispatch = useAppDispatch();
    const themeMode = useAppSelector(selectThemeMode)
    const isLoggedIn = useAppSelector(selectIsLoggedIn)
    const isInitialized = useAppSelector(selectIsInitialized)
    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])
    if (!isInitialized) {
        return (
            <div className={s.circularProgressContainer}>
                <CircularProgress size={150} thickness={3} />
            </div>
        )
    }
    /*useEffect(() => {
        if (!isLoggedIn) return
        console.log('getTodolistsTC APP')
        dispatch(getTodolistsTC())
    }, [dispatch])*/
    return (
        <div>
            <ThemeProvider theme={getTheme(themeMode)}>
                <Box sx={{ backgroundColor: 'background.default', minHeight: '100vh', p: 2 }}>
            <Header/>
            {/*<Main/>*/}
                    <Outlet />
                </Box>

                <ErrorSnackbar/>
            </ThemeProvider>
        </div>
    );
}


