import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/entities/employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit{
  employees!: Employee[];

  constructor(private employeeService: EmployeeService) {
  }

  ngOnInit(): void {
    this.employeeService.read().subscribe((employees: Employee[]) => {
      this.employees = employees;
    });
  }
}
