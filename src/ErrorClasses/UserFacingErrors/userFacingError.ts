import { HttpStatusCodes } from '../../HttpStatusCodes/httpStatusCodes';
import { ApplicationError } from '../baseErrorClass';

class BadRequestError extends ApplicationError {
  constructor(description: string, httpCode = HttpStatusCodes.BAD_REQUEST, isOperational = false, name = 'Bad Request') {
    super(description, httpCode, isOperational, name);
  }
}

class NotFoundError extends ApplicationError {
  constructor(description: string, httpCode = HttpStatusCodes.NOT_FOUND, isOperational = false, name = 'Resource Not Found') {
    super(description, httpCode, isOperational, name);
  }

}

class UnauthorizedError extends ApplicationError {
  constructor(description: string, httpCode = HttpStatusCodes.UNAUTHORIZED, isOperational = false, name = 'Unauthorised') {
    super(description, httpCode, isOperational, name);
  }
}

class AccessDeniedError extends ApplicationError {
  constructor(description: string, httpCode = HttpStatusCodes.ACCESS_DENIED, isOperational = false, name = 'Access Denied') {
    super(description, httpCode, isOperational, name);
  }


}

export { BadRequestError, NotFoundError, UnauthorizedError, AccessDeniedError };
