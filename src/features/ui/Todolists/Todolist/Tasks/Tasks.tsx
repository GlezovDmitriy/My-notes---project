import React, {ChangeEvent} from 'react';
import {EditableSpan} from "../../../../../common/components/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {TodolistType} from "../../../../todolists/model/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, TasksType} from "../../../../todolists/model/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../../app/store";
import {Checkbox} from "@mui/material";
import {Task} from "./Task/Task";
type Props = {
    todolist: TodolistType,
}
export const Tasks = ({ todolist }: Props) => {

    const tasks = useSelector<RootState, TasksType>(state => state.tasks)
    /*const removeTask = (taskId:string, todolistId:string) => {
        dispatch(removeTaskAC({taskId, todolistId}))
    }
    const changeTaskStatus = (taskId: string, newStatusValue: boolean, todolistId: string) => {
        dispatch(changeTaskStatusAC({taskId, isDone:newStatusValue, todolistId}))
    }

    const updateTask = (todolistId: string, taskId: string, title: string) => {
        dispatch(changeTaskTitleAC({ taskId, title, todolistId }))
    }*/
    const allTodolistTasks = tasks[todolist.id] || []
    let taskForTodolist = allTodolistTasks
    /*if (todolist.filter === 'All') {
        /!*taskForTodolist = tasks.filter(task => !task.isDone && task.isDone)*!/
        taskForTodolist = allTodolistTasks
    }*/
    if (todolist.filter === 'Active') {
        taskForTodolist = allTodolistTasks.filter(task => task.isDone === false)
    }
    if (todolist.filter === 'Completed') {
        taskForTodolist = allTodolistTasks.filter(task => task.isDone === true)
    }

    return (
        <>
            {taskForTodolist.length === 0 ? (
                <p>Заметок нет!</p>
            ) : (
                <ul>
                    {taskForTodolist.map(task => {
                        return (
                            <li key={task.id}
                                className={task.isDone ? 'is-done' : ''}>
                                <Task todolist={todolist} task={task}/>
                            </li>
                        )
                    })
                    }
                </ul>
            )}
        </>
    );
};

