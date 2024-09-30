import {v1} from "uuid";
import {TodolistType} from "../App";

type ActionsType = {
    type: string
    payload: any
}
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
        const newTodolist = {
            id: v1(), title: action.payload.title, filter:'All'
        }
        return [...state, newTodolist]
    }
}
}