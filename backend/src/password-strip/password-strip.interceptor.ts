import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class PasswordStripInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(map(data => {
    if (Array.isArray(data)) {
      return data.map(item => {
      const { password, ...rest } = item;
      return rest;
      });
    }
      const { password, ...result } = data;
      return result;
    }));
    
  }
}
