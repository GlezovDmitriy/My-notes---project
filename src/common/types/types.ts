export type FieldError = {
    error: string
    field: string
}
export type BaseResponse<T={}> = {
    resultCode: number
    messages: string[]
    //fieldsErrors: FieldError[]
    data: T
}
export type DataResponseType = {
    item: ItemResponseType
}
export type ItemResponseType={
    id: string
    addedDate:string
    order: number
    title: string
}
export type ResponseNotesType = {
    resultCode: number
    messages: string[]
    fieldsErrors: FieldError[]
    data: DataResponseType
}