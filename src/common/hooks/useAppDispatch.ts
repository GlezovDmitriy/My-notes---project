import {useDispatch} from "react-redux";
import { AppDispatchType} from "../../app/store";
// Типизация диспатча
export const useAppDispatch = useDispatch<AppDispatchType>