import React, {ChangeEvent} from 'react';
import {Checkbox} from "@mui/material";
import {EditableSpan} from "common/components/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {TodolistDomainType, TodolistType} from "../../../../../todolists/model/todolists-reducer";
import {
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    removeTaskTC,
    TaskType
} from "../../../../../todolists/model/tasks-reducer";
import {useDispatch} from "react-redux";
import {useAppDispatch} from "common/hooks/useAppDispatch";
import {TaskStatus} from "common/enums/enums";
import {DomainTask} from "../../../../../todolists/api/tasksApi.types";
type Props = {
    todolist: TodolistDomainType,
    task: DomainTask
}
export const Task = ({todolist,task}:Props) => {
    const dispatch = useAppDispatch()
    const removeTaskHandler = () => {
       // removeTask(task.id, todolist.id)
        dispatch(removeTaskTC({taskId:task.id, todolistId: todolist.id}))
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
            <Checkbox checked={task.status === TaskStatus.Completed} onChange={changeTaskStatusHandler} />
            <EditableSpan value={task.title} onChange={changeTaskTitleHandler}/>
            {/*<Button onClick={removeTaskHandler} title={'X'}/>*/}
            <IconButton size="small"
                        onClick={removeTaskHandler}>
                <DeleteIcon />
            </IconButton>
        </div>
    );
};

