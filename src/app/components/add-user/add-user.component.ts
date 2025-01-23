import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms'; 
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
 
export interface UserDialogData {
  user: {
    username: string;
    password: string;
    confirm_password: string;
    role: string;
  },
  index?: number;   
}

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [MatIconModule, MatInputModule, MatButtonModule, MatSelectModule, MatFormFieldModule, ReactiveFormsModule],
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent {
  userForm: FormGroup;
  isPasswordVisible: boolean = false;
  isConfirmPasswordVisible: boolean = true;

  constructor(
    private dialogRef: MatDialogRef<AddUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserDialogData,   
    private fb: FormBuilder
  ) {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirm_password: ['', [Validators.required, Validators.minLength(8)]],
      role: ['', Validators.required]
    });

    if (data) {
      this.userForm.patchValue(data.user); 
    }
  }

  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
 
  toggleConfirmPasswordVisibility(): void {
    this.isConfirmPasswordVisible = !this.isConfirmPasswordVisible;
  }
 
  onSubmit(): void {
    if (this.userForm.valid) {
      const user = this.userForm.value;
 
      if (user.password == user.confirm_password) {
        this.dialogRef.close(user);   
      } else {
        alert('Passwords do not match');
      }
    } else {
      alert('Please fill out all fields correctly');
    }
  }
  
  onCancel(): void {
    this.dialogRef.close();  
  }
}
