export interface IDocument {
  companySigDate: string;
  companySignatureName: string;
  documentName: string;
  documentStatus: string;
  documentType: string;
  employeeNumber: string;
  employeeSigDate: string;
  employeeSignatureName: string;
  id: string;
}

export interface IResponse<T> {
  data: T | null;
  error_code: number;
  profiling: string;
  error_text?: string;
  error_message?: string;
  timings: string | null;
}