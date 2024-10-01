import {v1} from "uuid";
import {FilterValuesType, TodolistType} from "../App";

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    payload: {
        id: string
    }
}

export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    payload: {
        title: string
    }
}

export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    payload: {
        id: string
        title: string
    }
}

export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    payload: {
        id: string
        filter: FilterValuesType
    }
}

type ActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
let todolistID1 = v1()
let todolistID2 = v1()

const initialState: TodolistType[] = [
    { id: todolistID1, title: 'What to learn', filter: 'All' },
    { id: todolistID2, title: 'What to buy', filter: 'All' },
]
export const todolistsReducer = (state: TodolistType[] = initialState, action: ActionsType) => {
switch (action.type) {
    case 'REMOVE-TODOLIST' : {
        return state.filter(tl => tl.id !== action.payload.id)
    }
    case 'ADD-TODOLIST':{
        const newTodolist = {id: v1(),
            title: action.payload.title,
            filter:'All'}
        return [...state, newTodolist]
    }
    case 'CHANGE-TODOLIST-TITLE':{
        return state.map(tl => (tl.id === action.payload.id
        ? { ...tl, title: action.payload.title}
        : tl))
    }
    case 'CHANGE-TODOLIST-FILTER':{
        return state.map(tl => (tl.id === action.payload.id
            ? { ...tl, filter: action.payload.filter}
            : tl))
    }
    default:
        return state;
}
}