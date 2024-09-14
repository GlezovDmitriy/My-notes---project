import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";

export type TaskType={
    id:number
    title:string
    isDone:boolean
}
function App() {
    const tasks1: Array<TaskType>= [
        { id: 1, title: 'HTML&CSS', isDone: true },
        { id: 2, title: 'JS', isDone: true },
        { id: 3, title: 'ReactJS', isDone: false },
        { id: 4, title: 'Redux', isDone: false },
        { id: 5, title: 'Redux', isDone: false },
        { id: 6, title: 'Redux', isDone: false },
    ]

    const tasks2: Array<TaskType> = [

    ]
    return (
        <div className="App">
            <Todolist title = 'My books' tasks={tasks1}/>
            <Todolist title = 'My music' tasks={tasks2}/>

        </div>
    );
}

export default App;
