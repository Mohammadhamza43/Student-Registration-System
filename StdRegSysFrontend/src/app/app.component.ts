import {Component, DoCheck, OnDestroy, OnInit} from '@angular/core';
import {UserDto} from '../account/login/login.service';
import {StudentService} from './student/student.service';
import {SectionService} from './student/create-student/create-section/section.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-component',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

sectionSubscription: Subscription;
studentSubscription: Subscription;
courseSubscription: Subscription;
userSubscription: Subscription;

  constructor(
    private stdService: StudentService,
    private sectionService: SectionService,
    private router: Router
  ) {
    this.getWidgetsData();
  }

  user: UserDto;

  users = 0;
  Courses = 0;
  Sections = 0;
  students = 0;

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  userLogout() {
    localStorage.clear();
    this.router.navigate(['/account/login']);
  }

  getWidgetsData() {
    this.sectionSubscription = this.sectionService.getSections().subscribe(res => this.Sections = res.sections.length);
    this.studentSubscription = this.stdService.getStudents().subscribe(res => this.students = res.length);
    this.courseSubscription = this.stdService.getCourses().subscribe(res => this.Courses = res.courses.length);
    this.userSubscription = this.stdService.getUSers().subscribe(res => this.users = res.users.length);
  }

  ngOnDestroy(): void {
    this.sectionSubscription.unsubscribe();
    this.studentSubscription.unsubscribe();
    this.courseSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }
}
