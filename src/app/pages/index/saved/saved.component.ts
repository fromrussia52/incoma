
import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { FavoriteService } from '../favorite.service';

@Component({
    selector: 'app-index-saved',
    templateUrl: './saved.component.html',
    styleUrls: ['./saved.component.scss']
})
export class IndexSavedComponent implements OnInit {
    public packages: any[] = [];

    constructor(
        private fs: FavoriteService
    ) { }

    ngOnInit() {
        this.packages = this.fs.fav;
    }
}