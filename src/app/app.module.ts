import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeModule } from "./employee/employee.module";
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  { path: 'employee', loadChildren: () => import('./employee/employee.module').then(x => x.EmployeeModule) },
  { path: '', pathMatch: 'full', redirectTo: 'employees' },
  { path: '**', pathMatch: 'full', redirectTo: 'employee' }
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule, // this is needed because employee service is provided in root
    RouterModule.forRoot(routes),
    // EmployeeModule
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
