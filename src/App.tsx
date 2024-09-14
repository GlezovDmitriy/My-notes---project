import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

function App() {
    const [tasks, setTasks] = useState<TaskType[]>([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'ReactJS', isDone: false},
        {id: 4, title: 'Redux', isDone: false},
        {id: 5, title: 'Redux', isDone: false},
        {id: 6, title: 'Redux', isDone: false},
    ])
const [filter, setFilter] = useState('All')

    let taskForTodolist = tasks
    if (filter === 'All'){
        /*taskForTodolist = tasks.filter(task => !task.isDone && task.isDone)*/
        taskForTodolist = tasks
    }
    if (filter === 'Active'){
        taskForTodolist = tasks.filter(task => task.isDone === false)
    }
    if (filter === 'Completed'){
        taskForTodolist = tasks.filter(task => task.isDone === true)
    }
    function changeFilter(filter:string){
        setFilter(filter)
    }
    function removeTask(taskId: number) {
        const filteredTasks = tasks.filter(task=>{
            return task.id !== taskId
        })
        setTasks(filteredTasks)
    }
    /*function addTask(taskId: number) {
        const filteredTasks = tasks.filter(task=>{
            return task.id !== taskId
        })
        setTasks(filteredTasks)
    }*/
    return (
        <div className="App">
            <Todolist title='My books'
                      tasks={taskForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}/>

        </div>
    );
}

export default App;
