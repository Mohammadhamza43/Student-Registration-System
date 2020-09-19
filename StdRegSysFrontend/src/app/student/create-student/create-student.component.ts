import {Component, OnInit} from '@angular/core';
import {StudentDto} from '../StudentDto';
import {StudentService} from '../student.service';
import {MatChipInputEvent, MatDialog} from '@angular/material';
import {ENTER} from '@angular/cdk/keycodes';
import {ActivatedRoute, Router} from '@angular/router';
import {take} from 'rxjs/operators';
import {NotifierService} from 'angular-notifier';
import {ViewCoursesComponent} from '../view-courses/view-courses.component';
import {CreateSectionComponent} from './create-section/create-section.component';
import {SectionService} from './create-section/section.service';

class SectionDto {
  _id: string;
  name: string;
}

export class Course {
  _id?: string;
  name: string;
}

// @ts-ignore
@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.css']
})
export class CreateStudentComponent implements OnInit {

  private readonly notifier: NotifierService;

  emailPattern = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
  student: StudentDto = new StudentDto();
  sections: SectionDto[] = [];
  courses: Course[] = [];
  readonly separatorKeysCodes: number[] = [ENTER];
  maxDate = new Date();
  private update = false;
  private masterId;
  sectionId: {_id: string, name?: string} = {_id: null};
  Action = 'Create New';

  constructor(
    private sectionService: SectionService,
    private studentService: StudentService,
    private aRoute: ActivatedRoute,
    private router: Router,
    private notifierService: NotifierService,
    private dialog: MatDialog
  ) {
    this.notifier = notifierService;
    this.aRoute.queryParams.pipe(take(1)).subscribe((param) => {
      if (param.q) {
        this.masterId = param.q;
        this.update = true;
        this.Action = 'Update';
        this.studentService.getById(param.q).pipe(take(1)).subscribe((res) => {
          this.student = res.student.studentDetail;
          this.courses = res.student.course;
          this.sectionId._id = this.student.section._id;
        });
      }
    });

  }

  ngOnInit() {
    this.getSections();
  }

  save() {
    this.student.section = this.sectionId;
    if (this.update) {
      this.studentService.updateStudent(this.student, this.courses, this.masterId).subscribe(res => {
        this.notifier.notify('success', 'Updated Successfully!');
        this.resetForm();
        this.router.navigate(['/app/home/students']);
      }, error => this.notifier.notify('error', `${error.error.error}`));
    } else {
      this.studentService.createStudent(this.student, this.courses).subscribe((res) => {
        this.notifier.notify('success', 'Created Successfully');
        this.resetForm();
        this.router.navigate(['/app/home/students']);
      }, error => this.notifier.notify('error', `${error.error.error}`));
    }

  }

  remove(course: any) {
    const index = this.courses.indexOf(course);
    if (index >= 0) {
      this.courses.splice(index, 1);
    }
  }

  add($event: MatChipInputEvent) {
    const input = $event.input;
    const value = $event.value;
    const course = {name: ''};
    course.name = value;
    this.courses.push(course);
    if (input) {
      input.value = '';
    }
  }

  createSection() {
    const dialogRef = this.dialog.open(CreateSectionComponent);
    dialogRef.afterClosed().pipe(take(1)).subscribe(res => this.getSections());
  }

  getSections() {
    this.sectionService.getSections().pipe(take(1)).subscribe((res) => {
      this.sections = res.sections;
    });
  }

  resetForm() {
    this.student = new StudentDto();
    this.courses = [];
    this.sectionId = {_id: null};
  }
}
