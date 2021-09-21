import { Injectable, Component } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { Router } from '@angular/router';
import { InteractionService } from "../AppServices/interaction.service";
import {MatDialog, MatDialogRef} from '@angular/material/dialog';



@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private loginService: InteractionService,  public dialog: MatDialog){}

  openDialog() {
    const dialogRef = this.dialog.open(UserLoginDialog, {
      height: '250px',
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  boolean {
      if(this.loginService.verifyUser)
      {
        return true
      }
    this.openDialog();  
    return false;
  }
  
}

@Component({
  selector: 'dialog-element-example-dialog-user',
  templateUrl: 'dialog-element-example-dialog-user.html',
})
export class UserLoginDialog {
  constructor(private router: Router, public dialogRef: MatDialogRef<UserLoginDialog>) {}

    loginRedirect(): void{
      this.dialogRef.close();
      this.router.navigate(['/login']);
    }
}

