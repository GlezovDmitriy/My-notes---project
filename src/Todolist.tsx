import React from "react";
import {TaskType} from "./App";
import {Button} from "./components/button";

export type PropsType ={
    title: string
    tasks: TaskType[]
}
export const Todolist = (props:PropsType)=>{
    return(
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <Button title={'+'}/>
            </div>
            {props.tasks.length === 0 ? (
                <p>Заметок нет!</p>
            ): (
                <ul>
                    {props.tasks.map(task => {

                        return(
                            <li key={task.id}><input
                                type="checkbox"
                                checked={task.isDone}/>
                                <span>{task.title}</span>
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