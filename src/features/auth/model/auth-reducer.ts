import {Dispatch} from "redux";
import {LoginArgs} from "../api/authApi.types";
import {setAppStatusAC} from "../../../app/app-reducer";
import {todolistsApi} from "../../todolists/api/todolistsApi";
import {AxiosResponse} from "axios";
import {BaseResponse, ItemResponseType} from "common/types";
import {ResultCode} from "common/enums/enums";
import {handleServerAppError} from "common/utils/handleServerAppError";
import {handleServerNetworkError} from "common/utils/handleServerNetworkError";
import {addTodolistAC} from "../../todolists/model/todolists-reducer";
import {authApi} from "../api/authApi";

type InitialStateType = typeof initialState

const initialState = {
    isLoggedIn: false,
}

export const authReducer = (
    state: InitialStateType = initialState,
    action: ActionsType
): InitialStateType => {
    switch (action.type) {
        case 'SET_IS_LOGGED_IN':
            return { ...state, isLoggedIn: action.payload.isLoggedIn }
        default:
            return state
    }
}
// Action creators
const setIsLoggedInAC = (isLoggedIn: boolean) => {
    return { type: 'SET_IS_LOGGED_IN', payload: { isLoggedIn } } as const
}

// Actions types
type ActionsType = ReturnType<typeof setIsLoggedInAC>

// thunks
export const loginTC = (data: LoginArgs) => (dispatch: Dispatch) => {
    console.log('loginTC')
    dispatch(setAppStatusAC('loading'))
    authApi
        .login(data)
        .then((res)=>{
            if(res.data.resultCode === ResultCode.Success){ // проверяем что все норм
                dispatch(setIsLoggedInAC(true))
                dispatch(setAppStatusAC('succeeded'))
                localStorage.setItem('sn-token', res.data.data.token)
            }else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) =>{
                handleServerNetworkError(error, dispatch)
            }
        )
}
export const logoutTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authApi
        .logout()
        .then(res => {
            if (res.data.resultCode === ResultCode.Success) {
                dispatch(setAppStatusAC('succeeded'))
                dispatch(setIsLoggedInAC(false))
                localStorage.removeItem('sn-token')
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}
