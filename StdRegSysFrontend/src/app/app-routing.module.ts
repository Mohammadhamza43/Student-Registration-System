import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppComponent} from './app.component';
import {AuthGuardGuard} from './auth-guard.guard';
import {StudentComponent} from './student/student.component';
import {CreateStudentComponent} from './student/create-student/create-student.component';


const routes: Routes = [
  {
    path: 'home',
    component: AppComponent,
    canActivate: [AuthGuardGuard],
    children: [
      {
        path: 'students',
        component: StudentComponent,
        canActivate: [AuthGuardGuard]
      },
      {
        path: 'student',
        component: CreateStudentComponent,
        canActivate: [AuthGuardGuard]
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
