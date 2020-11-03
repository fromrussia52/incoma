
import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, AfterViewInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';
import { EventService } from 'src/app/services/event.service';
import { FavoriteService } from '../favorite.service';

@Component({
    selector: 'app-index-all',
    templateUrl: './all.component.html',
    styleUrls: ['./all.component.scss']
})
export class IndexAllComponent implements OnInit, AfterViewInit, OnDestroy {
    private _subs: Subscription[] = [];
    public isLoading: boolean = false;
    public packages: any[] = [];
    public selectDeselectAllModel: boolean = false;
    private needLoad: boolean = true;
    private limit: number = 15;
    private offset: number = 0;
    public form: FormGroup = null;

    constructor(
        private apiService: ApiService,
        private events: EventService,
        private cdr: ChangeDetectorRef,
        private toast: ToastrService,
        private fb: FormBuilder,
        private fs: FavoriteService
    ) {
        let subs_$ = this.events.perfectScrollReachEnd.subscribe(ps => {
            if (this.form.valid && this.needLoad === true && this.isLoading === false) {
                this.getData();
            }
        });
        this._subs.push(subs_$);

        this.form = this.fb.group({
            filter: ['', [Validators.required]],
            api: ['', [Validators.required]]
        });

        this.form.controls.filter.valueChanges.pipe(debounceTime(400)).subscribe(value => {
            this.unsetDataBeforeUpdate();
            this.getData();
        });
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

    checkboxChanged(pack, event) {
        pack.isSelected = !pack.isSelected;
    }

    getData() {
        if (this.isLoading === true) {
            return;
        }

        if (this.form.controls.filter.invalid) {
            this.toast.info('Введите значение для фильтра', 'Информация');
            this.form.controls.filter.markAsTouched();
            return;
        }

        if (this.form.controls.api.invalid) {
            this.toast.info('Введите значение для API key', 'Информация');
            this.form.controls.api.markAsTouched();
            return;
        }

        this.isLoading = true;
        this._subs.push(this.apiService.search(this.form.controls.filter.value, this.limit, this.offset).subscribe((data: HttpResponse<any>) => {
            this.packages = [...this.packages, ...data.body.items];
            this.isLoading = false;

            this.offset += data.body.items.length;
            if (data.body.items.length === 0) {
                this.needLoad = false;
            }

            this.events.perfectScrollNeedUpdate.emit();
            this.packages.forEach(p => p.isSelected = this.selectDeselectAllModel);
            this.cdr.detectChanges();
        }, err => {
            this.toast.error(err.error.message, `Сервер вернул код: ${err.error.code}`);
            this.isLoading = false;
        }));
    }

    addToFav() {
        this.fs.fav = this.selected;
    }

    get selected() {
        return this.packages.filter(p => p.isSelected);
    }
}