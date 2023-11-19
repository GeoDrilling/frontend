import React, {useState} from "react";
import {IInputOutput} from "../types/types.tsx";

export const useInput = (initialState: string): IInputOutput => {
    const [value, setValue] = useState<string>(initialState)
    const [isDirty, setIsDirty] = useState(false)
    const onChange = (event?: React.ChangeEvent<HTMLInputElement>) => {
        if (event != undefined)
            setValue(event.target.value)
    }
    const onBlur = () => {
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

