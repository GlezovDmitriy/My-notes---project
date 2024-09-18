import React, {ChangeEvent, ChangeEventHandler, useRef, useState} from "react";
import {FilterValuesType, TaskType} from "./App";
import {Button} from "./components/Button";
import {log} from "util";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

export type PropsType ={
    title: string
    tasks: TaskType[]
    removeTask:(taskId:string)=>void
    changeFilter:(filter: FilterValuesType)=>void
    addTask:(title: string)=>void
    changeTaskStatus:(taskId:string, newStatus: boolean) =>void
}
export const Todolist = ({title, changeTaskStatus, tasks, addTask, removeTask, changeFilter}:PropsType)=>{
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
        setError('null') //обнуление ошибки
        if (event.key === 'Enter') {
            addTaskHandler()
        }
    }
    const changeFilterTasksHandler = (filter: FilterValuesType) => {
        changeFilter(filter)
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
                            <li key={task.id}>
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
                <Button title={'All'} onClick={()=> changeFilterTasksHandler('All')}/>
                <Button title={'Active'} onClick={()=> changeFilterTasksHandler('Active')}/>
                <Button title={'Completed'} onClick={()=> changeFilterTasksHandler('Completed')}/>
            </div>
        </div>
    )
}