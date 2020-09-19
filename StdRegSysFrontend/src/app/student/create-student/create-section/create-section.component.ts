import {Component, Inject, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {SectionService} from './section.service';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'app-create-section',
  templateUrl: './create-section.component.html',
  styleUrls: ['./create-section.component.css']
})
export class CreateSectionComponent implements OnInit {
  saving = false;
  sectionName: any = '';

  constructor(
    private _dialogRef: MatDialogRef<CreateSectionComponent>,
    private sectionService: SectionService,
    private notifier: NotifierService

  ) { }

  ngOnInit() {
  }

  close(b: boolean) {
    if (b) {
      this._dialogRef.close();
    }
  }

  save() {
    this.saving = true;
    this.sectionService.createSection(this.sectionName).subscribe(res => {
      this.notifier.notify('success', 'Created Successfully!');
      this.close(true);
    }, (error) => {
      this.notifier.notify('error', `${error.error}`);
      console.log(error);
    });
  }
}
