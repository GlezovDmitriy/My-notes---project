import React from 'react';
import {AppBar, LinearProgress, Switch, Toolbar} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../app/store";
import {changeThemeAC, ThemeMode} from "../../app/app-reducer";
import {getTheme} from "../theme/theme";
import {useAppDispatch} from "../hooks/useAppDispatch";
import {useAppSelector} from "../hooks/useAppSelector";
import {selectStatusMode} from "../../app/appSelectors";
import {selectIsLoggedIn} from "../../features/auth/model/authSelectors";
import {logoutTC} from "../../features/auth/model/auth-reducer";

export const Header = () => {
    const themeMode = useAppSelector<RootState, ThemeMode>(state => state.app.themeMode)
    const isLoggedIn = useAppSelector(selectIsLoggedIn)
    const dispatch = useAppDispatch()
    //const [themeMode, setThemeMode] = useState<ThemeMode>('light')
    getTheme(themeMode)
    const status = useAppSelector(selectStatusMode)
    const changeModeHandler = () => {
        dispatch(changeThemeAC(themeMode === 'light' ? 'dark' : 'light'))
    }
    const logoutHandler = ()=>{
        dispatch(logoutTC())
    }
    return (
        <AppBar position="static" sx={{mb: '30px'}}>
            <Toolbar>
                <IconButton color="inherit">
                    <MenuIcon/>
                </IconButton>
                <div>
                    <Switch color={'default'} onChange={changeModeHandler}/>
                    {isLoggedIn && <Button color="inherit" onClick={logoutHandler}>Logout</Button>}
                </div>
            </Toolbar>
            {status === 'loading' && <LinearProgress/>}

        </AppBar>
    );
};

