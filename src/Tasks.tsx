import React, {ChangeEvent} from 'react';
import {EditableSpan} from "./components/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {TodolistType} from "./model/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, TasksType} from "./model/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./app/store";
type Props = {
    todolist: TodolistType,
}
export const Tasks = ({ todolist }: Props) => {
    const dispatch = useDispatch()
    const tasks = useSelector<RootState, TasksType>(state => state.tasks)
    const removeTask = (taskId:string, todolistId:string) => {
        dispatch(removeTaskAC({taskId, todolistId}))
    }
    const changeTaskStatus = (taskId: string, newStatusValue: boolean, todolistId: string) => {
        dispatch(changeTaskStatusAC({taskId, isDone:newStatusValue, todolistId}))
    }
    const changeTaskTitleHandler = (title: string) => {
        //updateTask(todolist.id, task.id, title)
        dispatch(changeTaskTitleAC({taskId:task.id, todolistId:todolist.id, title}))
    }
    const updateTask = (todolistId: string, taskId: string, title: string) => {
        dispatch(changeTaskTitleAC({ taskId, title, todolistId }))
    }
    const addTask = (title: string, todolistId: string) => {
        dispatch(addTaskAC({title, todolistId}))
    }

    return (
        <>
            {tasks.length === 0 ? (
                <p>Заметок нет!</p>
            ) : (
                <ul>
                    {tasks.map(task => {
                        const removeTaskHandler = () => {
                            removeTask(task.id, todolist.id)

                        }
                        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            const newStatusValue = e.currentTarget.checked
                            changeTaskStatus(task.id, newStatusValue, todolist.id)

                        }
                        const changeTaskTitleHandler = (title: string) => {
                            updateTask(todolist.id, task.id, title)

                        }
                        return (
                            <li key={task.id}
                                className={task.isDone ? 'is-done' : ''}>
                                <input
                                    type="checkbox"
                                    onChange={changeTaskStatusHandler}
                                    checked={task.isDone}/>
                                <EditableSpan value={task.title} onChange={changeTaskTitleHandler}/>
                                {/*<Button onClick={removeTaskHandler} title={'X'}/>*/}
                                <IconButton size="small"
                                            onClick={removeTaskHandler}>
                                    <DeleteIcon />
                                </IconButton>
                            </li>
                        )
                    })
                    }
                </ul>
            )}
        </>
    );
};

