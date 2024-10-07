import {TasksType} from '../App'
import {v1} from "uuid";

export const tasksReducer = (state: TasksType, action: ActionsType): TasksType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(task => task.id !== action.payload.taskId)
            }
        }
        case 'ADD-TASK': {
            const newTask = {id: v1(), title: action.payload.title, isDone: false}
            return {
                ...state,
                [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]]
            }
        }
        case 'CHANGE-TASK-STATUS':{
            debugger
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(task =>
                    task.id === action.payload.taskId
                        ? { ...task, isDone: action.payload.isDone }
                        : task
                )
            }
        }
        default:
            throw new Error("I don't understand this type")
    }
}

// Action creators
/*export const removeTaskAC = (todolistId: string, taskId: string) => {
    return {type: 'REMOVE-TASK', payload: {todolistId, taskId}} as const
}*/
//В арументы передан объект
export const removeTaskAC = (payload: { taskId: string; todolistId: string }) => {
    return {
        type: 'REMOVE-TASK',
        payload
    } as const
}
export const addTaskAC = (payload: { title: string; todolistId: string }) => {
    return {
        type: 'ADD-TASK',
        payload
    } as const
}
export const changeTaskStatusAC = (payload: { taskId: string; todolistId: string; isDone: boolean }) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload
    } as const
}
// Actions types
export type RemoveActionType = ReturnType<typeof removeTaskAC>
export type AddActionType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>

type ActionsType = RemoveActionType
    | AddActionType
    | ChangeTaskStatusActionType