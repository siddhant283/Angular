import { Component } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { InteractionService } from "./AppServices/interaction.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'material';
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );
  loggedIn: boolean = false;

  constructor(private breakpointObserver: BreakpointObserver, public dialog: MatDialog, private userService: InteractionService,  private router: Router) {
    this.userService.loggedInChange.subscribe((value) => {
      this.loggedIn = value;
  });
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogElementsExampleDialog, {
      height: '250px',
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  checkLoginStatus(){
     if(this.userService.verifyUser){
       this.openDialog();
     }
     else{
      this.router.navigate(['/login']);
     }
  }

}

@Component({
  selector: 'dialog-element-example-dialog',
  templateUrl: 'dialog-element-example-dialog.html',
})
export class DialogElementsExampleDialog {
  constructor(private userService: InteractionService, private router: Router, public dialogRef: MatDialogRef<DialogElementsExampleDialog>) {}

    logoutUser(): void{
      this.userService.verifyUser = false;
      if(this.userService.verifyAdmin){
        this.userService.verifyAdmin = false;
      }
      this.dialogRef.close()
      this.router.navigate(['/home']);
      this.userService.toggleLogoutButton();
    }
}
