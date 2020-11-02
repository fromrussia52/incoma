import { Injectable, EventEmitter } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { EventService } from './event.service';

@Injectable({
    providedIn: 'root'
})
export class UiLoaderService {
    public visible: boolean = false;
    private count: number = 0;

    constructor(
        private spinner: NgxSpinnerService,
        private events: EventService
    ) {
        this.events.uiLoaderShowHide.subscribe((value: boolean) => {
            if (value === true) {
                this.count++;
                this.visible = value;
            }
            if (value === false) {
                this.count--;
                if (this.count <= 0) {
                    this.count = 0;
                    this.visible = value;
                }
            }

            if (this.visible === true) {
                this.spinner.show();
            } else {
                this.spinner.hide();
            }
        });
    }
}
