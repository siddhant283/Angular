import { Injectable, Component } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { InteractionService } from "../AppServices/interaction.service";
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private adminService: InteractionService, public dialog: MatDialog){ }

  openDialog() {
    const dialogRef = this.dialog.open(AdminLoginDialog, {
      height: '250px',
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean  {
      if(this.adminService.verifyAdmin){
        return true;
      }
    this.openDialog();  
    return false;
  }
  
}

@Component({
  selector: 'dialog-element-example-dialog-admin',
  templateUrl: 'dialog-element-example-dialog-admin.html',
})
export class AdminLoginDialog {
  constructor(private router: Router, public dialogRef: MatDialogRef<AdminLoginDialog>, private userService: InteractionService) {}

    loginRedirect(): void{
      this.dialogRef.close();
      if(this.userService.verifyUser){
        this.userService.verifyUser = false;
        this.userService.toggleLogoutButton();
      }
      this.router.navigate(['/login']);
    }
}
