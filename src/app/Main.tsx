import React from 'react';
import {Container, Grid} from "@mui/material";
import {AddItemForm} from "../common/components/AddItemForm";
import {addTodolistAC} from "../features/todolists/model/todolists-reducer";
import Todolists from "../features/ui/Todolists/Todolists";
import {useAppDispatch} from "../common/hooks/useAppDispatch";

export const Main = () => {
    const dispatch = useAppDispatch()
    const addTodolist = (title: string) => {
        const action = addTodolistAC(title) // чтобы не было ошибки из-за
        //генерациии id 2 раза - выносится action - id сгенерируется 1 раз
        // потом можно диспатчить 2 раза.
        dispatch(action)
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

