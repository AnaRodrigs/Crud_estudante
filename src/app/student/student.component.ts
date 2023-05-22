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


  Students: Student[] = [];
  isEditing: boolean = false;
  formGroupClient: FormGroup;

  constructor(private studentService: StudentService,
    private formBuilder: FormBuilder) {
    this.formGroupClient = formBuilder.group({
      id: [''],
      name: [''],
      email: [''],
      address: [''],
      phone: [''],
      curso :['']
    });
  }

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
 
 
   save (){
     if (this.isEditing)
     {
       this.studentService.update(this.formGroupClient.value).subscribe(
         {
           next: () => {
             this.loadStudents();
             this.formGroupClient.reset();
             this.isEditing = false;
           }
         }
       )
     }
     else{
     this.studentService.save(this.formGroupClient.value).subscribe(
       {
         next : data => {
           this.Students.push(data)
           this.formGroupClient.reset();
 
         }
       }
     )
   }
 }
   edit (student : Student){
      this.formGroupClient.setValue(student);
      this.isEditing = true;
 
   }
 
   delete (student : Student){
     this.studentService.delete(student).subscribe({
       next : () => this.loadStudents()
     })
 
 }
   clean (){
   this.formGroupClient.reset();
   this.isEditing = false;
   }
 }

