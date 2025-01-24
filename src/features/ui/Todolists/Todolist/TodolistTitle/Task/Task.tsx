import React, {ChangeEvent} from 'react';
import {Checkbox} from "@mui/material";
import {EditableSpan} from "common/components/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {TodolistDomainType} from "../../../../../todolists/model/todolists-reducer";
import {changeTaskStatusTC, changeTaskTitleTC, removeTaskTC,} from "../../../../../todolists/model/tasks-reducer";
import {useAppDispatch} from "common/hooks/useAppDispatch";
import {TaskStatus} from "common/enums/enums";
import {DomainTask} from "../../../../../todolists/api/tasksApi.types";

type Props = {
    todolist: TodolistDomainType,
    task: DomainTask
    disabled: boolean
}
export const Task = ({todolist, task, disabled}: Props) => {
    const dispatch = useAppDispatch()
    const removeTaskHandler = () => {
        // removeTask(task.id, todolist.id)
        dispatch(removeTaskTC({taskId: task.id, todolistId: todolist.id}))
    }
    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const newStatusValue = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New
        // changeTaskStatus(task.id, newStatusValue, todolist.id)
        dispatch(changeTaskStatusTC({taskId: task.id, status: newStatusValue, todolistId: todolist.id}))
    }
    const changeTaskTitleHandler = (title: string) => {
        // updateTask(todolist.id, task.id, title)
        dispatch(changeTaskTitleTC({taskId: task.id, todolistId: todolist.id, title}))
    }
    /*const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const newStatusValue = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New
        // changeTaskStatus(task.id, newStatusValue, todolist.id)
        dispatch(updateTaskTC({taskId:task.id, status:newStatusValue, todolistId: todolist.id}))
    }
    const changeTaskTitleHandler = (title: string) => {
        // updateTask(todolist.id, task.id, title)
        dispatch(updateTaskTC({taskId:task.id, todolistId: todolist.id, title}))
    }*/
    return (
        <div>
            <Checkbox checked={task.status === TaskStatus.Completed}
                      onChange={changeTaskStatusHandler}
                      disabled={disabled}/>
            <EditableSpan value={task.title}
                          onChange={changeTaskTitleHandler}
                          disabled={disabled}/>
            {/*<Button onClick={removeTaskHandler} title={'X'}/>*/}
            <IconButton size="small"
                        onClick={removeTaskHandler}
                        disabled={disabled}>
                <DeleteIcon/>
            </IconButton>
        </div>
    );
};

