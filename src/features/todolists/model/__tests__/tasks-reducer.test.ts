import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    MainTaskType,
    removeTaskAC,
    tasksReducer
} from '../tasks-reducer'
import {addTodolistAC, removeTodolistAC} from "../todolists-reducer";
import {v1} from "uuid";
import {TaskPriority, TaskStatus} from "common/enums/enums";

let startState: MainTaskType
beforeEach(() => {
     /*startState = {
        todolistId1: [
            { id: '1', title: 'CSS', isDone: false },
            { id: '2', title: 'JS', isDone: true },
            { id: '3', title: 'React', isDone: false },
        ],
        todolistId2: [
            { id: '1', title: 'bread', isDone: false },
            { id: '2', title: 'milk', isDone: true },
            { id: '3', title: 'tea', isDone: false },
        ],
    }*/
    startState = {
        todolistId1: [
            {description: 'string',
                title: 'CSS',
                status: 0,
                priority: 0,
                startDate: 'string',
                deadline: 'string',
                id: '1',
                todoListId: 'todolistId1',
                order: 1,
                addedDate: 'string'},
            {description: 'string',
                title: 'JS',
                status: 2,
                priority: 0,
                startDate: 'string',
                deadline: 'string',
                id: '2',
                todoListId: 'todolistId1',
                order: 1,
                addedDate: 'string'},
            {description: 'string',
                title: 'React',
                status: 0,
                priority: 0,
                startDate: 'string',
                deadline: 'string',
                id: '3',
                todoListId: 'todolistId1',
                order: 1,
                addedDate: 'string'},
        ],
        todolistId2: [
            {description: 'string',
                title: 'bread',
                status: 0,
                priority: 0,
                startDate: 'string',
                deadline: 'string',
                id: '1',
                todoListId: 'todolistId2',
                order: 1,
                addedDate: 'string'},
            {description: 'string',
                title: 'milk',
                status: 2,
                priority: 0,
                startDate: 'string',
                deadline: 'string',
                id: '2',
                todoListId: 'todolistId2',
                order: 1,
                addedDate: 'string'},
            {description: 'string',
                title: 'tea',
                status: 0,
                priority: 0,
                startDate: 'string',
                deadline: 'string',
                id: '3',
                todoListId: 'todolistId2',
                order: 1,
                addedDate: 'string'}
        ],
    }
})
test('correct task should be deleted from correct array', () => {
    const endState = tasksReducer(startState,
        removeTaskAC({
            taskId: '2',
            todolistId: 'todolistId2',
        }))

    expect(endState).toEqual({

        todolistId1: [
            {description: 'string',
                title: 'CSS',
                status: 0,
                priority: 0,
                startDate: 'string',
                deadline: 'string',
                id: '1',
                todoListId: 'todolistId1',
                order: 1,
                addedDate: 'string'},
            {description: 'string',
                title: 'JS',
                status: 2,
                priority: 0,
                startDate: 'string',
                deadline: 'string',
                id: '2',
                todoListId: 'todolistId1',
                order: 1,
                addedDate: 'string'},
            {description: 'string',
                title: 'React',
                status: 0,
                priority: 0,
                startDate: 'string',
                deadline: 'string',
                id: '3',
                todoListId: 'todolistId1',
                order: 1,
                addedDate: 'string'},
        ],
        todolistId2: [
            {description: 'string',
                title: 'bread',
                status: 0,
                priority: 0,
                startDate: 'string',
                deadline: 'string',
                id: '1',
                todoListId: 'todolistId2',
                order: 1,
                addedDate: 'string'},
            {description: 'string',
                title: 'tea',
                status: 0,
                priority: 0,
                startDate: 'string',
                deadline: 'string',
                id: '3',
                todoListId: 'todolistId2',
                order: 1,
                addedDate: 'string'}
        ],
    })
})
test('correct task should be added to correct array', () => {

const newTask = {description: 'string',
    title: 'juce',
    status: TaskStatus.New,
    priority: TaskPriority.Low,
    startDate: 'string',
    deadline: 'string',
    id: '4',
    todoListId: 'todolistId2',
    order: 1,
    addedDate: 'string'}
    const endState = tasksReducer(startState, addTaskAC({task:newTask}))

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId2'][0].title).toBe('juce')

})

test('status of specified task should be changed', () => {
    const endState = tasksReducer(
        startState,
        changeTaskStatusAC({
            taskId: '2',
            status: 0,
            todolistId: 'todolistId2',
        })
    )
    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'][1].status).toBe(0)

})
test('title of specified task should be changed', () => {
    const endState = tasksReducer(
        startState,
        changeTaskTitleAC({
            taskId: '2',
            title: 'NEW',
            todolistId: 'todolistId2',
        })
    )
    expect(endState['todolistId2'].length).toBe(3)
    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'][1].title).toBe('NEW')
})
test('new array should be added when new todolist is added', () => {

    const newTodolist = {
        id: v1(),
        title: 'newTitle',
        addedDate: 'string',
        order: 1,
    }
    const endState = tasksReducer(startState, addTodolistAC(newTodolist))

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k !== 'todolistId1' && k !== 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})
test('property with todolistId should be deleted', () => {

    const action = removeTodolistAC('todolistId2')

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
    // or
    expect(endState['todolistId2']).toBeUndefined()
})