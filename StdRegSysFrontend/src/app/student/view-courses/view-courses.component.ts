import {Component, Inject, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatChipInputEvent, MatDialogRef} from '@angular/material';
import {ENTER} from '@angular/cdk/keycodes';
import {Course} from '../create-student/create-student.component';
import {NotifierService} from 'angular-notifier';
import {StudentService} from '../student.service';

@Component({
  selector: 'app-view-courses',
  templateUrl: './view-courses.component.html',
  styleUrls: ['./view-courses.component.css']
})
export class ViewCoursesComponent implements OnInit {

  readonly separatorKeysCodes: number[] = [ENTER];
  courses: Course[] = [];
  constructor(
    private _dialogRef: MatDialogRef<ViewCoursesComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) private student: any,
    private notifier: NotifierService,
    private studentService: StudentService
  ) {
  }

  ngOnInit() {
  }

  close(b: boolean) {
    if (b) {
      this._dialogRef.close();
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

  addNewCourses() {
    this.courses.forEach(item => {
      if (!(this.student.course.some(x => x.name.toString().trim().toLowerCase() === item.name.toString().trim().toLowerCase()))) {
        this.student.course.push(item);
        this.courses = [];
      } else {
        this.notifier.notify('warning', `"${item.name}" already offered`);
      }
    });
  }

  dropCourse(course: any) {
    const indexToRemove = this.student.course.indexOf(course);
    this.student.course.splice(indexToRemove, 1);
  }

  submitCourseForm() {
    this.studentService.updateStudent(this.student.studentDetail, this.student.course, this.student._id)
      .subscribe(res => {
        this.notifier.notify('success', 'Courses Offered Successfully');
        this.close(true);
      }, error => this.notifier.notify('danger', `${error}`));
  }
}
