import {RootState} from "./store";

export const selectThemeMode = (state: RootState) => state.app.themeMode
export const selectStatusMode = (state: RootState) => state.app.status
export const errorMode = (state: RootState) => state.app.error