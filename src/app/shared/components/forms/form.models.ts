// *****************
// Form models
// *****************

export interface FormOptionsContract {
    formTitle?: string;
    allowReset?: boolean;
    submitText?: string;
    formStyles?: string[];
}
export class FormOptions implements FormOptionsContract {
    formTitle = null;
    allowReset = true;
    submitText = "Submit";
    formStyles = [];

    constructor(formOptions?: FormOptionsContract) {
        if (formOptions) {
            for (let opt in formOptions) {
                this[opt] = formOptions[opt];
            }
        }
    }
}

// *****************
// Field models
// *****************

export enum FieldType {
    InputField = 0,
    SelectField = 1
}

interface BaseFieldContract {
    name: string;
    required?: boolean;
    styles?: string[];
    label?: string;
}
export abstract class BaseField implements BaseFieldContract {
    name: string;
    value: any;
    required = true;
    styles = [];
    label = null;

    fieldType: FieldType;
}

export interface InputFieldContract extends BaseFieldContract {
    type?: string;
    placeholder?: string;
}
export class InputField extends BaseField implements InputFieldContract{
    type = "text";
    placeholder = "";
    fieldType = FieldType.InputField;

    constructor(inputFieldOptions: InputFieldContract) {
        super();
        for (let opt in inputFieldOptions) {
            this[opt] = inputFieldOptions[opt];
        }
    }
}

export interface FieldData {
    fieldType: FieldType;
    value: string;
}
export interface FormData {
    [fieldName: string]: FieldData;
}
