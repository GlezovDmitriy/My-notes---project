import React from 'react';
import {AppBar, Switch, Toolbar} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../app/store";
import {changeThemeAC, ThemeMode} from "../../app/app-reducer";
import {getTheme} from "../theme/theme";

export const Header = () => {
    const themeMode = useSelector<RootState, ThemeMode>(state => state.app.themeMode)
    //const [themeMode, setThemeMode] = useState<ThemeMode>('light')
    getTheme(themeMode)
    const changeModeHandler = () => {
        dispatch(changeThemeAC(themeMode === 'light' ? 'dark' : 'light'))
    }
    const dispatch = useDispatch()
    return (
        <AppBar position="static" sx={{mb: '30px'}}>
            <Toolbar>
                <IconButton color="inherit">
                    <MenuIcon/>
                </IconButton>
                <Button color="inherit">Login</Button>

                <Switch color={'default'} onChange={changeModeHandler} />
            </Toolbar>
        </AppBar>
    );
};

