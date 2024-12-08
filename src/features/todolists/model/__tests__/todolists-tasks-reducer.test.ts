
import {addTodolistAC, todolistsReducer, TodolistType} from "../todolists-reducer";
import {tasksReducer, TasksType} from "../tasks-reducer";

test('ids should be equals', () => {
    const startTasksState: TasksType = {}
    const startTodolistsState: TodolistType[] = []

    const action = addTodolistAC('new todolist')

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.payload.todolistId)
    expect(idFromTodolists).toBe(action.payload.todolistId)
})