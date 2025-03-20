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
  data: T;
  error_code: number;
  error_message: string;
  profiling: string;
  timings: string | null;
}