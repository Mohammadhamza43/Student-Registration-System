import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: '/app/home', pathMatch: 'full' },
  {
    path: 'account',
    loadChildren: () => import('../account/account.module').then(m => m.AccountModule), // Lazy load account module
    data: { preload: true }
  },
  {
    path: 'app',
    loadChildren: () => import('../app/app.module').then(m => m.AppModule), // Lazy load account module
    data: { preload: true }
  },
  // {
  //   path: '**',
  //   // component: NotfoundComponentComponent,
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RootRoutingModule { }
