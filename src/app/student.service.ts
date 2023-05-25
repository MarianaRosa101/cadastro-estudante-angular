import { Injectable } from '@angular/core';
import { Student } from './student-model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = 'http://localhost:3000/students';

  constructor(private http: HttpClient) { }

  getStudents() {
    return this.http.get<Student[]>(this.apiUrl);
  }

  addStudent(student: Student) {
    return this.http.post<Student>(this.apiUrl, student);
  }
}



