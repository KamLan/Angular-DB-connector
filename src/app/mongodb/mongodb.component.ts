import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-mongodb',
  templateUrl: './mongodb.component.html',
  styleUrls: ['./mongodb.component.css']
})
export class MongodbComponent implements OnInit {

  MongoUrlConnect="0.0.0.0:8080/connectMongo"
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
    return this.http.post(this.MongoUrlConnect, this.body)
  }

  connect(ipServer, portServer, userServer, pwServer, type, request){
    this.body = {
      "user": userServer,
      "password": pwServer,
      "server": ipServer,
      "request": request
    }

    this.MongoUrlConnect="http://0.0.0.0:8080/connectMongo/"+userServer+"/"+pwServer+"/"+ipServer+"/"+type+"/"+request
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
