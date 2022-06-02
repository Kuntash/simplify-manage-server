import formidable from 'formidable';

export interface IGrade {
  value: number;
  subOrgId: string;
}

export interface FormidableFileType extends File {
  filepath: any;
}
export interface CustomFilesType extends formidable.Files {
  [key: string]: FormidableFileType | File[];
}
