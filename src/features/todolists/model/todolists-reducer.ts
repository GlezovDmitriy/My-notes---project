import {v1} from "uuid";
import {Todolist} from "../api/todolistsApi.types";
import {RootState} from "../../../app/store";
import {Dispatch} from "redux";
import {todolistsApi} from "../api/todolistsApi";
import {BaseResponse, ItemResponseType, ResponseNotesType} from "common/types";
import {AxiosResponse} from "axios";

// Типизация:
/*export type RemoveTodolistActionType = {
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
}*/
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type FilterValuesType = 'All' | 'Active' | 'Completed'
// Автоматическая типизация:
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>
export type ActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
| SetTodolistsActionType
export type TodolistDomainType = Todolist & {
    filter: FilterValuesType
}
let todolistID1 = v1()
let todolistID2 = v1()

const initialState: TodolistDomainType[] = []
export const todolistsReducer = (state: TodolistDomainType[] = initialState,
                                 action: ActionsType): TodolistDomainType[] => {
switch (action.type) {
    case 'SET-TODOLISTS': {
        return action.todolists.map(tl => ({ ...tl, filter: 'All' }))
    }
    case 'REMOVE-TODOLIST' : {
        return state.filter(tl => tl.id !== action.payload.id)
    }
    case 'ADD-TODOLIST':{
        /*const newTodolist: TodolistDomainType = {
            id: action.payload.todolist.id,
            title: action.payload.todolist.title,
            filter:'All',
            addedDate: '',
            order: 0,
        }*/
        const newTodolist: TodolistDomainType = {
            ...action.payload.todolist, filter:'All' }
        return [newTodolist, ...state]
    }
    case 'CHANGE-TODOLIST-TITLE':{
        return state.map(tl => (tl.id === action.payload.todolistId
        ? { ...tl, title: action.payload.title}
        : tl))
    }
    case 'CHANGE-TODOLIST-FILTER':{
        return state.map(tl => (tl.id === action.payload.todolistId
            ? { ...tl, filter: action.payload.filter}
            : tl))
    }
    default:
        return state;
}
}
// При типизации через ReturnType<typeof ...> нужно убрать типизацию в АС или будет
//ошибка цикличности
/*export const removeTodolistAC = (todolistId:string):RemoveTodolistActionType =>{
return { type: 'REMOVE-TODOLIST', payload: { id: todolistId } } as const
}*/
export const removeTodolistAC = (id:string) =>{
    return { type: 'REMOVE-TODOLIST', payload: { id: id } } as const
}
/*export const addTodolistAC = (title: string) => {
    return { type: 'ADD-TODOLIST', payload: { title, todolistId: v1() } } as const
}*/ //без сервера
export const addTodolistAC = (todolist: Todolist) => {
    return { type: 'ADD-TODOLIST', payload: { todolist } } as const
}
export const changeTodolistTitleAC = (payload: {todolistId: string, title: string}) => {
    return { type: 'CHANGE-TODOLIST-TITLE', payload } as const
}
export const changeTodolistFilterAC = (payload: {todolistId: string, filter: FilterValuesType}) => {
    return { type: 'CHANGE-TODOLIST-FILTER', payload} as const
}
export const setTodolistsAC = (todolists: Todolist[]) => {
    return { type: 'SET-TODOLISTS', todolists } as const
}

/*export const fetchTodolistsThunk = (dispatch: Dispatch) => {
    // внутри санки можно делать побочные эффекты (запросы на сервер)
    todolistsApi.getTodolists().then(res => {
        // и диспатчить экшены (action) или другие санки (thunk)
        dispatch(setTodolistsAC(res.data))
    })
}*/
export const getTodolistsTC = () => (dispatch: Dispatch) => {
    // внутри санки можно делать побочные эффекты (запросы на сервер)
    todolistsApi.getTodolists()
        .then((res) => { // и диспатчить экшены (action) или другие санки (thunk)
        dispatch(setTodolistsAC(res.data))
    })
}
/*export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
    todolistsApi.createTodolist(title).then(res => {
       // const newTodolist: Todolist = res.data.item

        dispatch(addTodolistAC(res.data))
    })
}*/
export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
    todolistsApi.createTodolist(title)
        .then((res: AxiosResponse<BaseResponse<{ item: ItemResponseType }>>) => {
        const newTodolist: ItemResponseType = res.data.data.item; // Получение item
        dispatch(addTodolistAC(newTodolist)); // Диспатчим
    })};
export const removeTodolistTC = (id:string) => (dispatch: Dispatch) => {
    todolistsApi.removeTodolist(id)
        .then(res =>{
            dispatch(removeTodolistAC(id))
            }
        )
}