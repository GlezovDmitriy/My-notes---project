import React, {ChangeEvent, useState} from 'react';
import Button from '@mui/material/Button'
import DeleteIcon from '@mui/icons-material/Delete'
import {TextField} from "@mui/material";

type Props = {
    addItem: (title: string) => void
    disabled?: boolean
}

export const AddItemForm = ({addItem, disabled}: Props) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const addItemHandler = () => {
        if (title.trim() !== '') {
            addItem(title.trim())
            setTitle('')
        } else {
            setError('Title is required')
        }
    }

    const changeItemHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    const addItemOnKeyUpHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.key === 'Enter') {
            addItemHandler()
        }
    }

    return (
        <div>
            {/*<input className={error ? 'error' : ''}
                   value={title}
                   onChange={changeItemHandler}
                   onKeyUp={addItemOnKeyUpHandler}
            />*/}
            <TextField
                label="Enter a title"
                className={error ? 'error' : ''}
                value={title}
                size={'small'}
                onChange={changeItemHandler}
                onKeyUp={addItemOnKeyUpHandler}
                disabled={disabled}
            />
            {/*<Button title={'+'} onClick={addItemHandler}/>*/}
            <Button size="medium" variant="outlined" onClick={addItemHandler} disabled={disabled}>
                +
            </Button>
            {error && <div className={'error-message'}>{error}</div>}
        </div>
    );
}
