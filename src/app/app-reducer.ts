export type ThemeMode = 'dark' | 'light'
export type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed'


type InitialState = typeof initialState
// Actions types
type ChangeThemeActionType = ReturnType<typeof changeThemeAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>

type ActionsType = ChangeThemeActionType | SetAppStatusActionType | SetAppErrorActionType
const initialState = {
    themeMode: 'light' as ThemeMode,
    status: 'loading' as RequestStatus,
    error: null as string | null,
}

export const appReducer = (
    state: InitialState = initialState,
    action: ActionsType
): InitialState => {
    switch (action.type) {
        case 'CHANGE_THEME':
            return {...state, themeMode: action.payload.themeMode}
        case 'SET_STATUS':
            return { ...state, status: action.payload.status }
        case 'SET_ERROR':
            return { ...state, error: action.payload.error }
        default:
            return state
    }
}

export const changeThemeAC = (themeMode:ThemeMode) => { return {type:'CHANGE_THEME', payload: {themeMode:themeMode}} as const}
export const setAppStatusAC = (status: RequestStatus) => {return {type: 'SET_STATUS', payload: { status: status }} as const}
//export const setAppErrorAC = (error: string | null) => {return {type: 'SET_ERROR',payload: { error }} as const}
export const setAppErrorAC = (error: string | null) => {
    return {
        type: 'SET_ERROR',
        payload: { error },
    } as const
}