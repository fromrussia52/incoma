import { NgModule } from '@angular/core';
import { IndexComponent } from './index.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IndexAllComponent } from './all/all.component';
import { IndexSavedComponent } from './saved/saved.component';
import { CommonModule } from '@angular/common';
import { PerfectScrollbarConfigInterface, PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { FavoriteService } from './favorite.service';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
};

const routes: Routes = [{
    path: '',
    redirectTo: 'all',
    pathMatch: 'full',
}, {
    path: '',
    component: IndexComponent,
    children: [{
        path: 'all',
        component: IndexAllComponent
    }, {
        path: 'saved',
        component: IndexSavedComponent
    }]
}]

@NgModule({
    declarations: [
        IndexComponent,
        IndexAllComponent,
        IndexSavedComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        ReactiveFormsModule,
        PerfectScrollbarModule
    ],
    providers: [{
        provide: PERFECT_SCROLLBAR_CONFIG,
        useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }, FavoriteService
    ]
})
export class IndexModule { }
