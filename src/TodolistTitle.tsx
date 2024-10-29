import React from 'react';
import {EditableSpan} from "./components/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {changeTodolistTitleAC, removeTodolistAC, TodolistType} from "./model/todolists-reducer";
import {useDispatch} from "react-redux";
type Props = {
    todolist: TodolistType
}
export const TodolistTitle = ({ todolist }:Props) => {
    const { title, id } = todolist

    const dispatch = useDispatch()

    const removeTodolistHandler = () => {
        dispatch(removeTodolistAC(id))
    }
    const updateTodolistHandler = (title: string) => {
        dispatch(changeTodolistTitleAC({ todolistId: id, title: title }))
    }

    return (
        <div className={'todolist-title-container'}>
            <EditableSpan value={todolist.title} onChange={updateTodolistHandler}/>

            {/*<Button title={'X'} onClick={removeTodolistHandler}/>*/}
            {/*из MUI:*/}
            <IconButton size="small"
                        onClick={removeTodolistHandler}>
                <DeleteIcon />
            </IconButton>
        </div>
    );
};

