import React, {ChangeEvent} from "react";

//import {Button} from "./components/Button";
import {Simulate} from "react-dom/test-utils";
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import {addTaskAC, TaskType} from "./model/tasks-reducer";
import {FilterValuesType, TodolistType} from "./model/todolists-reducer";
import {FilterTasksButtons} from "./FilterTasksButtons";
import {Tasks} from "./Tasks";
import {useDispatch} from "react-redux";
import {TodolistTitle} from "./TodolistTitle";


export type PropsType = {
    todolist: TodolistType
    title: string
    todolistId: string
    /*tasks: TaskType[]*/
    /*removeTask: (taskId: string, todolistId: string) => void*/
    /*changeFilter: (filter: FilterValuesType, todolistId: string) => void*/

    /*changeTaskStatus: (taskId: string, newStatus: boolean, todolistId: string) => void*/
    filter: FilterValuesType
    removeTodolist:(todolistId: string) => void
    /*updateTask: (todolistId: string, taskId: string, title: string) => void*/
    updateTodolist: (todolistId: string, title: string) => void
}
export const Todolist = ({todolist,
                             title,
                             todolistId,
                             /*changeTaskStatus,
                             tasks,*/


                             /*changeFilter,*/
                             filter,
                             removeTodolist,
                             /*updateTask,*/
                             updateTodolist
                         }: PropsType) => {
    //const inputRef = useRef<HTMLInputElement | null>(null) /*через useRef*/
    const dispatch = useDispatch()

    const removeTodolistHandler=()=>{
        removeTodolist(todolist.id)
    }
    const addTaskCallback = (title: string) => {
        dispatch(addTaskAC({title, todolistId: todolist.id}))
    }
    const updateTodolistHandler = (title: string) => {
        updateTodolist(todolist.id, title)
    }
    return (
        <div>
            <div >
                <TodolistTitle todolist={todolist}/>
            </div>

            <div>
                {/*через useRef*/}
                {/* <input ref={inputRef}/>
                <Button title={'+'} onClick={ ()=>{
                    if(inputRef.current){
                        if ("value" in inputRef.current) {
                            addTask(inputRef.current.value)
                            inputRef.current.value= ''
                        }
                    }
                }} />*/}
                {/*через useState*/}
               <AddItemForm addItem={addTaskCallback}/>
            </div>
            <Tasks todolist={todolist}/>

            <div>
                {/*<Button className={filter === 'All' ? 'active-filter' : ''}
                        title={'All'}
                        onClick={() => changeFilterTasksHandler('All')}/>*/}
                {/*<Button className={filter === 'Active' ? 'active-filter' : ''}
                        title={'Active'}
                        onClick={() => changeFilterTasksHandler('Active')}/>*/}
                {/* <Button className={filter === 'Completed' ? 'active-filter' : ''}
                        title={'Completed'}
                        onClick={() => changeFilterTasksHandler('Completed')}/>*/}
                <FilterTasksButtons todolist={todolist}/>

            </div>
        </div>
    )
}