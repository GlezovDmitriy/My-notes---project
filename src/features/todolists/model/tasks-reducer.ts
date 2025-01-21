import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";
import {Dispatch} from "redux";
import {tasksApi} from "../api/taskApi";
import {DomainTask, UpdateTaskModel} from "../api/tasksApi.types";
import {TaskStatus} from "common/enums/enums";
import {RootState} from "../../../app/store";
import {setAppErrorAC, setAppStatusAC} from "../../../app/app-reducer";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TasksType = {
    [todolistId: string]: TaskType[];
};
export type MainTaskType = {
    [key: string]: DomainTask[];
}
const initialState: MainTaskType = {}
/*const initialState: DomainTask = {
    description: '',
    title: '',
    status: TaskStatus.New,
    priority: TaskPriority.Low,
    startDate: '',
    deadline: '',
    id: '',
    todoListId: '',
    order: 0,
    addedDate: '',
}*/
// Actions types
export type RemoveActionType = ReturnType<typeof removeTaskAC>
export type AddActionType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>
export type SetTasksActionType = ReturnType<typeof setTasksAC>
//export type UpdateTasksActionType = ReturnType<typeof updateTaskAC>

type ActionsType = RemoveActionType
    | AddActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTasksActionType
//| UpdateTasksActionType
export const tasksReducer = (state: MainTaskType = initialState, action: ActionsType): MainTaskType => {
    switch (action.type) {
        case 'SET-TASKS':
            return {
                ...state,
                [action.payload.todolistId]: action.payload.tasks
            }
        case 'REMOVE-TASK': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter((task: DomainTask) => task.id !== action.payload.taskId)
            }
        }
        /* //без сервера
        case 'ADD-TASK': {
            const newTask:DomainTask  = {
                title: action.payload.title,
                todoListId: action.payload.todolistId,
                startDate: '',
                priority: TaskPriority.Low,
                description: '',
                deadline: '',
                status: TaskStatus.New,
                addedDate: '',
                order: 0,
                id: v1(),
            }
            return {
                ...state,
                [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]]
            }
        }*/
        case 'SET-TASK': {
            const newTask = action.payload.task
            return {...state, [newTask.todoListId]: [newTask, ...state[newTask.todoListId]]}
        }
        case 'CHANGE-TASK-STATUS': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(task =>
                    task.id === action.payload.taskId
                        ? {...task, status: action.payload.status}
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
            return {...state, [action.payload.todolist.id]: []}
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
export const removeTaskTC =
    (arg: { taskId: string; todolistId: string }) => (dispatch: Dispatch) => {
        tasksApi.removeTask(arg).then(res => {
            dispatch(removeTaskAC(arg))
        })
    }
/*export const addTaskAC = (payload: { title: string; todolistId: string }) => { // без сервера
    return {
        type: 'ADD-TASK',
        payload
    } as const
}*/
export const addTaskAC = (payload: { task: DomainTask }) => ({type: 'SET-TASK', payload} as const)

export const changeTaskStatusAC = (payload: { taskId: string; todolistId: string; status: TaskStatus }) => {
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
export const setTasksAC = (payload: { todolistId: string; tasks: DomainTask[] }) => {
    return {
        type: 'SET-TASKS',
        payload,
    } as const
}
export const getTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    tasksApi.getTasks(todolistId).then((res) => {
        const tasks = res.data.items
        dispatch(setTasksAC({todolistId, tasks}))
        dispatch(setAppStatusAC('succeeded'))
    })
}
export const addTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    console.log('task add')
    dispatch(setAppStatusAC('loading'))
    tasksApi.createTask({todolistId, title})
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addTaskAC({task: res.data.data.item}))
                dispatch(setAppStatusAC('succeeded'))
            } else if (res.data.resultCode !== 0) {
                const messages = res.data.messages;
                if (Array.isArray(messages) && messages.length > 0) {
                    dispatch(setAppErrorAC(messages[0]))
                } else {
                    dispatch(setAppErrorAC('Some error occurred'))
            }
            }
            dispatch(setAppStatusAC('failed'))
        })
}
export const changeTaskStatusTC =
    (arg: { taskId: string; status: TaskStatus; todolistId: string }) =>
        (dispatch: Dispatch, getState: () => RootState) => {
            const {taskId, todolistId, status} = arg

            const allTasksFromState = getState().tasks
            const tasksForCurrentTodolist = allTasksFromState[todolistId]
            const task = tasksForCurrentTodolist.find(t => t.id === taskId)

            if (task) {
                const model: UpdateTaskModel = {
                    status,
                    title: task.title,
                    deadline: task.deadline,
                    description: task.description,
                    priority: task.priority,
                    startDate: task.startDate,
                }
                dispatch(setAppStatusAC('loading'))
                tasksApi.changeTaskStatus({taskId, todolistId, model}).then(res => {
                    dispatch(changeTaskStatusAC(arg))
                    dispatch(setAppStatusAC('succeeded'))
                })
            }
        }
export const changeTaskTitleTC =
    (arg: { taskId: string; title: string; todolistId: string }) =>
        (dispatch: Dispatch, getState: () => RootState) => {
            const {taskId, todolistId, title} = arg

            const allTasksFromState = getState().tasks
            const tasksForCurrentTodolist = allTasksFromState[todolistId]
            const task = tasksForCurrentTodolist.find(t => t.id === taskId)

            if (task) {
                const model: UpdateTaskModel = {
                    status: task.status,
                    title,
                    deadline: task.deadline,
                    description: task.description,
                    priority: task.priority,
                    startDate: task.startDate,
                }
                dispatch(setAppStatusAC('loading'))
                tasksApi.changeTaskStatus({taskId, todolistId, model}).then(res => {
                    dispatch(changeTaskTitleAC(arg))
                    dispatch(setAppStatusAC('succeeded'))
                })
            }
        }
/*
export type UpdateTaskDomainModel = {
    title?: string
    description?: string
    status?: TaskStatus
    priority?: TaskPriority
    startDate?: string
    deadline?: string
}
export const updateTaskTC =
    (arg: { taskId: string; domainModel: UpdateTaskDomainModel; todolistId: string }) =>
        (dispatch: Dispatch, getState: () => RootState) => {
            const {taskId, todolistId, title} = arg

            const allTasksFromState = getState().tasks
            const tasksForCurrentTodolist = allTasksFromState[todolistId]
            const task = tasksForCurrentTodolist.find(t => t.id === taskId)

            if (task) {
                const model: UpdateTaskDomainModel = {
                    status: task.status,
                    title: task.title,
                    deadline: task.deadline,
                    description: task.description,
                    priority: task.priority,
                    startDate: task.startDate,
                    ...domainModel
                }

                tasksApi.changeTaskStatus({taskId, todolistId, model}).then(res => {
                    dispatch(changeTaskTitleAC(arg))
                })
            }
        }*/ //updateTaskTC
