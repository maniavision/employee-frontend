import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EmployeeListComponent } from './containers/employee-list/employee-list.component';
import { EmployeeSingleComponent } from './containers/employee-single/employee-single.component';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';
import { EmployeeCardComponent } from './components/employee-card/employee-card.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,
    EmployeeSingleComponent,
    EmployeeFormComponent,
    EmployeeCardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
