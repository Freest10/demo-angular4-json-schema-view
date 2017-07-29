import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { JsonSchemaFormService } from 'angular4-json-schema-view';

@Component({
  selector: 'custom-input-widget',
  template: `Cstom Input
    <div
      [class]="options?.htmlClass">
      <label *ngIf="options?.title"
             [attr.for]="'control' + layoutNode?._id"
             [class]="options?.labelHtmlClass"
             [class.sr-only]="options?.notitle"
             [innerHTML]="options?.title"></label>
      <input #inputControl
             [attr.aria-describedby]="'control' + layoutNode?._id + 'Status'"
             [attr.list]="'control' + layoutNode?._id + 'Autocomplete'"
             [attr.maxlength]="options?.maxLength"
             [attr.minlength]="options?.minLength"
             [attr.pattern]="options?.pattern"
             [attr.placeholder]="options?.placeholder"
             [attr.required]="options?.required"
             [class]="options?.fieldHtmlClass"
             [disabled]="controlDisabled"
             [id]="'control' + layoutNode?._id"
             [name]="controlName"
             [readonly]="options?.readonly ? 'readonly' : null"
             [type]="layoutNode?.type"
             [value]="controlValue"
             (input)="updateValue($event)">
      <datalist *ngIf="options?.typeahead?.source"
                [id]="'control' + layoutNode?._id + 'Autocomplete'">
        <option *ngFor="let word of options?.typeahead?.source"
                [value]="word">
      </datalist>
    </div>
  `,
})
export class CustomInputComponent implements OnInit {
  formControl: AbstractControl;
  controlValue: any;
  controlName: string;
  options: Object;
  @Input() layoutNode;


  constructor(
    private jsf: JsonSchemaFormService
  ) { }

  ngOnInit() {
    this.options = this.layoutNode.options;
    this.jsf.initializeControl(this);
  }

  updateValue(event) {
    this.jsf.updateValue(this, event.target.value);
  }

}
