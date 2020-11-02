import { Injectable, EventEmitter } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class EventService {
    perfectScrollReachEnd: EventEmitter<any> = new EventEmitter();
    perfectScrollNeedUpdate: EventEmitter<any> = new EventEmitter();
    perfectScrollToTop: EventEmitter<any> = new EventEmitter();
    uiLoaderShowHide: EventEmitter<boolean> = new EventEmitter();
}
