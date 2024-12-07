import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";
import {Dispatch} from "redux";
import {tasksApi} from "../api/taskApi";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TasksType = {
    [todolistId: string]: TaskType[];
};
const initialState: TasksType = {}
export const tasksReducer = (state: TasksType = initialState, action: ActionsType): TasksType => {
    switch (action.type) {
        case 'SET-TASKS':
            return {
                ...state,
                [action.payload.todolistId]: action.payload.tasks
            }
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
        case 'CHANGE-TASK-STATUS': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(task =>
                    task.id === action.payload.taskId
                        ? {...task, isDone: action.payload.isDone}
                        : task
                )
            }
        }
        case 'CHANGE-TASK-TITLE': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(task =>
                    task.id === action.payload.taskId
                        ? {...task, title: action.payload.title}
                        : task
                )
            }
        }
        case 'ADD-TODOLIST': {
            return {...state, [action.payload.todolistId]: []}
        }
        case 'REMOVE-TODOLIST': {
            const newState = {...state}
            delete newState[action.payload.id]
            return newState

        }
        default:
            return state
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
export const changeTaskTitleAC = (payload: { taskId: string; todolistId: string; title: string }) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        payload
    } as const
}
export const setTasksAC = (payload: { todolistId: string; tasks: TaskType[] }) => {
    return {
        type: 'SET-TASKS',
        payload,
    } as const
}
/*export const fetchTasksThunk = (dispatch: Dispatch) => {
    tasksApi.getTasks(todolistId).then(res => {
        const tasks = res.data.items
        dispatch(setTasksAC({todolistId, tasks}))
    })
}*/
// Actions types
export type RemoveActionType = ReturnType<typeof removeTaskAC>
export type AddActionType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>
export type SetTasksActionType = ReturnType<typeof setTasksAC>

type ActionsType = RemoveActionType
    | AddActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTasksActionType