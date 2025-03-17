import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';
import { EmployeeCardComponent } from './components/employee-card/employee-card.component';
import { EmployeeListComponent } from './containers/employee-list/employee-list.component';
import { EmployeeSingleComponent } from './containers/employee-single/employee-single.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
      { path: 'employees', component: EmployeeListComponent },
      { path: 'employees/new', component: EmployeeSingleComponent, data: { isEdit: false } },
      { path: 'employees/:id', component: EmployeeSingleComponent, data: { isEdit: true } },
      { path: '', pathMatch: 'full', redirectTo: 'employees' },
]

@NgModule({
  declarations: [
    EmployeeListComponent,
    EmployeeSingleComponent,
    EmployeeFormComponent,
    EmployeeCardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    EmployeeListComponent,
    EmployeeSingleComponent
  ]
})
export class EmployeeModule { }
