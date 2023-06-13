import { Component } from '@angular/core';
import { Student } from '../student';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent {
  student : Student ={} as Student;
  isEditing: boolean = false;
  students: Student [] = [];

  constructor(private studentService: StudentService){}
  

  ngOnInit(): void {
    this.loadStudents();
   }
   loadStudents() {
     this.studentService.getStudents (). subscribe(
       {
         next : data => this.students = data
       }
     );
   }
 
   onSaveEvent (student : Student){
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
           this.students.push(data);
 
         }
       }
     );
   }
 }
 edit(student: Student) {
  this.student = student;
 this.isEditing = true;

 }

   onCleanEvent (){
   this.isEditing = false;
   }
   delete(student: Student) {
    this.studentService.delete(student).subscribe({
    next: () => this.loadStudents()
      })
 }
}
