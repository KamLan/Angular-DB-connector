import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mysql',
  templateUrl: './mysql.component.html',
  styleUrls: ['./mysql.component.css']
})
export class MysqlComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }

  mysqlConnect(ip, user, pw){
    var mysql = require('mysql');
    var con = mysql.createConnection({
      
      host: "localhost",
      user: "root",
      password: "secret"
    
    });
    con.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
    });
  }

  connect(ip:string, port:number, user:string, pw:string){
    console.log(ip, port, user, pw);
    this.mysqlConnect(ip, user, pw)
  }

}
