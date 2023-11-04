import React, {useEffect, useState} from "react";
import {ICheckValidation, IValidation} from "@components/types/types.tsx";

interface UnionValidation {
    isError: boolean;
    setIsError: React.Dispatch<React.SetStateAction<boolean>>;
    predicate: (value: string) => boolean;
}
export const useValidation = (value: string, validations: ICheckValidation[]): IValidation[] => {
    const unionValidations: UnionValidation[] = []
    const validationsOutput: IValidation[] = []
    validations.forEach(validation => {
        const [isError, setIsError] = useState<boolean>(false)
        unionValidations.push({isError, setIsError, predicate: validation.predicate})
        validationsOutput.push({isError, message: validation.message})
    })
    useEffect(() => {
        unionValidations.forEach(v => {
            v.setIsError(v.predicate(value))
        })
    }, [value])
    return validationsOutput
}