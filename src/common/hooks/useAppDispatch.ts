import {useDispatch} from "react-redux";
import {AppDispatch} from "../../app/store";
// Типизация диспатча
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()