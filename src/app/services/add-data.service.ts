import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
 
@Injectable({
  providedIn: 'root',
})
export class AddDataService {
  private usersSubject = new BehaviorSubject<{ username: string; password: string; confirmPassword: string; role: string }[]>([
    { username: 'Aditi', password: 'aduu#123', confirmPassword: 'aduu#123', role: 'Intern' },
  ]);
 
  getUsers() {
    return this.usersSubject.asObservable();  
  }
 
  addUser(user: { username: string; password: string; confirmPassword: string;role: string }): void {
    const currentUsers = this.usersSubject.value;
    this.usersSubject.next([...currentUsers, user]);  
    
  }
  updateUser(updatedUser: { username: string; password: string; confirmPassword: string; role: string }, index: number) {
    const currentUsers = this.usersSubject.value;
    currentUsers[index] = updatedUser;  
    this.usersSubject.next([...currentUsers]);  
  }
}
 