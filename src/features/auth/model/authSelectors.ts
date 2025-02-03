import {RootState} from "../../../app/store";


export const selectIsLoggedIn = (state: RootState) => state.login.isLoggedIn
export const selectIsInitialized  = (state: RootState) => state.login.isInitialized