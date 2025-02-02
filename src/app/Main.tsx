import React from 'react';
import {Container, Grid} from "@mui/material";
import {AddItemForm} from "../common/components/AddItemForm";
import {addTodolistAC, addTodolistTC} from "../features/todolists/model/todolists-reducer";
import Todolists from "../features/ui/Todolists/Todolists";
import {useAppDispatch} from "../common/hooks/useAppDispatch";
import {selectIsLoggedIn} from "../features/auth/model/authSelectors";
import {useAppSelector} from "common/hooks/useAppSelector";
import {Navigate} from "react-router-dom";
import {Path} from "common/router/router";

export const Main = () => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(selectIsLoggedIn)
    const addTodolist = (title: string) => {
        dispatch(addTodolistTC(title))
        /*const action = addTodolistAC(title) // чтобы не было ошибки из-за
        //генерациии id 2 раза - выносится action - id сгенерируется 1 раз
        // потом можно диспатчить 2 раза.
        dispatch(action)*/ // без сервера

    }
    if (!isLoggedIn){
        return <Navigate to={Path.Login}/>
    }
    return (
        <Container fixed>
            <Grid container sx={{mb: '30px'}}>
                <AddItemForm addItem={addTodolist}/>
            </Grid>
            <Grid container spacing={4}>
                <Todolists/>
            </Grid>
        </Container>
    );
};

