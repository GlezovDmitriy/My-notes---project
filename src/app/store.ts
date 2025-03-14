import {applyMiddleware, combineReducers, legacy_createStore, UnknownAction} from 'redux'
import { tasksReducer } from '../features/todolists/model/tasks-reducer'
import { todolistsReducer } from '../features/todolists/model/todolists-reducer'
import {appReducer} from "./app-reducer";
import {thunk, ThunkDispatch} from "redux-thunk";
import {authReducer} from "../features/auth/model/auth-reducer";
import {configureStore} from "@reduxjs/toolkit";

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    login: authReducer,
})
// непосредственно создаём store
//export const store = legacy_createStore(rootReducer,{}, applyMiddleware(thunk))
export const store = configureStore({ reducer: rootReducer })
// определить автоматически тип всего объекта состояния
//export type RootState = ReturnType<typeof rootReducer>
export type RootState = ReturnType<typeof store.getState>
//export type AppDispatch = typeof store.dispatch
export type AppDispatchType = ThunkDispatch<RootState, unknown, UnknownAction>

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store