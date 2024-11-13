import { Component } from '@angular/core';
import { PDFDocumentProxy, PdfViewerModule } from 'ng2-pdf-viewer';
import { PdfFieldTypeEnum, PDFFillableField } from './fillable-form.model';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { NgFor } from '@angular/common';


@Component({
  selector: 'app-fillable-editor',
  standalone: true,
  imports: [PdfViewerModule,FormsModule,NgFor],
  templateUrl: './fillable-editor.component.html',
  styleUrls: ['./fillable-editor.component.css']
})
export class FillableEditorComponent {
  pdfSrc = 'assets/templateFillable.pdf';
  public _formFields: PDFFillableField[] = [];
  private _currentFormValues: any[] = [];
  formValues: any=[];

  public loadCompleted(pdf: PDFDocumentProxy): void {
    this._currentFormValues = [];
    for (let i = 1; i <= pdf.numPages; i++) {
      // console.log("page ==> ", i );
      pdf.getPage(i)
        .then(page => page.getAnnotations())
        .then(annotations => {
          // console.log(annotations);
          const widgetAnnotations = (annotations as any[]).filter(a => a.subtype === 'Widget');
          widgetAnnotations.forEach(annotation => this._createInput(annotation));
        });
    }
  }

  private _createInput(annotation: any): void {
    const input: PDFFillableField = {
      name: annotation.fieldName,
      id: annotation.id,
      type: PdfFieldTypeEnum.TEXT,  // or other types
      value: annotation.buttonValue || ''
    };
    
    input.name = annotation.fieldName;
    input.id = annotation.id;

    switch (annotation.fieldType) {
      case 'Tx':
        input.type = PdfFieldTypeEnum.TEXT;
        input.value = annotation.buttonValue || '';
        break;
      case 'Ch':
        input.type = PdfFieldTypeEnum.DROPDOWN;
        input.value = annotation.buttonValue || '';
        break;
      case 'Btn':
        input.type = annotation.checkBox ? PdfFieldTypeEnum.CHECKBOX : PdfFieldTypeEnum.RADIO;
        input.value = annotation.buttonValue || '';
        break;
      default:
        input.type = PdfFieldTypeEnum.TEXT;
        input.value = annotation.buttonValue || '';
    }
    // console.log(input);
    this._formFields.push(input);
  }



  private _getFieldValues(): void {
    this._formFields.map(input => {
      const ele = <HTMLInputElement>document.getElementById(input.id);
      // console.log(ele);

      if (ele != null) {
        if (input.type === PdfFieldTypeEnum.CHECKBOX) {
          this.formValues[input.name] = ele.checked;
        } else if (input.type === PdfFieldTypeEnum.RADIO) {
          if (!ele.checked) {
          } else {
            this.formValues[input.name] = input.value;
          }
        } else {
          this.formValues[input.name] = ele.value;
        }
      }
    });
  }
  getFieldValues(): void {
    this._getFieldValues();  // this will map and collect values
    console.log(this.formValues);  // output form values
  }
}
