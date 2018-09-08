/**
 * Common Form Interfaces
 */
export enum FormFieldType {
    INPUT = 'input',
    MARKDOWN = 'markdown'
}

export interface IFormField {
    label: string;
    type: FormFieldType;
    placeholder?: string;
    value: null | any;
}

export interface IFieldValue {
  [key: string]: string;
}
