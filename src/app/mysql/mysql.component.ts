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
  datas:any
  connected = 0
  columns = []
  arrayParams = []
  param = []
  success = ""
  lastConnexion = []

  constructor(private http: HttpClient) { }
  
  ngOnInit() {
  }

  ConnectMysql(){
    return this.http.post(this.mysqlUrlConnect, this.body)
  }

  updateEntry(index){
    console.log("update trigger")
    console.log(index)
    console.log(this.arrayParams[index])
  }

  deleteEntry(index){
    var table = "employees";
    console.log("delete trigger")
    console.log(index)
    console.log(this.arrayParams[index]) 
    var request = "DELETE FROM "+table+" WHERE id="+this.arrayParams[index][1] 
    console.log(request)
  }

  connect(ipServer, portServer, userServer, pwServer, dbName, type, request){

    this.lastConnexion= [ipServer, portServer, userServer, pwServer, dbName, type, request]

    this.mysqlUrlConnect="http://0.0.0.0:8080/connect/"+userServer+"/"+pwServer+"/"+ipServer+"/"+dbName+"/"+type+"/"+request
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
