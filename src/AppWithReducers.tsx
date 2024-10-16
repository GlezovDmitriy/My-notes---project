import React, {useReducer, useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";
import {AppBar, Container, Grid, Toolbar} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import MenuIcon from '@mui/icons-material/Menu'
import Paper from '@mui/material/Paper'
import {
    ActionsType,
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./model/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./model/tasks-reducer";


export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TasksType = {
    [todolistId: string]: TaskType[];
};
export type FilterValuesType = 'All' | 'Active' | 'Completed'

export function AppWithReducers() {
    let todolistID1 = v1()
    let todolistID2 = v1()
    const initialTodolistState: TodolistType[] = [
        { id: todolistID1, title: 'What to learn', filter: 'All' },
        { id: todolistID2, title: 'What to buy', filter: 'All' }];
    const initialTasksState: TasksType = {
        [todolistID1]: [
            { id: v1(), title: 'HTML&CSS', isDone: true },
            { id: v1(), title: 'JS', isDone: true },
            { id: v1(), title: 'ReactJS', isDone: false },
        ],
        [todolistID2]: [
            { id: v1(), title: 'Rest API', isDone: true },
            { id: v1(), title: 'GraphQL', isDone: false },
        ],
    }
    let [todolists, dispatchToTodolists] = useReducer<
        (state: TodolistType[], action: ActionsType) => TodolistType[],
        TodolistType[]
    >(todolistsReducer, initialTodolistState)

    let [tasks, dispatchToTasks] = useReducer(tasksReducer, initialTasksState)

    const removeTask = (taskId: string, todolistId: string) => {
        dispatchToTasks(removeTaskAC( { taskId, todolistId }))
    }
    const addTask = (title: string, todolistId: string) => {
        dispatchToTasks(addTaskAC( { title, todolistId }))
    }

    const changeTaskStatus = (taskId: string, isDone: boolean, todolistId: string) => { // ПОРЯДОК ПЕРЕДАЧИ!!!
        dispatchToTasks(changeTaskStatusAC({ taskId, todolistId, isDone }))
    }
    const updateTask = (todolistId: string, taskId: string, title: string) => {
        dispatchToTasks(changeTaskTitleAC( {taskId, todolistId, title}))
    }
    const removeTodolist = (todolistId: string) => {
        dispatchToTodolists(removeTodolistAC(todolistId))
    }
    const addTodolist = (title: string) => {
        const action = addTodolistAC(title) // чтобы не было ошибки из-за
        //генерациии id 2 раза - выносится action - id сгенерируется 1 раз
        // потом можно диспатчить 2 раза.
        dispatchToTodolists(action)
        dispatchToTasks(action)
    }

    const updateTodolist = (todolistId: string, title: string) => {
        dispatchToTodolists(changeTodolistTitleAC(todolistId,title))
    }
    return (
        <div>
            <AppBar position="static" sx={{mb: '30px'}}>
                <Toolbar>
                    <IconButton color="inherit">
                        <MenuIcon/>
                    </IconButton>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container sx={{mb: '30px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>

                <Grid container spacing={4}>

                    {
                        todolists.map(tl => {
                            const allTodolistTasks = tasks[tl.id] || []
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

                            const changeFilter = (filter: FilterValuesType, todolistId: string) => {
                                dispatchToTodolists(changeTodolistFilterAC(todolistId, filter))
                            }
                            return (
                                <Grid spacing={5}>
                                    <Paper sx={{m: '10px'}}>
                                        <Todolist key={tl.id}
                                                  todolistId={tl.id}
                                                  title={tl.title}
                                                  tasks={taskForTodolist}
                                                  removeTask={removeTask}
                                                  changeFilter={changeFilter}
                                                  addTask={addTask}
                                                  changeTaskStatus={changeTaskStatus}
                                                  filter={tl.filter}
                                                  removeTodolist={removeTodolist}
                                                  updateTask={updateTask}
                                                  updateTodolist={updateTodolist}/>
                                    </Paper>
                                </Grid>


                            )
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}


