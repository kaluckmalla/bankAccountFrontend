import { HttpStatusCode } from "@angular/common/http";

export class ExceptionMessage {
    statusCode: number;
    message: string;
    status: HttpStatusCode;
}
