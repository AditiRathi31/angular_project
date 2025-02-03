import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AddUserComponent, UserDialogData } from '../add-user/add-user.component';
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
  displayedColumns: string[] = ['username', 'role', 'edit', 'delete'];
  user: UserDialogData[] = [];

  constructor(private dialog: MatDialog, private upd: AddDataService) {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      this.username = storedUsername;
    }
  }
  ngOnInit(): void {
    this.getUsers();
  }

  private getUsers() {
    this.upd.getUsers().subscribe((users) => {
      this.user = users;
    });
  }

  userDelete(id: number): void {
    this.upd.deleteUser(id).subscribe({
      next: () => {
        this.getUsers();
      }
    });
  }


  openAddUserDialog(user: UserDialogData | null): void {
    const dialogRef = this.dialog.open(AddUserComponent, {
      width: '500px',
      height: '500px',
      data: user ? { ...user } : { username: '', password: '', confirmPassword: '', role: '', id: -1 }

    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getUsers();
      }
    });

  }
}