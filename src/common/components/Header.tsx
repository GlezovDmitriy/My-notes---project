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

export const Header = () => {
    const themeMode = useAppSelector<RootState, ThemeMode>(state => state.app.themeMode)
    //const [themeMode, setThemeMode] = useState<ThemeMode>('light')
    getTheme(themeMode)
    const status = useAppSelector(selectStatusMode)
    const changeModeHandler = () => {
        dispatch(changeThemeAC(themeMode === 'light' ? 'dark' : 'light'))
    }
    const dispatch = useAppDispatch()
    return (
        <AppBar position="static" sx={{mb: '30px'}}>
            <Toolbar>
                <IconButton color="inherit">
                    <MenuIcon/>
                </IconButton>
                <Button color="inherit">Login</Button>

                <Switch color={'default'} onChange={changeModeHandler} />
            </Toolbar>
            {
                status === 'loading' && <LinearProgress />
            }

        </AppBar>
    );
};

