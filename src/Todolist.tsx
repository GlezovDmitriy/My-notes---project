import React, {ChangeEvent, ChangeEventHandler, useRef, useState} from "react";

//import {Button} from "./components/Button";
import {log} from "util";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import Button from '@mui/material/Button'
import {TaskType} from "./model/tasks-reducer";
import {FilterValuesType, TodolistType} from "./model/todolists-reducer";
import {FilterTasksButtons} from "./FilterTasksButtons";


export type PropsType = {
    todolist: TodolistType
    title: string
    todolistId: string
    tasks: TaskType[]
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (filter: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, newStatus: boolean, todolistId: string) => void
    filter: FilterValuesType
    removeTodolist:(todolistId: string) => void
    updateTask: (todolistId: string, taskId: string, title: string) => void
    updateTodolist: (todolistId: string, title: string) => void
}
export const Todolist = ({todolist,
                             title,
                             todolistId,
                             changeTaskStatus,
                             tasks,
                             addTask,
                             removeTask,
                             changeFilter,
                             filter,
                             removeTodolist,
                             updateTask,
                             updateTodolist
                         }: PropsType) => {
    //const inputRef = useRef<HTMLInputElement | null>(null) /*через useRef*/


    const removeTodolistHandler=()=>{
        removeTodolist(todolist.id)
    }
    const addTaskCallback = (title: string) => {
        addTask(title, todolist.id)
    }
    const updateTodolistHandler = (title: string) => {
        updateTodolist(todolist.id, title)
    }
    return (
        <div>
            <div className={'todolist-title-container'}>
                <EditableSpan value={todolist.title} onChange={updateTodolistHandler}/>

                {/*<Button title={'X'} onClick={removeTodolistHandler}/>*/}
                {/*из MUI:*/}
                <IconButton size="small"
                            onClick={removeTodolistHandler}>
                    <DeleteIcon />
                </IconButton>
            </div>

            <div>
                {/*через useRef*/}
                {/* <input ref={inputRef}/>
                <Button title={'+'} onClick={ ()=>{
                    if(inputRef.current){
                        if ("value" in inputRef.current) {
                            addTask(inputRef.current.value)
                            inputRef.current.value= ''
                        }
                    }
                }} />*/}
                {/*через useState*/}
               <AddItemForm addItem={addTaskCallback}/>
            </div>
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

            <div>
                {/*<Button className={filter === 'All' ? 'active-filter' : ''}
                        title={'All'}
                        onClick={() => changeFilterTasksHandler('All')}/>*/}
                {/*<Button className={filter === 'Active' ? 'active-filter' : ''}
                        title={'Active'}
                        onClick={() => changeFilterTasksHandler('Active')}/>*/}
                {/* <Button className={filter === 'Completed' ? 'active-filter' : ''}
                        title={'Completed'}
                        onClick={() => changeFilterTasksHandler('Completed')}/>*/}
                <FilterTasksButtons todolist={todolist}/>

            </div>
        </div>
    )
}