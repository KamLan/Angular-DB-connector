import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MysqlComponent } from './mysql/mysql.component';
import { PostgresqlComponent } from './postgresql/postgresql.component';
import { MongodbComponent } from './mongodb/mongodb.component';


@NgModule({
  declarations: [
    AppComponent,
    MysqlComponent,
    PostgresqlComponent,
    MongodbComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {


 }
