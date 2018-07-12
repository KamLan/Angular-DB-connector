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
  datas
  connected = 0
  columns = []
  arrayParams = []
  param = []

  constructor(private http: HttpClient) { }
  
  ngOnInit() {
  }

  ConnectMysql(){
    return this.http.post(this.mysqlUrlConnect, this.body)
  }

  connect(ipServer, portServer, userServer, pwServer, request){
    this.body = {
      "user": userServer,
      "password": pwServer,
      "server": ipServer,
      "request": request
    }

    this.mysqlUrlConnect="http://0.0.0.0:8080/connect/"+userServer+"/"+pwServer+"/"+ipServer+"/"+request
    this.ConnectMysql().subscribe(datas => {
      this.datas = datas
    })

    this.columns=[]
    this.arrayParams=[]

    //récupération champs requête
    for(var key in this.datas[0]){
      this.columns.push(key)
    }

    //array of array pour display
    for(var j = 0; j < this.datas.length; j++ ){
      this.param =[]
      for(var i = 0; i < this.columns.length; i++){
        this.param.push(this.datas[j][this.columns[i]])
      }
      this.arrayParams.push(this.param)
    }
    console.log("params: ",this.arrayParams)
    this.connected=1
  }


}
