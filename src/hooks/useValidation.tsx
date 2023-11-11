import {useEffect, useState} from "react";
import {ICheckValidation, IValidation} from "../types/types.tsx";

export const useValidation = (value: string, validation: ICheckValidation): IValidation => {
    const [isError, setIsError] = useState<boolean>(false)
    useEffect(() => {
        setIsError(validation.predicate(value))
    }, [value, validation]);
    return {isError, message: validation.message}
}