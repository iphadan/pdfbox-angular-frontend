// fillable-form.model.ts

export enum PdfFieldTypeEnum {
    TEXT = 'text',
    DROPDOWN = 'DROPDOWN',
    CHECKBOX = 'CHECKBOX',
    RADIO = 'RADIO'
  }
  // export interface PDFFillabl {
  //   name: string;
  //   id: string;
  //   type: PdfFieldTypeEnum;
  //   value: any;
  // }
  export interface PDFFillableField {
    name: string;
    id: string;
    type: PdfFieldTypeEnum;
    value: any;
  }
  