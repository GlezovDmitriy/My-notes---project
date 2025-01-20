import {SyntheticEvent, useEffect, useState} from 'react'
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import {useAppSelector} from "common/hooks/useAppSelector";
import {errorMode} from "../../app/appSelectors";
import {useAppDispatch} from "common/hooks/useAppDispatch";
import {setAppErrorAC} from "../../app/app-reducer";


export const ErrorSnackbar = () => {
    const dispatch = useAppDispatch()
    const [open, setOpen] = useState(true)
    const error = useAppSelector(errorMode)
    //const error = true
    console.log(error)

    /*useEffect(() => {
        if (error !== null) {
            setOpen(true);
        }
    }, [error]);*/
    const handleClose = (event: SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }

        //dispatch(setAppErrorAC('TEST ERROR MESSAGE'))
        dispatch(setAppErrorAC(null))
        //setOpen(false)
        //console.log(error)
    }

    return (
        <Snackbar open={!!error} autoHideDuration={5000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" variant="filled" sx={{width: '100%'}}>
                {error}
            </Alert>
        </Snackbar>
    )
}