import { Injectable, OnDestroy } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError, of, Subscription } from 'rxjs';
import { retry, catchError, finalize, tap } from 'rxjs/operators';
import { EventService } from './event.service';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

    constructor(
        private events: EventService
    ) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        this.events.uiLoaderShowHide.emit(true);

        return next.handle(req).pipe(
            tap(evnt => {
            }),
            catchError((err: any) => {
                return throwError(err);
            }),
            finalize(() => {
                this.events.uiLoaderShowHide.emit(false);
            }));
    }
}