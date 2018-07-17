import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NotifierService } from 'angular-notifier';
import { timeout } from 'q';
import { FormsModule } from '@angular/forms';


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
  insertActivated = 0
  insertTypes = []
  ArrayForm = []
  updateActivated = 0
  arrayUpdate = []
  arrayDataUpdateInput =[]
  dataUpdate:any
  arrayDataInsertInput = []
  dataInsert:any

  private readonly notifier: NotifierService;

  constructor(private http: HttpClient, notifierService: NotifierService) {
    this.notifier = notifierService;
   }
  
  ngOnInit() {
  }

  //HTTP request POST
  ConnectMysqlPost(url){
    return this.http.post(url, this.body)
  }

  //HTTP request GET
  ConnectMysqlGet(url){
    return this.http.get(url)
  }

  getInfoForms(){
    this.insertTypes = []
    var arrayInter = []
    var id = this.getTableID()
    var table = this.getTableName()
    for(var i= 0; i < this.dataInfoTable.length; i++){
      var field = this.dataInfoTable[i].field
      var type = this.dataInfoTable[i].type
      if(type.includes("int")){
        type = "number"
      }
      if(type.includes("varchar")){
        type = "text"
      }
      if(type.includes("enum")){
        type = "select"
      }
      arrayInter.push(field, type)
      this.insertTypes.push(arrayInter)
      arrayInter = []
    }
  }

  //Insert form gen
  FormEntry(){
    this.updateActivated = 0
    this.insertActivated = 1
    this.getInfoForms()
  }

  //INSERT method
  insertEntry(id){
    var db = this.lastConnexion[4]
    var userServer = this.lastConnexion[2]
    var pwServer = this.lastConnexion[3]
    var ipServer = this.lastConnexion[0]
    var id = this.getTableID()
    var table = this.getTableName() 
    var insert =""
    var champs = ""
    for(var i = 0; i < this.columns.length; i++){
      if(this.columns[i]==id){
        break;
      }
    }
    for(var i= 0; i < this.insertTypes.length; i++){
      var nameInput = this.insertTypes[i][0]
      if((document.getElementById(nameInput) as HTMLInputElement).value==""){
        this.notifier.notify( 'error', 'You need to fill every input' );
        return;
      }
      this.arrayDataInsertInput.push((document.getElementById(nameInput) as HTMLInputElement).value)
      insert = insert+"'"+(document.getElementById(nameInput) as HTMLInputElement).value+"',"
      //champs = champs + this.insertTypes[i]
    }
    insert = insert.substring(0, insert.length - 1)
    var request = "INSERT INTO "+table+" VALUES ("+insert+" )"
    console.log(insert)
    this.notifier.notify( 'success', 'Insert is a success' );
    console.log(request)
    this.mysqlUrlConnect = "http://0.0.0.0:8080/connect/"+userServer+"/"+pwServer+"/"+ipServer+"/"
    +this.lastConnexion[4]+"/"+table+"/"+"INSERT"+"/"+request

    this.ConnectMysqlPost(this.mysqlUrlConnect).subscribe(dataInsert => {
      this.dataInsert = dataInsert
    })
    this.notifier.notify( 'success', 'Update is a success' );

     //refresh
     this.connect(this.lastConnexion[0], this.lastConnexion[1], this.lastConnexion[2], 
    this.lastConnexion[3], this.lastConnexion[4], this.lastConnexion[5], this.lastConnexion[6])
  }

  FormUpdate(index){
    this.arrayUpdate = []
    this.updateActivated = 1
    this.insertActivated = 0
    this.getInfoForms()
    this.GetValueUpdate(index)
  }

  GetValueUpdate(index){
    for(var i=0; i < this.insertTypes.length; i++){
      for(var j=0; j < this.columns.length; j++){
        var type = this.columns[j]
        if(this.insertTypes[i][0]==type){
          this.arrayUpdate.push(this.arrayParams[index][j])
        }
      }
    }
  }

  //UPDATE method
  updateEntry(){
    var db = this.lastConnexion[4]
    var userServer = this.lastConnexion[2]
    var pwServer = this.lastConnexion[3]
    var ipServer = this.lastConnexion[0]
    var id = this.getTableID()
    var table = this.getTableName() 
    var update =""
    for(var i = 0; i < this.columns.length; i++){
      if(this.columns[i]==id){
        break;
      }
    }
    for(var i= 1; i < this.insertTypes.length; i++){
      if((document.getElementById(nameInput) as HTMLInputElement).value==""){
        this.notifier.notify( 'error', 'You need to fill every input' );
        return;
      }
      var nameInput = this.insertTypes[i][0]
      this.arrayDataUpdateInput.push((document.getElementById(nameInput) as HTMLInputElement).value)
      update = update+" "+this.insertTypes[i][0]+" = '"+(document.getElementById(nameInput) as HTMLInputElement).value+"',"
    }
    var idValue = (document.getElementById(id) as HTMLInputElement).value
    update = update.substring(0, update.length - 1)
    var request = "UPDATE "+table+" SET "+update+" WHERE "+id+"="+"'"+idValue+"';" 
    console.log(request)
    this.mysqlUrlConnect = "http://0.0.0.0:8080/connect/"+userServer+"/"+pwServer+"/"+ipServer+"/"
    +this.lastConnexion[4]+"/"+table+"/"+"UPDATE"+"/"+request

    this.ConnectMysqlPost(this.mysqlUrlConnect).subscribe(dataUpdate => {
      this.dataUpdate = dataUpdate
    })
    this.notifier.notify( 'success', 'Update is a success' );

     //refresh
     this.connect(this.lastConnexion[0], this.lastConnexion[1], this.lastConnexion[2], 
    this.lastConnexion[3], this.lastConnexion[4], this.lastConnexion[5], this.lastConnexion[6])
  } 

  //DELETE method
  deleteEntry(index){
    var db = this.lastConnexion[4]
    var userServer = this.lastConnexion[2]
    var pwServer = this.lastConnexion[3]
    var ipServer = this.lastConnexion[0]
    var id = this.getTableID()
    var table = this.getTableName()
    for(var i = 0; i < this.columns.length; i++){
      if(this.columns[i]==id){
        break;
      }
    }
    var idValue = this.arrayParams[index][i]
    var request = "DELETE FROM "+table+" WHERE "+id+"="+"'"+idValue+"'" 

    this.mysqlURLDelete = "http://0.0.0.0:8080/delete/"+db+"/"+userServer+"/"+pwServer+"/"+ipServer+"/"+request

    this.ConnectMysqlPost(this.mysqlURLDelete).subscribe(dataDelete => {
      this.dataDelete = dataDelete
    })
    this.notifier.notify( 'success', 'Delete is a success' );

    //refresh
    this.connect(this.lastConnexion[0], this.lastConnexion[1], this.lastConnexion[2], this.lastConnexion[3], 
      this.lastConnexion[4], this.lastConnexion[5], this.lastConnexion[6])
  }

  //REGEX method to get table name in request
  getTableName(){
    if(this.lastConnexion[5]=="SELECT"){
      var word = "from";
      var table = this.lastConnexion[6].match(new RegExp(word + '\\s(\\w+)'))[1];
      return table;
    }
    if(this.lastConnexion[5]=="UPDATE"){
      var word = "update";
      var table = this.lastConnexion[6].match(new RegExp(word + '\\s(\\w+)'))[1];
      return table;
    }
    if(this.lastConnexion[5]=="INSERT"){
      var word = "into";
      var table = this.lastConnexion[6].match(new RegExp(word + '\\s(\\w+)'))[1];
      return table;
    }
    else{
      var word = "from";
      var table = this.lastConnexion[6].match(new RegExp(word + '\\s(\\w+)'))[1];
      return table;
    }
  }

  //GET table id method
  getTableID(){

    var table = this.getTableName()
    var db = this.lastConnexion[4]
    var userServer = this.lastConnexion[2]
    var pwServer = this.lastConnexion[3]
    var ipServer = this.lastConnexion[0]
    var id

    this.mySQLURLGetId = "http://0.0.0.0:8080/getId/"+table+"/"+db+"/"+userServer+"/"+pwServer+"/"+ipServer

    this.ConnectMysqlPost(this.mySQLURLGetId).subscribe(dataInfo => {
      this.dataInfoTable = dataInfo
    })
    id = this.loopID(id)
    return id;
  }

  loopID(id){
    for(var i = 0; i < this.dataInfoTable.length; i++){
      for(var key in this.dataInfoTable[i]){
        if(this.dataInfoTable[i].key=="PRI"){
          id = this.dataInfoTable[i].field
        }
      }
    }
    return id
  }

  //Connect and request method for mysql server
  connect(ipServer, portServer, userServer, pwServer, dbName, type, request){
    this.insertActivated = 0
    this.updateActivated = 0
    this.connected=0
    this.lastConnexion= [ipServer, portServer, userServer, pwServer, dbName, type, request]
    var table = this.getTableName()

    this.mysqlUrlConnect="http://0.0.0.0:8080/connect/"+userServer+"/"+pwServer+"/"+ipServer+"/"+dbName+"/"+table+"/"+type+"/"+request
    this.ConnectMysqlPost(this.mysqlUrlConnect).subscribe(datas => {
      this.datas = datas
      this.getData(this.lastConnexion[5])
    })

    
  }

  //Data treatment for connect method
  getData(type){
    
    //check update is successfull
    if(this.datas==undefined && type=="UPDATE"){
      this.success = "Update request is successfull"
    }

    if(type=="SELECT"){
      this.columns=[]
      this.arrayParams=[]

      //récupération champs requête
      if(this.datas[0]==undefined){
        this.notifier.notify( 'error', 'request is a fail' );
      }
      else{
        for(var key in this.datas[0]){
          this.columns.push(key)
        }
        this.notifier.notify( 'success', 'request is a success' );
      }
      
      //array of array pour display
      for(var j = 0; j < this.datas.length; j++ ){
        this.param =[]
        for(var i = 0; i < this.columns.length; i++){
          this.param.push(this.datas[j][this.columns[i]])
        }
        this.arrayParams.push(this.param)
      }
      this.connected=1
    }
  }


}
