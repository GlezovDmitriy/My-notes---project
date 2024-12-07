import React, {ChangeEvent, useEffect} from 'react';
import {EditableSpan} from "../../../../../common/components/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {TodolistDomainType, TodolistType} from "../../../../todolists/model/todolists-reducer";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    getTasksTC,
    removeTaskAC,
    TasksType
} from "../../../../todolists/model/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../../app/store";
import {Checkbox} from "@mui/material";
import {Task} from "../TodolistTitle/Task/Task";
import {useAppSelector} from "../../../../../common/hooks/useAppSelector";
import {selectTasks} from "../../../../todolists/model/tasksSelectors";
import {TaskStatus} from "common/enums/enums";
import {useAppDispatch} from "common/hooks/useAppDispatch";
type Props = {
    todolist: TodolistDomainType,
}
export const Tasks = ({ todolist }: Props) => {

    const tasks = useAppSelector(selectTasks)
    const  dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getTasksTC(todolist.id))
    }, [])
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
        taskForTodolist = allTodolistTasks.filter(task => task.status === TaskStatus.New)
    }
    if (todolist.filter === 'Completed') {
        taskForTodolist = allTodolistTasks.filter(task => task.status === TaskStatus.Completed)
    }

    return (
        <>
            {taskForTodolist && taskForTodolist.length === 0 ? (
                <p>Заметок нет!</p>
            ) : (
                <ul>
                    {taskForTodolist && taskForTodolist.map(task => {
                        return (
                            <li key={task.id}
                                className={task.status === TaskStatus.Completed ? 'is-done' : ''}>
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

