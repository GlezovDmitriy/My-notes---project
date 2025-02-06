import React, {useEffect} from 'react';
import {
    changeTodolistFilterAC, changeTodolistTitleAC,
    FilterValuesType,
    removeTodolistAC, setTodolistsAC,
    TodolistDomainType
} from "../../todolists/model/todolists-reducer";
import {Grid} from "@mui/material";
import Paper from "@mui/material/Paper";
import {Todolist} from "./Todolist/Todolist";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../app/store";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    getTasksTC,
    removeTaskAC,
    TasksType
} from "../../todolists/model/tasks-reducer";
import {useAppDispatch} from "../../../common/hooks/useAppDispatch";
import {useAppSelector} from "../../../common/hooks/useAppSelector";
import {selectTodolists} from "../../todolists/model/todolistsSelectors";
import {todolistsApi} from "../../todolists/api/todolistsApi";
import {selectIsLoggedIn} from "../../auth/model/authSelectors";

export const Todolists = () => {
    const todolists = useAppSelector(selectTodolists)
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(selectIsLoggedIn)

    useEffect(() => {
        if (!isLoggedIn) return
        todolistsApi.getTodolists()
            .then(res => {
                debugger
            dispatch(setTodolistsAC(res.data))
            console.log('getTodolists TODO')
                return res.data
        })
            .then((todos) =>{
                debugger
                todos.forEach((tl)=>{
                    dispatch(getTasksTC(tl.id))
                })
            })
    }, [])

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