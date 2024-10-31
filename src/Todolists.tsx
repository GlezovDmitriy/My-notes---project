import React from 'react';
import {
    changeTodolistFilterAC, changeTodolistTitleAC,
    FilterValuesType,
    removeTodolistAC,
    TodolistDomainType
} from "./model/todolists-reducer";
import {Grid} from "@mui/material";
import Paper from "@mui/material/Paper";
import {Todolist} from "./Todolist";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./app/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, TasksType} from "./model/tasks-reducer";

export const Todolists = () => {
    const todolists = useSelector<RootState, Array<TodolistDomainType>>(state => state.todolists as TodolistDomainType[])

    const dispatch = useDispatch()
   /* const removeTask = (taskId: string, todolistId: string) => {
        dispatch(removeTaskAC({taskId, todolistId}))
    }*/


    /*const changeTaskStatus = (taskId: string, isDone: boolean, todolistId: string) => { // ПОРЯДОК ПЕРЕДАЧИ!!!
        dispatch(changeTaskStatusAC({taskId, todolistId, isDone}))
    }
    const updateTask = (todolistId: string, taskId: string, title: string) => {
        dispatch(changeTaskTitleAC({taskId, todolistId, title}))
    }*/
    const removeTodolist = (todolistId: string) => {
        dispatch(removeTodolistAC(todolistId))
    }
    const updateTodolist = (todolistId: string, title: string) => {
        dispatch(changeTodolistTitleAC({todolistId, title}))
    }
    return (
        <>
            {
                todolists.map(tl => {


                    const changeFilter = (filter: FilterValuesType, todolistId: string) => {
                        dispatch(changeTodolistFilterAC({todolistId, filter}))
                    }
                    return (
                        <Grid item key={tl.id} xs={12} sm={6}>
                            <Paper sx={{m: '10px'}}>
                                <Todolist
                                    todolist ={tl}
                                    /*todolistId={tl.id}
                                    title={tl.title}*/
                                   /* tasks={taskForTodolist}*/
                                    /*removeTask={removeTask}*/
                                    /*changeFilter={changeFilter}*/

                                    /*changeTaskStatus={changeTaskStatus}*/
                                    /*filter={tl.filter}
                                    removeTodolist={removeTodolist}
                                    /!*updateTask={updateTask}*!/
                                    updateTodolist={updateTodolist}*/
                                />
                            </Paper>
                        </Grid>


                    )
                })
            }
        </>
    );
};

export default Todolists;