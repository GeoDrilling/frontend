import React, { useState } from 'react';

export const useCheckbox = (initialState: boolean): [boolean, (event: React.ChangeEvent<HTMLInputElement>) => void] => {
  const [isRemember, setIsRemember] = useState<boolean>(initialState);
  const onChange = (_: React.ChangeEvent<HTMLInputElement>) => {
    setIsRemember(!isRemember);
  };
  return [isRemember, onChange];
};
