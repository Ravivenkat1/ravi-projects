import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as _ from 'lodash'

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

   employeelist:AngularFireList<any>;
  datePipe: any;

  constructor(private firebase:AngularFireDatabase) { }
  form:FormGroup=new FormGroup({
    $key:new FormControl(null),
    fullname:new FormControl('',Validators.required),
    email:new FormControl('',Validators.email),
    mobile:new FormControl('',[Validators.required,Validators.minLength(10)]),
    city:new FormControl(''),
    gender:new FormControl('1'),
    department:new FormControl('0'),
    hiredate:new FormControl(''),
    isPermanent:new FormControl(false)
  
  })
  initializedFormGroup(){
    this.form.setValue({
      $key:'null',
      fullname:'',
      email:'',
      mobile:'',
      city:'',
      gender:'1',
      department:'0',
      hiredate:'',
      isPermanent:'false'



    })
  }
  getEmployees(){
    this.employeelist=this.firebase.list('employees')
    return this.employeelist.snapshotChanges()
  }
  insertEmployee(employee){
    this.employeelist.push({
      fullname:employee.fullname,
      email:employee.email,
      mobile:employee.mobile,
      city:employee.city,
      gender:employee.gender,
      department:employee.department,
      hiredate: employee.hiredate == "" ? "" : this.datePipe.transform(employee.hiredate, 'yyyy-MM-dd'),
      isPermanent:employee.isPermanent

    })
  }
  updateemployee(employee){
     this.employeelist.update(employee.$key,
      {
        fullname:employee.fullname,
      email:employee.email,
      mobile:employee.mobile,
      city:employee.city,
      gender:employee.gender,
      department:employee.department,
      hiredate:employee.hiredate,
      isPermanent:employee.isPermanent

      })
  }

  deleteEmployee($key:string){
        this.employeelist.remove($key)
  }
  populateForm(employee){
    this.form.setValue(_.omit(employee,'departmentName'))
  }
}
