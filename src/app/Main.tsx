import React from 'react';
import {Container, Grid} from "@mui/material";
import {AddItemForm} from "../common/components/AddItemForm";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, FilterValuesType,
    removeTodolistAC, TodolistDomainType
} from "../features/todolists/model/todolists-reducer";
import Paper from "@mui/material/Paper";
import {Todolist} from "../features/ui/Todolists/Todolist/Todolist";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, TasksType} from "../features/todolists/model/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./store";
import Todolists from "../features/ui/Todolists/Todolists";

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

