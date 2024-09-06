import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class PasswordStripInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (Array.isArray(data)) {
          return data.map((item) => {
            if (item == null) {
              return item;
            }
            const { password: _password, ...rest } = item;
            return rest;
          });
        }
        if (data == null) {
          return data;
        }
        const { password: _password, ...rest } = data;
        return rest;
      }),
    );
  }
}
