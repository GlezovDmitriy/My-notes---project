import React, {ChangeEvent, ChangeEventHandler, useRef, useState} from "react";
import {FilterValuesType, TaskType} from "./App";
import {Button} from "./components/Button";
import {log} from "util";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import {AddItemForm} from "./components/AddItemForm";

export type PropsType = {
    title: string
    todolistId: string
    tasks: TaskType[]
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (filter: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, newStatus: boolean, todolistId: string) => void
    filter: FilterValuesType
    removeTodolist:(todolistId: string) => void
}
export const Todolist = ({
                             title,
                             todolistId,
                             changeTaskStatus,
                             tasks,
                             addTask,
                             removeTask,
                             changeFilter,
                             filter,
                             removeTodolist
                         }: PropsType) => {
    //const inputRef = useRef<HTMLInputElement | null>(null) /*через useRef*/

    const changeFilterTasksHandler = (filter: FilterValuesType) => {
        changeFilter(filter, todolistId)
    }
    const removeTodolistHandler=()=>{
        removeTodolist(todolistId)
    }
    const addTaskCallback = (title: string) => {
        addTask(title, todolistId)
    }
    return (
        <div>
            <div className={'todolist-title-container'}>
                <h3>{title}</h3>
                <Button title={'X'} onClick={removeTodolistHandler}/>
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
                            removeTask(task.id, todolistId)
                        }
                        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            const newStatusValue = e.currentTarget.checked
                            changeTaskStatus(task.id, newStatusValue, todolistId)
                        }
                        return (
                            <li key={task.id}
                                className={task.isDone ? 'is-done' : ''}>
                                <input
                                    type="checkbox"
                                    onChange={changeTaskStatusHandler}
                                    checked={task.isDone}/>
                                <span>{task.title}</span>
                                <Button onClick={removeTaskHandler} title={'X'}/>
                            </li>
                        )
                    })
                    }
                </ul>
            )}

            <div>
                <Button className={filter === 'All' ? 'active-filter' : ''}
                        title={'All'}
                        onClick={() => changeFilterTasksHandler('All')}/>
                <Button className={filter === 'Active' ? 'active-filter' : ''}
                        title={'Active'}
                        onClick={() => changeFilterTasksHandler('Active')}/>
                <Button className={filter === 'Completed' ? 'active-filter' : ''}
                        title={'Completed'}
                        onClick={() => changeFilterTasksHandler('Completed')}/>
            </div>
        </div>
    )
}