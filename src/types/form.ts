import {
  PasswordInputProps as MantinePasswordInputProps,
  RadioGroupProps as MantineRadioGroupProps,
  RadioProps,
  SelectProps as MantineSelectProps,
  TextareaProps as MantineTextareaProps,
  TextInputProps as MantineTextInputProps,
  CheckboxGroupProps as MantineCheckboxGroupProps,
  CheckboxProps,
  NumberInputProps as MantineNumberInputProps,
  MultiSelectProps as MantineMultiSelectProps,
  FileInputProps as MantineFileInputProps,
  SwitchGroupProps as MantineSwitchGroupProps,
  SwitchProps as MantineSwitchProps,
  GridColProps,
  StackProps,
} from '@mantine/core';
import { DateInputProps as MantineDateInputProps } from '@mantine/dates';
import { ReactNode } from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';

export type Option<OtherProps = {}> = {
  label: ReactNode;
  value: any;
} & Omit<OtherProps, 'value' | 'label'>;

export interface Options<OtherProps = {}> {
  options: Option<OtherProps>[];
}

export type Controlled<T> = { label: ReactNode; name: string } & T;
export type TextInputProps = Controlled<MantineTextInputProps>;
export type PasswordInputProps = Controlled<MantinePasswordInputProps>;
export type TextareaProps = Controlled<MantineTextareaProps>;
export type NumberInputProps = Controlled<MantineNumberInputProps>;
export type DateInputProps = Controlled<MantineDateInputProps>;
export type FileInputProps<T extends boolean> = Controlled<MantineFileInputProps<T>>;
export type SelectProps = Controlled<
  Omit<MantineSelectProps, 'data'> & {
    options: MantineSelectProps['data'];
  }
>;
export type MultiSelectProps = Controlled<
  Omit<MantineMultiSelectProps, 'data'> & {
    options: MantineMultiSelectProps['data'];
  }
>;
export type CheckboxGroupProps = Controlled<
  Omit<MantineCheckboxGroupProps, 'children'> & Options<CheckboxProps> & { stackProps?: StackProps }
>;
export type RadioGroupProps = Controlled<
  Omit<MantineRadioGroupProps, 'children'> & Options<RadioProps> & { stackProps?: StackProps }
>;
export type SwitchGroupProps = Controlled<
  Omit<MantineSwitchGroupProps, 'children'> &
    Options<MantineSwitchProps> & { stackProps?: StackProps }
>;
export type SwitchProps = Controlled<MantineSwitchProps>;

export type ControllerProps =
  | ({ control: 'checkbox-group' } & CheckboxGroupProps)
  | ({ control: 'date-input' } & DateInputProps)
  | ({ control: 'file-input' } & FileInputProps<boolean>)
  | ({ control: 'multi-select' } & MultiSelectProps)
  | ({ control: 'number-input' } & NumberInputProps)
  | ({ control: 'password-input' } & PasswordInputProps)
  | ({ control: 'radio-group' } & RadioGroupProps)
  | ({ control: 'select' } & SelectProps)
  | ({ control: 'switch-group' } & SwitchGroupProps)
  | ({ control: 'switch' } & SwitchProps)
  | ({ control: 'text-area' } & TextareaProps)
  | ({ control: 'text-input' } & TextInputProps);

export type ControllerMap<TFieldValues extends FieldValues, TContext> = {
  [key in keyof TFieldValues]-?: ControllerProps & { name: key } & {
    col?: GridColProps;
    Field?: (props: {
      ctx: UseFormReturn<TFieldValues, TContext>;
      fieldComponent: ReactNode;
    }) => ReactNode;
  };
};

export type ControllerMapResolver<TFieldValues extends FieldValues = FieldValues, TContext = any> =
  | ControllerMap<TFieldValues, TContext>
  | ((context: UseFormReturn<TFieldValues, TContext>) => ControllerMap<TFieldValues, TContext>);

export type FormControllerProps<TFieldValues extends FieldValues = FieldValues, TContext = any> = {
  controllers: ControllerMapResolver<TFieldValues, TContext>;
};
