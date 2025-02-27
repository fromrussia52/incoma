import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
    path: '',
    redirectTo: '/packages/all',
    pathMatch: 'full'
}, {
    path: 'packages',
    loadChildren: () => import('./pages/index/index.module').then(m => m.IndexModule)
}, {
    path: '**',
    redirectTo: '/packages/all'
}];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
