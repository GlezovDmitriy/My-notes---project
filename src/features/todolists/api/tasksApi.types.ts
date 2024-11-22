export type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: DomainTask[]
}

export type DomainTask = {
    description: string
    title: string
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export type CreateTaskResponse ={
    data: {item: DomainTask}
    fieldsErrors: []
    messages: []
    resultCode: number
}
export type UpdateTaskModel ={
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}
export type UpdateTaskResponse ={
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export type RemoveTaskResponse ={
    data: {}
    messages: []
    resultCode: number
}