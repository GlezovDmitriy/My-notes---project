import React from "react";
import {TaskType} from "./App";
import {Button} from "./components/button";

export type PropsType ={
    title: string
    tasks: TaskType[]
    removeTask:(taskId:number)=>void
    changeFilter:(filter: string)=>void
}
export const Todolist = ({title, tasks, removeTask, changeFilter}:PropsType)=>{
    return(
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <Button title={'+'} />
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