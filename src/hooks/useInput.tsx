import React, {useState} from "react";
import {ICheckValidation, IInputOutput} from "@components/types/types.tsx";
import {useValidation} from "./useValidation.tsx";

export const useInput = (initialState: string, checkValid?: ICheckValidation[]): IInputOutput => {
    const [value, setValue] = useState<string>(initialState)
    const [isDirty, setIsDirty] = useState(false)

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)
    }
    const onBlur = (_: React.FocusEvent<HTMLInputElement>) => {
        setIsDirty(true);
    }
    const inputOutput: IInputOutput = {
        input: {
            value,
            onChange,
            onBlur
        },
        isDirty
    }
    if (checkValid)
        inputOutput.validations = useValidation(value, checkValid)
    return inputOutput
}
/*
[string, (event: React.ChangeEvent<HTMLInputElement>) => void,
    (event: React.FocusEvent<HTMLInputElement>) => void, boolean]*/
