import React, {useRef} from "react";
import {FilterValuesType, TaskType} from "./App";
import {Button} from "./components/button";

export type PropsType ={
    title: string
    tasks: TaskType[]
    removeTask:(taskId:string)=>void
    changeFilter:(filter: FilterValuesType)=>void
    addTask:(title: string)=>void
}
export const Todolist = ({title, tasks, addTask, removeTask, changeFilter}:PropsType)=>{
    const inputRef = useRef<HTMLInputElement | null>(null)


    return(
        <div>
            <h3>{title}</h3>
            <div>
                <input ref={inputRef}/>
                <Button title={'+'} onClick={ ()=>{
                    if(inputRef.current){
                        if ("value" in inputRef.current) {
                            addTask(inputRef.current.value)
                            inputRef.current.value= ''
                        }
                    }
                }} />
            </div>
            {tasks.length === 0 ? (
                <p>Заметок нет!</p>
            ): (
                <ul>
                    {tasks.map(task => {

                        return(
                            <li key={task.id}><input
                                type="checkbox"
                                checked={task.isDone}/>
                                <span>{task.title}</span>
                                <Button onClick={()=> removeTask(task.id)} title={'X'}/>

                            </li>
                        )
                    })
                    }
                </ul>
            )}

            <div>
                <Button title={'All'} onClick={()=> changeFilter('All')}/>
                <Button title={'Active'} onClick={()=> changeFilter('Active')}/>
                <Button title={'Completed'} onClick={()=> changeFilter('Completed')}/>
            </div>
        </div>
    )
}