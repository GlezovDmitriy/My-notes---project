import React from 'react';
import {EditableSpan} from "../../../../../common/components/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {
    changeTodolistTitleAC, changeTodolistTitleTC,
    removeTodolistAC,
    removeTodolistTC, TodolistDomainType,
    TodolistType
} from "../../../../todolists/model/todolists-reducer";
import {useDispatch} from "react-redux";
import {useAppDispatch} from "../../../../../common/hooks/useAppDispatch";

type Props = {
    todolist: TodolistDomainType
    disabled: boolean
}
export const TodolistTitle = ({todolist, disabled}: Props) => {
    const {title, id} = todolist

    const dispatch = useAppDispatch()

    const removeTodolistHandler = () => {
        dispatch(removeTodolistTC(id))
    }
    const updateTodolistHandler = (title: string) => {
        dispatch(changeTodolistTitleTC({todolistId: id, title: title}))
    }

    return (
        <div className={'todolist-title-container'}>
            <EditableSpan value={todolist.title}
                          onChange={updateTodolistHandler}
                          disabled={disabled}/>

            {/*<Button title={'X'} onClick={removeTodolistHandler}/>*/}
            {/*из MUI:*/}
            <IconButton size="small"
                        onClick={removeTodolistHandler}
                        disabled={disabled}>
                <DeleteIcon/>
            </IconButton>
        </div>
    );
};

