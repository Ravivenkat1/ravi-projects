import { Injectable } from '@angular/core';
import { MatSnackBar,MatSnackBarConfig } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(public snakbar:MatSnackBar) { }
  config:MatSnackBarConfig={
    duration:2000,
    verticalPosition:'top',
    horizontalPosition:'right'
  }

  success(msg){
    this.config['panelClass']=['notification','success']
    this.snakbar.open(msg,'',this.config)
  }

}
