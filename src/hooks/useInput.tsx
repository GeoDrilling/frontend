import React, {useState} from "react";
import {IInputOutput} from "../types/types.tsx";

export const useInput = (initialState: string): IInputOutput => {
    const [value, setValue] = useState<string>(initialState)
    const [isDirty, setIsDirty] = useState(false)
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)
    }
    const onBlur = (_: React.FocusEvent<HTMLInputElement>) => {
        setIsDirty(true);
    }
    return {
        input: {
            value,
            onChange,
            onBlur
        },
        isDirty,
        validations: []
    }
}
/*
{predicate: validateEmail, message: 'Некорректный email'}
{predicate: value => value.trim() === '', message: 'Пароль не должен быть пустым'},
{predicate: value => value.trim().length < 5, message: 'Пароль должен быть длинее 5 символов'}
    */
