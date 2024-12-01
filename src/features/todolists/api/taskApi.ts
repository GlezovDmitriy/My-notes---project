import axios from "axios";
import {
    CreateTaskResponse,
    DomainTask,
    GetTasksResponse,
    RemoveTaskResponse, UpdateTaskModel,
    UpdateTaskResponse
} from "./tasksApi.types";
import {ChangeEvent} from "react";
import {instance} from "common/instance/instance";
import {BaseResponse} from "common/types";

export const tasksApi = {
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
    },
    createTask(payload: { title: string, todolistId: string }) {
        const {title, todolistId} = payload
        return instance.post<CreateTaskResponse>(`todo-lists/${todolistId}/tasks`, {title})
    },
    removeTask(payload: { taskId: string, todolistId: string }) {
        const {taskId, todolistId} = payload
        return instance.delete<BaseResponse >(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    changeTaskStatus(payload: { todolistId: string; taskId: string; model: UpdateTaskModel }){
        const {taskId, todolistId,model} = payload
        return instance.put<BaseResponse >(`todo-lists/${todolistId}/tasks/${taskId}`, model)
    },
    changeTaskTitle(payload: { todolistId: string; taskId: string; model: UpdateTaskModel }){
        const {taskId, todolistId,model} = payload
        return instance.put<BaseResponse >(`todo-lists/${todolistId}/tasks/${taskId}`, model)
    }
}