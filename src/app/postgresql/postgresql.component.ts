import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-postgresql',
  templateUrl: './postgresql.component.html',
  styleUrls: ['./postgresql.component.css']
})
export class PostgresqlComponent implements OnInit {

  PostgresUrlConnect="0.0.0.0:8080/connect"
  PostgreslUrlRequest="0.0.0.0:8080/request"
  body
  datas
  connected = 0
  columns = []
  arrayParams = []
  param = []
  success

  constructor(private http: HttpClient) { }
  
  ngOnInit() {
  }

  ConnectMysql(){
    return this.http.post(this.PostgresUrlConnect, this.body)
  }

  connect(ipServer, portServer, userServer, pwServer, type, request){
    this.body = {
      "user": userServer,
      "password": pwServer,
      "server": ipServer,
      "request": request
    }

    this.PostgresUrlConnect="http://0.0.0.0:8080/connectPostgres/"+userServer+"/"+pwServer+"/"+ipServer+"/"+type+"/"+request
    this.ConnectMysql().subscribe(datas => {
      this.datas = datas
    })

    //check update is successfull
    if(this.datas==undefined && type=="UPDATE"){
      console.log("update is successfull")
      this.success = "Update request is successfull"
    }

    if(type=="SELECT"){
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


}
