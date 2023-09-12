import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup,  } from '@angular/forms';
import { Student } from '../student';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})

export class StudentFormComponent implements OnChanges{
@Input()
student : Student = {} as  Student;

@Output()
saveEvent = new EventEmitter<Student>();

@Output()
CleanEvent = new EventEmitter<void>();


submitted: boolean = false;
formGroupStudent: FormGroup;

  constructor(private studentService: StudentService,
    private formBuilder: FormBuilder) {
    this.formGroupStudent = formBuilder.group({
      id: [''],
      name: [''],
      email: [''],
      address: [''],
      phone: [''],
      course :[''],
    });
  } 

  ngOnChanges(changes: SimpleChanges): void{
    this.formGroupStudent.setValue(this.student);
  }
  save (){
    this.submitted = true 
    if (this.formGroupStudent.valid){
           this.saveEvent.emit(this.formGroupStudent.value);
            this.formGroupStudent.reset();
            this.submitted = false
        }
  }
  clean() {
    this.CleanEvent.emit();
    this.formGroupStudent.reset();
    this.submitted = false;
  }
  
}