import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import { AppComponent } from './app.component';
import {CommonModule} from '@angular/common';
import {AppRoutingModule} from './app-routing.module';
import { StudentComponent } from './student/student.component';
import { CreateStudentComponent } from './student/create-student/create-student.component';
import {FormsModule} from '@angular/forms';
import {AngularMaterialModule} from './angular-material/angular-material.module';
import {NotifierModule} from 'angular-notifier';
import { ViewCoursesComponent } from './student/view-courses/view-courses.component';
import {MatDialogModule} from '@angular/material';
import { CreateSectionComponent } from './student/create-student/create-section/create-section.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {FilterPipeModule} from 'ngx-filter-pipe';

@NgModule({
  declarations: [
    AppComponent,
    StudentComponent,
    CreateStudentComponent,
    ViewCoursesComponent,
    CreateSectionComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    AngularMaterialModule,
    NotifierModule,
    MatDialogModule,
    NgxPaginationModule,
    FilterPipeModule
  ],
  entryComponents: [ViewCoursesComponent, CreateSectionComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class AppModule { }
