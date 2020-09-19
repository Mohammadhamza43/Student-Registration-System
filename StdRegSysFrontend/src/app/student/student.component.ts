import { Component, OnInit } from '@angular/core';
import {StudentService} from './student.service';
import {StudentDto} from './StudentDto';
import {Course} from './create-student/create-student.component';
import {Router} from '@angular/router';
import {NotifierService} from 'angular-notifier';
import {MatDialog} from '@angular/material';
import {ViewCoursesComponent} from './view-courses/view-courses.component';
import {take} from 'rxjs/operators';

class StudentInfo {
  studentDetails: StudentDto[];
  course: Course[];
}

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  students: StudentDto[] = [];
  studentInfo: StudentInfo[] = [];
  count = 5;
  p = 1;

  constructor(
    private studentService: StudentService,
    private router: Router,
    private notifier: NotifierService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getStudents();
  }

  showCourses(student: any) {
    const dialogRef = this.dialog.open(ViewCoursesComponent, {data: student});
    dialogRef.afterClosed().pipe(take(1)).subscribe(res => this.getStudents());
  }

  Update(student: any) {
    this.router.navigate(['/app/home/student'], {queryParams: {q: student._id}});
  }

  Delete(student: any) {
    this.studentService.deleteStudent(student._id).pipe(take(1)).subscribe((res) => {
      this.notifier.notify('success', 'Deleted Successfully!');
      this.getStudents();
    }, error => {this.notifier.notify('warning', `${error}`); });
  }

  getStudents() {
    this.studentService.getStudents().pipe(take(1)).subscribe(
      (data) => {
        this.studentInfo = data;
      },
      error => console.log(error)
    );
  }
}
