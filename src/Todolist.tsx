import React from "react";
import {TaskType} from "./App";
import {Button} from "./components/button";

export type PropsType ={
    title: string
    tasks: TaskType[]
    removeTask:(taskId:number)=>void
}
export const Todolist = ({title, tasks, removeTask}:PropsType)=>{
    return(
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <Button title={'+'}/>
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
                                {/*<Button title={'X'}/>*/}
                                <button onClick={()=>removeTask(task.id)}>X</button>
                            </li>
                        )
                    })
                    }
                </ul>
            )}

            <div>
                <Button title={'All'}/>
                <Button title={'Active'}/>
                <Button title={'Completed'}/>
            </div>
        </div>
    )
}