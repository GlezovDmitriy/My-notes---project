import React, {useReducer, useState} from 'react';
import './App.css';
import {Todolist} from "../Todolist";
import {v1} from "uuid";
import {AddItemForm} from "../components/AddItemForm";
import {AppBar, Box, Container, createTheme, Grid, Switch, ThemeProvider, Toolbar} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import MenuIcon from '@mui/icons-material/Menu'
import Paper from '@mui/material/Paper'
import CssBaseline from '@mui/material/CssBaseline'
import {
    ActionsType,
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC, TodolistDomainType,
    todolistsReducer
} from "../model/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "../model/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./store";
import {changeThemeAC, ThemeMode} from "./app-reducer";
import {getTheme} from "../common/theme/theme";
import {Header} from "../Header";


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

function App() {

    const todolists = useSelector<RootState, Array<TodolistDomainType>>(state => state.todolists as TodolistDomainType[])
    const tasks = useSelector<RootState, TasksType>(state => state.tasks)
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
    const theme = createTheme({
        palette: {
            mode: themeMode === 'light' ? 'light' : 'dark',
            primary: {
                main: '#087EA4',
            },
        },
    })
    /*let [tasks, dispatchToTasks] = useReducer(tasksReducer, initialTasksState)
*/

    const removeTask = (taskId: string, todolistId: string) => {
        dispatch(removeTaskAC( { taskId, todolistId }))
    }
    const addTask = (title: string, todolistId: string) => {
        dispatch(addTaskAC( { title, todolistId }))
    }

    const changeTaskStatus = (taskId: string, isDone: boolean, todolistId: string) => { // ПОРЯДОК ПЕРЕДАЧИ!!!
        dispatch(changeTaskStatusAC({ taskId, todolistId, isDone }))
    }
    const updateTask = (todolistId: string, taskId: string, title: string) => {
        dispatch(changeTaskTitleAC( {taskId, todolistId, title}))
    }
    const removeTodolist = (todolistId: string) => {
        dispatch(removeTodolistAC(todolistId))
    }
    const addTodolist = (title: string) => {
        const action = addTodolistAC(title) // чтобы не было ошибки из-за
        //генерациии id 2 раза - выносится action - id сгенерируется 1 раз
        // потом можно диспатчить 2 раза.
        dispatch(action)

    }

    const updateTodolist = (todolistId: string, title: string) => {
        dispatch(changeTodolistTitleAC({todolistId,title}))
    }
    return (
        <div>
            <ThemeProvider theme={theme}>
                <Box sx={{ backgroundColor: 'background.default', minHeight: '100vh', p: 2 }}>
            <Header/>
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
                                dispatch(changeTodolistFilterAC({todolistId, filter}))
                            }
                            return (
                                <Grid item key={tl.id} xs={12} sm={6}>
                                    <Paper sx={{m: '10px'}}>
                                        <Todolist
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
                </Box>
            </ThemeProvider>
        </div>
    );
}

export default App;
