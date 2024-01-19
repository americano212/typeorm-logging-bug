import { HttpStatus } from '@nestjs/common';

export class ExceptionResponse {
  public statusCode!: HttpStatus;
  public timestamp!: Date;
  public path!: string;
  public method!: string;
  public message!: string;
  public detail?: string | Array<object> | object;
}
