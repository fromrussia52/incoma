
import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { EventService } from 'src/app/services/event.service';
import { IPackage } from '../package.model';

@Component({
    selector: 'app-index-all',
    templateUrl: './all.component.html',
    styleUrls: ['./all.component.scss']
})
export class IndexAllComponent implements OnInit, AfterViewInit, OnDestroy {
    private _subs: Subscription[] = [];
    public isLoading: boolean = false;
    public packages: IPackage[] = [];
    public selectDeselectAllModel: boolean = false;
    private needLoad: boolean = true;
    private limit: number = 15;
    private offset: number = 0;
    public filter: string = null;

    constructor(
        private apiService: ApiService,
        private events: EventService,
        private cdr: ChangeDetectorRef
    ) {
        let subs_$ = this.events.perfectScrollReachEnd.subscribe(ps => {
            if (this.needLoad === true && this.isLoading === false) {
                this.getData();
            }
        });
        this._subs.push(subs_$);
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
    }

    ngOnDestroy() {
        this._subs.forEach(s => {
            s.unsubscribe();
        });
    }

    selectDeselectAll(value: Event) {
        this.packages.forEach(p => {
            p.isSelected = value.target['checked'];
        });
    }

    unsetDataBeforeUpdate() {
        this.packages = [];
        this.offset = 0;
        this.needLoad = true;
        this.selectDeselectAllModel = false;
    }

    checkboxChanged(pack: IPackage, event) {
        pack.isSelected = !pack.isSelected;
    }

    getData() {
        if (this.isLoading === true) {
            return;
        }
        this.isLoading = true;
        this._subs.push(this.apiService.search(this.filter, this.limit, this.offset).subscribe((data: any) => {
            this.packages = [...this.packages, ...data.items];
            this.isLoading = false;

            this.offset += data.items.length;
            if (data.items.length === 0) {
                this.needLoad = false;
            }

            this.events.perfectScrollNeedUpdate.emit();
            this.cdr.detectChanges();
        }, err => {
            this.isLoading = false;
        }));
    }
}