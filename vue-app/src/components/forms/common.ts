/**
 * Common Form Interfaces
 */

 /**
  * Enum of avaialable Form Field Types
  */
export enum FormFieldType {
    INPUT = 'input',
    MARKDOWN = 'markdown'
}

/**
 * Core Interface for an Form Field
 */
export interface IFormField {
    label: string;
    type: FormFieldType;
    placeholder?: string;
    value: null | any;
}

/**
 * Definition of a Field Value key: value pair
 */
export interface IFieldValue {
  [key: string]: string;
}
