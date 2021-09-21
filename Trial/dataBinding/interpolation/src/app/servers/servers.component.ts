import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {

  allowNewServer = false;
  serverCreationStatus = 'No server was created!';
  servername ='testServer';
  serverCreated = false;
  serverId: number = 10;
  serverStatus: string = 'offline';
  servers = ['testserver1','testserver2'];

   getServerStatus() {
    
     return this.serverStatus;
  }


  constructor() {
    setTimeout(() => {
      this.allowNewServer=true;
    },2000)

    this.serverStatus = Math.random() > 0.5 ? 'online' : 'offline';

   }

  ngOnInit(): void {
  }

  onCreateServer()
  {
    this.serverCreationStatus = 'Server was created! Name is' + this.servername;
    
    this.serverCreated=true;
  }

  getColor()
  {
    return this.serverStatus === 'online' ? 'red' : 'green';
  }

  // onUpdateServerName(event:Event)
  // {
  //   this.servername = (<HTMLInputElement>event.target).value;
  // }

}
