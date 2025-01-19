import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC, TodolistDomainType,
    todolistsReducer, TodolistType
} from '../todolists-reducer'
import { v1 } from 'uuid'

let todolistId1: string
let todolistId2: string
let startState: TodolistDomainType[] = []

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()

    startState = [
        {id: todolistId1,
            title: 'What to learn',
            addedDate: 'string',
            order: 1,
            filter: 'All'
        },
        {id: todolistId2,
            title: 'What to buy',
            addedDate: 'string',
            order: 1,
            filter: 'All'
        }
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
    const newTitle = 'New Todolist'
    const newTodolist = {
        id: todolistId2,
        title: newTitle,
        addedDate: 'string',
        order: 1,
    }
    const endState = todolistsReducer(startState, addTodolistAC(newTodolist))

    // 3. Проверяем, что наши действия (изменения state) соответствуют ожиданию
    // в массиве останется один тудулист
    expect(endState.length).toBe(3)
    // удалится нужный тудулист, а не любой
    expect(endState[0].title).toBe('New Todolist')
})
test('correct todolist should change its name', () => {

    /*const action = {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            id: todolistId2,
            title: 'New Todolist',
        },
    } as const*/
    const newTitle = 'New Todolist'
    const endState = todolistsReducer(startState, changeTodolistTitleAC({todolistId:todolistId2,title:newTitle}))

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
    const endState = todolistsReducer(startState, changeTodolistFilterAC({todolistId:todolistId2,filter:'Completed'}))

    expect(endState[0].filter).toBe('All')
    expect(endState[1].filter).toBe('Completed')
})