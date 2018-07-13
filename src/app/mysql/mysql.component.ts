import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-mysql',
  templateUrl: './mysql.component.html',
  styleUrls: ['./mysql.component.css']
})

export class MysqlComponent implements OnInit {

  mysqlUrlConnect
  mySQLURLGetId
  mysqlURLDelete
  body
  datas:any
  dataInfoTable:any
  dataDelete:any
  connected = 0
  columns = []
  arrayParams = []
  param = []
  success = ""
  lastConnexion = []

  constructor(private http: HttpClient) { }
  
  ngOnInit() {
  }

  ConnectMysqlPost(url){
    return this.http.post(url, this.body)
  }

  updateEntry(index){
    console.log("update trigger")
    console.log(index)
    console.log(this.arrayParams[index])
  } 

  deleteEntry(index){
    var db = this.lastConnexion[4]
    var userServer = this.lastConnexion[2]
    var pwServer = this.lastConnexion[3]
    var ipServer = this.lastConnexion[0]
    var id = this.getTableID()
    var table = this.getTableName()
    console.log(table)
    for(var i = 0; i < this.columns.length; i++){
      if(this.columns[i]==id){
        break;
      }
    }
    var idValue = this.arrayParams[index][i]
    var request = "DELETE FROM "+table+" WHERE "+id+"="+"'"+idValue+"'" 

    this.mysqlURLDelete = "http://0.0.0.0:8080/delete/"+db+"/"+userServer+"/"+pwServer+"/"+ipServer+"/"+request
    console.log(this.mysqlURLDelete)
    this.ConnectMysqlPost(this.mysqlURLDelete).subscribe(dataDelete => {
      this.dataDelete = dataDelete
    })
  }

  getTableName(){
    var word = "from";
    var table = this.lastConnexion[6].match(new RegExp(word + '\\s(\\w+)'))[1];
    return table;
  }

  getTableID(){

    var table = this.getTableName()
    var db = this.lastConnexion[4]
    var userServer = this.lastConnexion[2]
    var pwServer = this.lastConnexion[3]
    var ipServer = this.lastConnexion[0]

    this.mySQLURLGetId = "http://0.0.0.0:8080/getId/"+table+"/"+db+"/"+userServer+"/"+pwServer+"/"+ipServer

    this.ConnectMysqlPost(this.mySQLURLGetId).subscribe(dataInfo => {
      this.dataInfoTable = dataInfo
    })

    for(var i = 0; i < this.dataInfoTable.length; i++){
      for(var key in this.dataInfoTable[i]){
        if(this.dataInfoTable[i].key=="PRI"){
          var id = this.dataInfoTable[i].field
        }
      }
    }
    return id;
  }

  connect(ipServer, portServer, userServer, pwServer, dbName, type, request){

    this.lastConnexion= [ipServer, portServer, userServer, pwServer, dbName, type, request]

    this.mysqlUrlConnect="http://0.0.0.0:8080/connect/"+userServer+"/"+pwServer+"/"+ipServer+"/"+dbName+"/"+type+"/"+request
    this.ConnectMysqlPost(this.mysqlUrlConnect).subscribe(datas => {
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
