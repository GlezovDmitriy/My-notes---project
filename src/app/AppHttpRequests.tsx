import Checkbox from '@mui/material/Checkbox'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { AddItemForm } from '../common/components/AddItemForm'
import { EditableSpan } from '../common/components/EditableSpan'
import axios from "axios";
import {log} from "util";
import {store} from "./store";
import {
    CreateTodolistResponse,
    DeleteTodolistResponse,
    Todolist,
    UpdateTodolistResponse
} from "../features/todolists/api/todolistsApi.types";
import {
    CreateTaskResponse,
    DomainTask,
    GetTasksResponse,
    RemoveTaskResponse, UpdateTaskModel, UpdateTaskResponse
} from "../features/todolists/api/tasksApi.types";
import {todolistsApi} from "../features/todolists/api/todolistsApi";
import {tasksApi} from "../features/todolists/api/taskApi";


export const AppHttpRequests = () => {
    const [todolists, setTodolists] = useState<Todolist[]>([])
    const [tasks, setTasks] = useState<{ [key: string]: DomainTask[] }>({})

    useEffect(() => {
        todolistsApi.getTodolists()
            .then(res => {
            setTodolists(res.data)
                res.data.forEach(tl => {
                    tasksApi.getTasks(tl.id)
                        .then(res => {
                        console.log(res.data)
                        //setTasks({ ...tasks, [tl.id]: res.data.items })
                        setTasks(tasks => ({ ...tasks, [tl.id]: res.data.items }))

                    })
            })
        })
    }, [])

    const createTodolistHandler = (title: string) => {
        todolistsApi.createTodolist(title)
            .then(res => {
                //console.log(res.data)
                const newTodolist = res.data.data.item
                setTodolists([newTodolist, ...todolists])
            })
    }

    const removeTodolistHandler = (id: string) => {
        todolistsApi.removeTodolist(id)
            .then(res => {
                console.log(res.data)
                const newTodolists = todolists.filter(tl => tl.id !== id)
                setTodolists(newTodolists)
            })
    }

    const updateTodolistHandler = (id: string, title: string) => {
        todolistsApi.updateTodolist({id, title})
            .then(res => {
                console.log(res)
                const newTodolists = todolists.map(tl => tl.id === id ? {...tl, title: title} : tl)
                console.log(newTodolists)
                setTodolists(newTodolists)
            })
    }

    const createTaskHandler = (title: string, todolistId: string) => {
        tasksApi.createTask({title,todolistId})
            .then(res => {
                //console.log(res.data)
                const newTask = res.data.data.item
                /*setTasks({ ...tasks,
                    [todolistId]: tasks[todolistId] ?
                        [newTask, ...tasks[todolistId]] : [newTask] })*/
                setTasks({ ...tasks, [todolistId]: [newTask, ...tasks[todolistId]] })
            })
    }

    const removeTaskHandler = (taskId: string, todolistId: string) => {
        tasksApi.removeTask({ taskId, todolistId })
            .then(res => {
                console.log(res.data)
                const newTasks = tasks[todolistId].filter(t => (t.id !== taskId))
                setTasks({ ...tasks, [todolistId]: newTasks })

            })
    }

    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>, task: DomainTask) => {
        const todolistId = task.todoListId;
        let status = e.currentTarget.checked ? 2 : 0
        const model: UpdateTaskModel = {
            status,
            title: task.title,
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
        }
        tasksApi.changeTaskStatus({ todolistId: todolistId, taskId: task.id, model })
            .then(res => {
                //console.log(res.data)
                const newTasks = tasks[task.todoListId].map(t => (t.id === task.id ? { ...t, ...model } : t))
                setTasks({ ...tasks, [task.todoListId]: newTasks })

            })
    }

    const changeTaskTitleHandler = (title: string, task: DomainTask) => {
        //let title = e.currentTarget.value
        const todolistId = task.todoListId;
        const model: UpdateTaskModel = {
            status: task.status,
            title,
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
        }
        tasksApi.changeTaskTitle({ todolistId: todolistId, taskId: task.id, model })
            .then(res => {
                console.log(res.data)
                const newTasks = tasks[task.todoListId].map(t => (t.id === task.id ? { ...t, ...model } : t))
                setTasks({ ...tasks, [task.todoListId]: newTasks })

            })
    }

    return (
        <div style={{ margin: '20px' }}>
            <AddItemForm addItem={createTodolistHandler} />

            {/* Todolists */}
            {todolists.map((tl: Todolist) => {
                return (
                    <div key={tl.id} style={todolist}>
                        <div>
                            <EditableSpan
                                value={tl.title}
                                onChange={(title: string) => updateTodolistHandler(tl.id, title)}
                            />
                            <button onClick={() => removeTodolistHandler(tl.id)}>x</button>
                        </div>
                        <AddItemForm addItem={title => createTaskHandler(title, tl.id)} />

                        {/* Tasks */}
                        {!!tasks[tl.id] &&
                            tasks[tl.id].map((task: DomainTask) => {
                                return (
                                    <div key={task.id}>
                                        <Checkbox
                                            checked={task.status === 2}
                                            onChange={e => changeTaskStatusHandler(e, task)}
                                        />
                                        <EditableSpan
                                            value={task.title}
                                            onChange={title => changeTaskTitleHandler(title, task)}
                                        />
                                        <button onClick={() => removeTaskHandler(task.id, tl.id)}>x</button>
                                    </div>
                                )
                            })}
                    </div>
                )
            })}
        </div>
    )
}

// Styles
const todolist: React.CSSProperties = {
    border: '1px solid black',
    margin: '20px 0',
    padding: '10px',
    width: '300px',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
}