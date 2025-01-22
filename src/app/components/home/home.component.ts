import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AddUserComponent } from '../add-user/add-user.component';
import { AddDataService } from '../../services/add-data.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatTableModule, MatToolbarModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  username: string = '';
  displayedColumns: string[] = ['username', 'password', 'role', 'actions'];
  user: Array<{ username: string; password: string; confirmPassword: string; role: string }> = [];
  
  constructor(private dialog: MatDialog, private upd:AddDataService) {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      this.username = storedUsername;
    }
  }
  ngOnInit(): void {
    this.upd.getUsers().subscribe((users) => {
      this.user = users;   
    });
  }
  openAddUserDialog(user: any = null, index: number = -1): void {
    const dialogRef = this.dialog.open(AddUserComponent, {
      width: '500px',
      height: '500px',
      data: { 
        user: user ? {...user } : { username: '', password: '', confirm_password: '', role: '' },
        index: index,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (index !== -1) { 
          this.upd.updateUser(result,index);
        } else {
          this.upd.addUser(result);
        }
         
      }
    });
  }
}
