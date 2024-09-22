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
type TasksType = {
    [todolistId: string]: TaskType[];
};
export type FilterValuesType = 'All' | 'Active' | 'Completed'

function App() {
    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<TodolistType[]>([
        { id: todolistID1, title: 'What to learn', filter: 'All' },
        { id: todolistID2, title: 'What to buy', filter: 'All' },
    ])

    let [tasks, setTasks] = useState<TasksType>({
        [todolistID1]: [
            { id: v1(), title: 'HTML&CSS', isDone: true },
            { id: v1(), title: 'JS', isDone: true },
            { id: v1(), title: 'ReactJS', isDone: false },
        ],
        [todolistID2]: [
            { id: v1(), title: 'Rest API', isDone: true },
            { id: v1(), title: 'GraphQL', isDone: false },
        ],
    })

    const removeTask = (taskId: string, todolistId: string) =>  {
        /*const todolistTasks = tasks[todolistId]
        const newTodolistTasks = todolistTasks.filter(t => t.id !== taskId)
        tasks[todolistId] = newTodolistTasks
        // 4. Засетаем в state копию объекта, чтобы React отреагировал перерисовкой
        setTasks({ ...tasks, newTodolistTasks })*/
        setTasks({ ...tasks, [todolistId]: tasks[todolistId].filter(task => task.id !== taskId) })
        }
  /*  setTasks({ ...tasks, [todolistId]: tasks[todolistId].filter(task => task.id !== taskId) })*/

    function addTask(title: string, todolistId: string) {
        const newTask = {
            id: v1(), title: title, isDone: false
        }
        setTasks({...tasks, [todolistId]:[newTask, ...tasks[todolistId]]})
    }

    const changeTaskStatus = (taskId: string, newStatus: boolean, todolistId: string ) => {
        setTasks({...tasks,
            [todolistId]: tasks[todolistId].map(t=>(t.id === taskId ?{...t, isDone: newStatus}  : t))})
    }
const removeTodolist = (todolistId:string)=>{
        const copyTodolists = todolists
    setTodolists(copyTodolists.filter(tl=> tl.id !== todolistId ))
    delete tasks[todolistId]
    setTasks({...tasks})
}
    return (
        <div className="App">
            {
                todolists.map(tl => {
                    const allTodolistTasks = tasks[tl.id]
                    let taskForTodolist = allTodolistTasks
                    if (tl.filter === 'All') {
                        /*taskForTodolist = tasks.filter(task => !task.isDone && task.isDone)*/
                        taskForTodolist = allTodolistTasks
                    }
                    if (tl.filter === 'Active') {
                        taskForTodolist = allTodolistTasks.filter(task => task.isDone === false)
                    }
                    if (tl.filter === 'Completed') {
                        taskForTodolist = allTodolistTasks.filter(task => task.isDone === true)
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
                                  filter={tl.filter}
                                  removeTodolist={removeTodolist}/>
                    )
                })
            }


        </div>
    );
}

export default App;
