import React from 'react';
import {Container, Grid} from "@mui/material";
import {AddItemForm} from "./components/AddItemForm";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, FilterValuesType,
    removeTodolistAC, TodolistDomainType
} from "./model/todolists-reducer";
import Paper from "@mui/material/Paper";
import {Todolist} from "./Todolist";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, TasksType} from "./model/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./app/store";
import Todolists from "./Todolists";

export const Main = () => {
    const dispatch = useDispatch()
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

