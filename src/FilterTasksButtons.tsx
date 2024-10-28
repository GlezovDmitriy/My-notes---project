import React from 'react';
import Button from "@mui/material/Button";
import {changeTodolistFilterAC, FilterValuesType, TodolistType} from "./model/todolists-reducer";
import {useDispatch} from "react-redux";
type Props = {
    todolist: TodolistType,

}
export const FilterTasksButtons = ({ todolist }: Props) => {
    const { filter, id } = todolist
    const dispatch = useDispatch()
    const changeFilterTasksHandler = (filter: FilterValuesType) => {
        dispatch(changeTodolistFilterAC({todolistId: id, filter }))
    }
    return (
        <div>
            <Button size="small"
                    variant={filter === 'All' ? 'outlined' : 'text'}
                    onClick={() => changeFilterTasksHandler('All')}>
                All
            </Button>
            <Button size="small"
                    variant={filter === 'Active' ? 'outlined' : 'text'}
                    onClick={() => changeFilterTasksHandler('Active')}>
                Active
            </Button>
            <Button size="small"
                    variant={filter === 'Completed' ? 'outlined' : 'text'}
                    onClick={() => changeFilterTasksHandler('Completed')}>
                Completed
            </Button>
        </div>
    );
};

