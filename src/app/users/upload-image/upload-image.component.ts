import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { AuthService } from '../../auth/auth.service';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css']
})
export class UploadImageComponent implements OnInit {
  form: FormGroup;
  loading = false;
  @ViewChild('fileInput') fileInput: ElementRef;
  currentUser = this.authService.getUser().username;
  user_id: any;

  constructor(private authService: AuthService, private usersService: UsersService, private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
    console.log('CURRENT: ', this.currentUser);
    this.usersService.getUserByUsername(this.currentUser).subscribe(
      (data: any) => {
        console.log('upload component data: ', data);
        this.user_id = data.id;
      }
    );
  }

  createForm() {
    this.form = this.fb.group({
      avatar: null
    });
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('avatar').setValue(file);
    }
  }

  private prepareSave(): any {
    const input = new FormData();
    input.append('avatar', this.form.get('avatar').value);
    return input;
  }

  onSubmit() {
    const formModel = this.prepareSave();
    this.loading = true;
    // In a real-world app you'd have a http request / service call here like
    // this.http.post('apiUrl', formModel)
    this.usersService.uploadImage(this.user_id, formModel).subscribe(
      data => {
        console.log('upload subscribe data: ', data);
      }
    );
    setTimeout(() => {
      // FormData cannot be inspected (see "Key difference"), hence no need to log it here
      console.log('done!');
      this.loading = false;
    }, 1000);
  }

  clearFile() {
    this.form.get('avatar').setValue(null);
    this.fileInput.nativeElement.value = '';
  }

}
