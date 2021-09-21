import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Directives';
  servername: string = '';
  serverStatus = false;
  servers: any = [];

  onUpdateServer(event: Event)
  {
    this.servername = (<HTMLInputElement>event.target).value;
    if(this.servername!=='')
    {
      this.serverStatus = true;
    }
   
    else
    {
      this.serverStatus = false;
    }

  }

  addServer()
  {
    this.servers.push(this.servername);
    console.log(this.servers);
  }

}
