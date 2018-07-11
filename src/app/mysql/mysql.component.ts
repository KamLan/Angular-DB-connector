import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-mysql',
  templateUrl: './mysql.component.html',
  styleUrls: ['./mysql.component.css']
})

export class MysqlComponent implements OnInit {

  mysqlUrlConnect="0.0.0.0:8080/connect"
  mysqlUrlRequest="0.0.0.0:8080/request"
  body
  connected = 0

  constructor(private http: HttpClient) { }
  
  ngOnInit() {
  }

  ConnectMysql(){
    return this.http.get(this.mysqlUrlConnect, this.body)
  }

  connect(ipServer, portServer, userServer, pwServer, request){
    console.log("coucou")
    var ip:string = ipServer
    var port:string = portServer
    var user:string = userServer
    var pw:string=pwServer
    this.body = {
      "user": user,
      "password": pw,
      "server": ip+":"+port
    }
    console.log("body: ", this.body)
    this.mysqlUrlConnect="http://0.0.0.0:8080/connect/"+user+"/"+pw+"/"+ip+":"+port+"/"+request
    console.log(this.ConnectMysql())
  }


}
