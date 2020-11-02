import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { IPackage } from './package.model';
import { ApiService } from '../../services/api.service';
import { NgModel } from '@angular/forms';
import { debounceTime, filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { NavigationEnd, Router } from '@angular/router';
import { PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import { EventService } from 'src/app/services/event.service';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnDestroy, AfterViewInit {
    @ViewChild(PerfectScrollbarDirective, { read: PerfectScrollbarDirective, static: true }) perfectScrollbar: PerfectScrollbarDirective;

    public activeMenu: any = {
        all: false,
        saved: false
    }
    private subscriptions: Subscription[] = [];

    constructor(
        private router: Router,
        private events: EventService
    ) {
        let subs_1$ = this.router.events.pipe(
            filter(event => event instanceof NavigationEnd)
        ).subscribe((event: NavigationEnd) => {
            let partUrl = event.url === event.urlAfterRedirects ? event.url.split('/')[2].replace(/\?.*/, '') : event.urlAfterRedirects.split('/')[2].replace(/\?.*/, '');
            for (let i in this.activeMenu) {
                if (i === partUrl) {
                    this.activeMenu[i] = true;
                } else {
                    this.activeMenu[i] = false;
                }
            }

            this.scrollToTop();
        });
        this.subscriptions.push(subs_1$);
    }

    ngOnDestroy() {
        this.subscriptions.forEach(sub => {
            sub.unsubscribe();
        });
    }

    ngAfterViewInit() {
        let subs_2$ = this.events.perfectScrollNeedUpdate.subscribe(_ => {
            this.perfectScrollbar.update();
        });
        this.subscriptions.push(subs_2$);

        let subs_3$ = this.perfectScrollbar.psYReachEnd.pipe(debounceTime(400)).subscribe(val => {
            this.events.perfectScrollReachEnd.emit(val);
        });
        this.subscriptions.push(subs_3$);

        let subs_4$ = this.events.perfectScrollToTop.subscribe(_ => {
            this.scrollToTop();
        });
        this.subscriptions.push(subs_4$);
    }

    navigate(value) {
        this.router.navigate([value]);
    }

    scrollToTop() {
        this.perfectScrollbar.scrollToTop();
        this.perfectScrollbar.update();
    }

}