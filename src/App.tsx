import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterValuesType = 'All' | 'Active' | 'Completed'

function App() {
    const [tasks, setTasks] = useState<TaskType[]>([

        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
        {id: v1(), title: 'Redux', isDone: false},
        {id: v1(), title: 'Redux', isDone: false},
        {id: v1(), title: 'Redux', isDone: false},
    ])
const [filter, setFilter] = useState<FilterValuesType>('All')

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

    function changeFilter(filter:FilterValuesType){
        setFilter(filter)
    }
    function removeTask(taskId: string) {
        const filteredTasks = tasks.filter(task=>{
            return task.id !== taskId
        })
        setTasks(filteredTasks)
    }
    function addTask(title:string) {
        const newTask = {
            id: v1(), title: title, isDone: false
        }
        const newTasks = [newTask, ...tasks]
        setTasks(newTasks)
    }
    const changeTaskStatus = (taskId:string, newStatus: boolean)=>{
debugger
    }
    return (
        <div className="App">
            <Todolist title='My books'
                      tasks={taskForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeTaskStatus={changeTaskStatus}/>

        </div>
    );
}

export default App;
