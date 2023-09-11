import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { EmailValidator, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
formGroupClient: FormGroup;

  constructor(private studentService: StudentService,
    private formBuilder: FormBuilder) {
    this.formGroupClient = formBuilder.group({
      id: [''],
      name: [''],
      email: ['',
      address: [''],
      phone: [''],
      curso :['']
    });
  } 

  ngOnChanges(changes: SimpleChanges): void{
    this.formGroupClient.setValue(this.student);
  }
  save (){
    this.submitted = true 
    if (this.formGroupClient.valid){
           this.saveEvent.emit(this.formGroupClient.value);
            this.formGroupClient.reset();
            this.submitted = false
        }
  }
  clean() {
    this.CleanEvent.emit();
    this.formGroupClient.reset();
    this.submitted = false;
  }
  
}