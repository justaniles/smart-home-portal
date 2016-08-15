import { Component, EventEmitter, Input, HostListener, OnInit, Output } from '@angular/core';
import { FORM_DIRECTIVES } from "@angular/forms";
import { BaseField, FormOptions, FormData } from "./form.models";

@Component({
    selector: 'pc-form',
    directives: [FORM_DIRECTIVES],
    template: require("./form.html"),
    styles: [require("./form.scss")]
})
export class FormComponent implements OnInit{

    @Input() fields: BaseField[];
    @Input() options: FormOptions;
    @Output() submitRequest = new EventEmitter<FormData>();

    ngOnInit() {
        if (!this.fields) {
            this.fields = [];
        }

        if (!this.options) {
            this.options = new FormOptions();
        }
    }

    @HostListener("ngSubmit") submitForm() {
        // TODO: perform validation
        const fieldInfo: FormData = {};

        for (let field of this.fields) {
            fieldInfo[field.name] = {
                fieldType: field.fieldType,
                value: field.value
            };
        }

        this.submitRequest.emit(fieldInfo);
    }
}
