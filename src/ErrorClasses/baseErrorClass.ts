import { HttpStatusCodes } from '../HttpStatusCodes/httpStatusCodes';

class ApplicationError extends Error {
  // ApplicationError - This is the ancestor of all other error classes i.e all other error classes inherits from it.

  public readonly name: string;
  public readonly httpCode: HttpStatusCodes;
  public readonly isOperational: boolean;
  public readonly description: string;

  constructor(description: string, httpCode: HttpStatusCodes, isOperational: boolean, name: string) {
    super(description);
    // Object.setPrototypeOf(this, new.target.prototype);

    this.description = description;
    this.httpCode = httpCode;
    this.isOperational = isOperational;
    this.name = name;
  }
}

export { ApplicationError};
