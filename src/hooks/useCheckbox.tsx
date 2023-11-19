import React, {useState} from "react";

export const useCheckbox = (initialState: boolean):
    [boolean, (event: React.ChangeEvent<HTMLInputElement>) => void] => {
    const [isRemember, setIsRemember] = useState<boolean>(initialState)
    const onChange = () => {
        setIsRemember(!isRemember)
    }
    return [isRemember, onChange]
}