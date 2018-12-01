export interface FieldError {
  Key: string;
  AttemptedValue: string;
  Messages: string[];
}

export interface OperationError {
  Message?: string;
  Code?: string;
  Fields: FieldError[];
}
