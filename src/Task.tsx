import React, {ChangeEvent} from 'react';
import {Checkbox} from "@mui/material";
import {EditableSpan} from "./components/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {TodolistType} from "./model/todolists-reducer";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, TaskType} from "./model/tasks-reducer";
import {useDispatch} from "react-redux";
type Props = {
    todolist: TodolistType,
    task: TaskType
}
export const Task = ({todolist,task}:Props) => {
    const dispatch = useDispatch()
    const removeTaskHandler = () => {
       // removeTask(task.id, todolist.id)
        dispatch(removeTaskAC({taskId:task.id, todolistId: todolist.id}))
    }
    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const newStatusValue = e.currentTarget.checked
       // changeTaskStatus(task.id, newStatusValue, todolist.id)
        dispatch(changeTaskStatusAC({taskId:task.id, todolistId: todolist.id, isDone:newStatusValue}))
    }
    const changeTaskTitleHandler = (title: string) => {
       // updateTask(todolist.id, task.id, title)
        dispatch(changeTaskTitleAC({taskId:task.id, todolistId: todolist.id, title}))
    }
    return (
        <div>
            <Checkbox checked={task.isDone} onChange={changeTaskStatusHandler} />
            <EditableSpan value={task.title} onChange={changeTaskTitleHandler}/>
            {/*<Button onClick={removeTaskHandler} title={'X'}/>*/}
            <IconButton size="small"
                        onClick={removeTaskHandler}>
                <DeleteIcon />
            </IconButton>
        </div>
    );
};

