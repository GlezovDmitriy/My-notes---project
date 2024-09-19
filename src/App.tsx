import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterValuesType = 'All' | 'Active' | 'Completed'

function App() {
    let [todolists, setTodolists] = useState<TodolistType[]>([
        {id: v1(), title: 'What to learn', filter: 'All'},
        {id: v1(), title: 'What to buy', filter: 'All'},
    ])
    const [tasks, setTasks] = useState<TaskType[]>([

        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
        {id: v1(), title: 'Redux', isDone: false},
        {id: v1(), title: 'Redux', isDone: false},
        {id: v1(), title: 'Redux', isDone: false},
    ])




    function removeTask(taskId: string) {
        const filteredTasks = tasks.filter(task => {
            return task.id !== taskId
        })
        setTasks(filteredTasks)
    }

    function addTask(title: string) {
        const newTask = {
            id: v1(), title: title, isDone: false
        }
        const newTasks = [newTask, ...tasks]
        setTasks(newTasks)
    }

    const changeTaskStatus = (taskId: string, newStatus: boolean) => {
        const newTasks = tasks.map(task => task.id === taskId ? {...task, isDone: newStatus} : task)
        setTasks(newTasks)
    }

    return (
        <div className="App">
            {
                todolists.map(tl => {
                    let taskForTodolist = tasks
                    if (tl.filter === 'All') {
                        /*taskForTodolist = tasks.filter(task => !task.isDone && task.isDone)*/
                        taskForTodolist = tasks
                    }
                    if (tl.filter === 'Active') {
                        taskForTodolist = tasks.filter(task => task.isDone === false)
                    }
                    if (tl.filter === 'Completed') {
                        taskForTodolist = tasks.filter(task => task.isDone === true)
                    }

                    const changeFilter =(filter:FilterValuesType, todolistId: string)=>{
                        const newTodolist = todolists.map(tl=>{
                            return tl.id === todolistId ? {...tl, filter} : tl
                        })
                        setTodolists(newTodolist)
                    }
                    return (
                        <Todolist key={tl.id}
                                  todolistId={tl.id}
                                  title={tl.title}
                                  tasks={taskForTodolist}
                                  removeTask={removeTask}
                                  changeFilter={changeFilter}
                                  addTask={addTask}
                                  changeTaskStatus={changeTaskStatus}
                                  filter={tl.filter}/>
                    )
                })
            }


        </div>
    );
}

export default App;
