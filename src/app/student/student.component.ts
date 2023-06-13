import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Student } from '../student';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent {
  student : Student ={} as Student;
  isEditing: boolean = true;
  Students: Student[] = [];

  constructor(private studentService: StudentService){}
  

  ngOnInit(): void {
    this.loadStudents();
   }
   loadStudents() {
     this.studentService.getStudents (). subscribe(
       {
         next : data => this.Students = data
       }
     );
   }
 
 
   onSaveEVent (student : Student){
     if (this.isEditing)
     {
       this.studentService.update(student).subscribe(
         {
           next: () => {
             this.loadStudents();
             this.isEditing = false;
           }
         }
       )
     }
     else{
     this.studentService.save(student).subscribe(
       {
         next : data => {
           this.Students.push(data)
 
         }
       }
     );
   }
 }
   
   OnCleanEvent (student : Student){
   this.isEditing = false;
   }
 }

