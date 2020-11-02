import { Component } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { EventService } from './services/event.service';
import { UiLoaderService } from './services/ui-loader.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    subscriptions: Subscription[] = [];

    constructor(
        private router: Router,
        private events: EventService,
        private uiLoader: UiLoaderService,
        private spinner: NgxSpinnerService
    ) {

        let subs1$ = this.router.events.pipe(filter(event => event instanceof NavigationStart)).subscribe((event) => {
            this.events.uiLoaderShowHide.emit(true);
        });
        this.subscriptions.push(subs1$);

        let subs2$ = this.router.events.pipe(filter(event => {
            if ((event instanceof NavigationEnd) || (event instanceof NavigationError) || (event instanceof NavigationCancel)) {
                return true;
            }
        })).subscribe((event) => {
            this.events.uiLoaderShowHide.emit(false);
        });
        this.subscriptions.push(subs2$);
    }

    ngOnInit() {
    }

    ngOnDestroy() {
        this.subscriptions.forEach(sub => {
            sub.unsubscribe();
        });
    }
}
