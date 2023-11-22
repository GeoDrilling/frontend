import React, { FC, PropsWithChildren } from 'react';

export type FCC<P = {}> = FC<PropsWithChildren<P>>;
export interface IInput {
  label?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  type?: string;
}
export interface ICheckValidation {
  predicate: (value: string) => boolean;
  message: string;
}
export interface IValidation {
  isError: boolean;
  message: string;
}
export interface IInputOutput {
  input: IInput;
  isDirty: boolean;
  validations?: IValidation[];
}
