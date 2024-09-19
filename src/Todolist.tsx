import React, {ChangeEvent, ChangeEventHandler, useRef, useState} from "react";
import {FilterValuesType, TaskType} from "./App";
import {Button} from "./components/Button";
import {log} from "util";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

export type PropsType ={
    title: string
    todolistId: string
    tasks: TaskType[]
    removeTask:(taskId:string)=>void
    changeFilter:(filter: FilterValuesType,todolistId: string)=>void
    addTask:(title: string)=>void
    changeTaskStatus:(taskId:string, newStatus: boolean) =>void
    filter: FilterValuesType
}
export const Todolist = ({title,
                             todolistId,
                             changeTaskStatus,
                             tasks,
                             addTask,
                             removeTask,
                             changeFilter,
                             filter}:PropsType)=>{
    //const inputRef = useRef<HTMLInputElement | null>(null) /*через useRef*/
    const [taskTitle, setTaskTitle] = useState('') // в input-е на добавление
    const [error, setError] = useState<string|null>(null)

const addTaskHandler = () => {
        if(taskTitle.trim() !== ''){
            addTask(taskTitle.trim())
            setTaskTitle('')
        } else { setError('ERROR! EMPTY STRING!')}

}
    const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value)
    }
    const addTaskOnKeyUpHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        setError(null) //обнуление ошибки
        if (event.key === 'Enter') {
            addTaskHandler()
        }
    }
    const changeFilterTasksHandler = (filter: FilterValuesType) => {
        changeFilter(filter, todolistId)
    }

    return(
        <div>
            <h3>{title}</h3>
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
                <input className={error ? 'error' : ''}
                    value={taskTitle}
                       onChange={changeTaskTitleHandler}
                       onKeyUp={addTaskOnKeyUpHandler}
                />
                <Button title={'+'} onClick={addTaskHandler}/>
                {error && <div className={'error-message'}>{error}</div>}
            </div>
            {tasks.length === 0 ? (
                <p>Заметок нет!</p>
            ): (
                <ul>
                    {tasks.map(task => {
                        const removeTaskHandler = () => {
                            removeTask(task.id)
                        }
                        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            const newStatusValue = e.currentTarget.checked
                            changeTaskStatus(task.id,newStatusValue )
                        }
                        return(
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
                <Button className={ filter === 'All' ? 'active-filter' : ''}
                        title={'All'}
                        onClick={()=> changeFilterTasksHandler('All')}/>
                <Button className={filter === 'Active' ? 'active-filter' : ''}
                        title={'Active'}
                        onClick={()=> changeFilterTasksHandler('Active')}/>
                <Button className={filter === 'Completed' ? 'active-filter' : ''}
                    title={'Completed'}
                    onClick={()=> changeFilterTasksHandler('Completed')}/>
            </div>
        </div>
    )
}