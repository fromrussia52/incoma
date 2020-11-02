
import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Component({
    selector: 'app-index-saved',
    templateUrl: './saved.component.html',
    styleUrls: ['./saved.component.scss']
})
export class IndexSavedComponent implements OnInit, AfterViewInit, OnDestroy {
    private _subs: Subscription[] = [];

    constructor(
        private apiService: ApiService
    ) { }

    ngOnInit() {
    }

    ngAfterViewInit() {
    }

    ngOnDestroy() {
        this._subs.forEach(s => {
            s.unsubscribe();
        });
    }
}