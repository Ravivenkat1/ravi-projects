import { Component, OnInit, Inject } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import { DepartmentsService } from 'src/app/shared/departments.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  departments = [
    {id:1, value: 'Steak'},
    {id:2, value: 'Pizza'},
    {id:3, value: 'Tacos'}
  ];

  

  constructor(@Inject(EmployeeService) public ser,
  @Inject(DepartmentsService) public depser,
  @Inject(NotificationService) private notifyservice,
  public dialogRef:MatDialogRef<EmployeeComponent>) { }

  ngOnInit() {
    this.ser.getEmployees()
  }
  clear(){
    this.ser.form.reset();
    this.ser.initializedFormGroup()
    this.notifyservice.success(':: Submitted sucessfullly')
  }
  onSubmit(){
    if(this.ser.form.valid){
      this.ser.insertEmployee(this.ser.form.value)
      this.ser.form.reset()
      this.ser.initializedFormGroup()
      this.onClose()
      
    }
  }
  onClose(){
    this.ser.form.reset()
    this.ser.initializedFormGroup()
    this.dialogRef.close()
  }
}
