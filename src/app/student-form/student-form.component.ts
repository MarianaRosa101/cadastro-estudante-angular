import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentService } from '../student.service';
import { Student } from '../student-model';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent implements OnInit {
  studentForm!: FormGroup;
  students: Student[] = [];

  constructor(private formBuilder: FormBuilder, private studentService: StudentService) { }

  ngOnInit() {
    this.studentForm = this.formBuilder.group({
      name: ['', Validators.required],
      age: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      major: ['', Validators.required]
    });

    this.studentService.getStudents().subscribe(students => {
      this.students = students;
    });
  }

  onSubmit() {
    if (this.studentForm.invalid) {
      return;
    }

    const student = this.studentForm.value;
    this.studentService.addStudent(student).subscribe(() => {
      this.studentService.getStudents().subscribe(students => {
        this.students = students;
      });
    });

    this.studentForm.reset();
  }
}
