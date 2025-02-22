import axios from "axios";
import {CreateTodolistResponse, DeleteTodolistResponse, Todolist, UpdateTodolistResponse} from "./todolistsApi.types";
import {instance} from "../../../common/instance/instance";
import {BaseResponse, ItemResponseType, ResponseNotesType} from "../../../common/types/types";

export const todolistsApi = {
    getTodolists(){
        return instance.get<Todolist[]>('todo-lists')
    },
    updateTodolist(payload: { id: string; title: string }){
        const { title, id } = payload
        return instance.put<BaseResponse >(`todo-lists/${id}`, { title })
    },
    createTodolist(title: string){
        return instance.post<BaseResponse<{ item: Todolist }>>('todo-lists', { title })

    },
    /*createTodolist(title: string){
        return instance.post<ResponseNotesType>('todo-lists', { title })
    },*/
    removeTodolist(id:string) {
        return instance.delete<BaseResponse>(`todo-lists/${id}`)
    }

}