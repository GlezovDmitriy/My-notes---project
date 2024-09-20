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

    /*const removeTask = (taskId: string, todolistId: string) =>  {
        const todolistTasks = tasks[todolistId]
        const newTodolistTasks = todolistTasks.filter(t => t.id !== taskId)
        tasks[todolistId] = newTodolistTasks
        // 4. Засетаем в state копию объекта, чтобы React отреагировал перерисовкой
        setTasks({ ...tasks, [todolistId]: newTodolistTasks })

        }
  /!*  setTasks({ ...tasks, [todolistId]: tasks[todolistId].filter(task => task.id !== taskId) })*!/
    }*/
const removeTask = (taskId: string, todolistId: string): void => {
    const todolistTasks = tasks[todolistId];
    const newTodolistTasks = todolistTasks.filter(t => t.id !== taskId);

    // Обновляем состояние
    setTasks({ ...tasks, [todolistId]: newTodolistTasks });
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
