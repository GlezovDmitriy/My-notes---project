import {TasksType} from '../App'

export const tasksReducer = (state: TasksType, action: ActionsType): TasksType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            debugger
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(task => task.id !== action.payload.taskId)
            }
        }

        default:
            throw new Error("I don't understand this type")
    }
}

// Action creators
export const removeTaskAC = (todolistId: string, taskId: string) => {
    return {type: 'REMOVE-TASK', payload: {todolistId, taskId}} as const
}

// Actions types
export type RemoveActionType = ReturnType<typeof removeTaskAC>

type ActionsType = RemoveActionType