import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from './todolists-reducer'
import { v1 } from 'uuid'
import { TodolistType } from '../App'
let todolistId1: string
let todolistId2: string
let startState: TodolistType[] = []

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()

    startState = [
        { id: todolistId1, title: 'What to learn', filter: 'All' },
        { id: todolistId2, title: 'What to buy', filter: 'All' },
    ]
})
test('correct todolist should be removed', () => {

     const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))
    //  Проверяем, что наши действия (изменения state) соответствуют ожиданию
    // в массиве останется один тудулист
    expect(endState.length).toBe(1)
    // удалится нужный тудулист, а не любой
    expect(endState[0].id).toBe(todolistId2)
})
test('correct todolist should be added', () => {

    // 2. Действие
  /*  const action = {
        type: 'ADD-TODOLIST',
        payload: {
            title: 'New Todolist',
        },
    } as const*/
    const endState = todolistsReducer(startState, addTodolistAC('New Todolist'))

    // 3. Проверяем, что наши действия (изменения state) соответствуют ожиданию
    // в массиве останется один тудулист
    expect(endState.length).toBe(3)
    // удалится нужный тудулист, а не любой
    expect(endState[2].title).toBe('New Todolist')
})
test('correct todolist should change its name', () => {

    /*const action = {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            id: todolistId2,
            title: 'New Todolist',
        },
    } as const*/
    const endState = todolistsReducer(startState, changeTodolistTitleAC(todolistId2,'New Todolist'))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe('New Todolist')
})
test('correct filter of todolist should be changed', () => {


    /*const action = {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            id: todolistId2,
            filter: 'Completed',
        },
    } as const*/
    const endState = todolistsReducer(startState, changeTodolistFilterAC(todolistId2,'Completed'))

    expect(endState[0].filter).toBe('All')
    expect(endState[1].filter).toBe('Completed')
})