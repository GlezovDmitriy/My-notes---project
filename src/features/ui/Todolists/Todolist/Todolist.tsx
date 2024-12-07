import React from "react";

//import {Button} from "./components/Button";
import {AddItemForm} from "../../../../common/components/AddItemForm";
import {addTaskAC} from "../../../todolists/model/tasks-reducer";
import {TodolistDomainType, TodolistType} from "../../../todolists/model/todolists-reducer";
import {FilterTasksButtons} from "./FilterTasksButtons/FilterTasksButtons";
import {Tasks} from "./Tasks/Tasks";
import {useDispatch} from "react-redux";
import {TodolistTitle} from "./TodolistTitle/TodolistTitle";
import {useAppDispatch} from "../../../../common/hooks/useAppDispatch";


export type PropsType = {
    todolist: TodolistDomainType
    /*title: string
    todolistId: string
    /!*tasks: TaskType[]*!/
    /!*removeTask: (taskId: string, todolistId: string) => void*!/
    /!*changeFilter: (filter: FilterValuesType, todolistId: string) => void*!/

    /!*changeTaskStatus: (taskId: string, newStatus: boolean, todolistId: string) => void*!/
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
    /!*updateTask: (todolistId: string, taskId: string, title: string) => void*!/
    updateTodolist: (todolistId: string, title: string) => void*/
}
export const Todolist = ({
                             todolist,
                             /*title,
                             todolistId,
                             /!*changeTaskStatus,
                             tasks,*!/


                             /!*changeFilter,*!/
                             filter,
                             removeTodolist,
                             /!*updateTask,*!/
                             updateTodolist*/
                         }: PropsType) => {
    //const inputRef = useRef<HTMLInputElement | null>(null) /*через useRef*/
    const dispatch = useAppDispatch()

    /*const removeTodolistHandler = () => {
        removeTodolist(todolist.id)
    }*/
    const addTaskCallback = (title: string) => {
        dispatch(addTaskAC({title, todolistId: todolist.id}))
    }
    /*const updateTodolistHandler = (title: string) => {
        updateTodolist(todolist.id, title)
    }*/
    return (
        <>
            <TodolistTitle todolist={todolist}/>
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
            <Tasks todolist={todolist}/>
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
        </>
    )
}