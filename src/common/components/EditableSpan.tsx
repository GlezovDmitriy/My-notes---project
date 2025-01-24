import React, {ChangeEvent, useState} from 'react';

type Props = {
    value: string
    onChange: (newTitle: string) => void
    disabled?: boolean
}
export const EditableSpan = ({value, onChange, disabled}: Props) => {
    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState(value)
    const activateEditModeHandler = () => {
        setEditMode(true)
    }
    const deactivateEditModeHandler = () => {
        setEditMode(false)
        onChange(title)

    }
    const changeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }
    return (
        <>
            {editMode ? (
                <input value={title}
                       autoFocus
                       onBlur={deactivateEditModeHandler}
                       onChange={changeTitleHandler}
                       disabled={disabled}
                       />
            ) : (
                <span onDoubleClick={activateEditModeHandler} >{value}</span>
            )}
        </>
    )
};

