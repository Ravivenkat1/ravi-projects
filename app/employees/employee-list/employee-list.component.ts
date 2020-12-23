import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatDialogConfig } from "@angular/material";
import { DepartmentsService } from 'src/app/shared/departments.service';
import { EmployeeComponent } from '../employee/employee.component';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  listdata:MatTableDataSource<any>
  displayColumns:string[]=["fullname",'email','mobile','city',"departmentName",'actions'];
 @ViewChild(MatSort) sort:MatSort;
 //  @ViewChildren(MatSort) sort:MatSort;
 @ViewChild(MatPaginator) paginator:MatPaginator

 searchKey:string;

  constructor(@Inject(EmployeeService) public empser,
  @Inject(DepartmentsService) public depser,
  private dialog:MatDialog ) { }

  ngOnInit() {
    this.empser.getEmployees().subscribe(
      list=>{
        let array=list.map(item=>{
          let departmentName = this.depser.getDepartmentName(item.payload.val()['department']);
          return {
            $key:item.key,
            departmentName,
            ...item.payload.val()
          }
          
        })
        this.listdata=new MatTableDataSource(array)
        this.listdata.sort=this.sort
        this.listdata.paginator=this.paginator
      } 
    )
  }
  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.listdata.filter = this.searchKey.trim().toLowerCase();
  }
  onCreate(){
    this.empser.initializedFormGroup()
    const dialogConfig=new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="60%";
    this.dialog.open(EmployeeComponent,dialogConfig)
  }
  onEdit(row){
    this.empser.populateForm(row)
    const dialogConfig=new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="60%";
    this.dialog.open(EmployeeComponent,dialogConfig)
  }
}
