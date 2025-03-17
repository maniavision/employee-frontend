import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../entities/employee';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit{
  employees: Employee[] = [];

  constructor(
    private employeeService: EmployeeService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.employeeService.read().subscribe((employees: Employee[]) => {
      console.log(employees);
      this.employees = employees;
    });
  }

  onDeleteEventHandler(deletedEmployee: Employee) {
    console.log(deletedEmployee);
    this.employeeService.delete(deletedEmployee).subscribe(() => {
      this.router.navigate([this.router.url])
    });
  }
}
