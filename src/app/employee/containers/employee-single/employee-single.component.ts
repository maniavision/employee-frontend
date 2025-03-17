import { Component } from '@angular/core';
import { Employee } from '../../entities/employee';
import { EmployeeService } from '../../services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employee-single',
  templateUrl: './employee-single.component.html',
  styleUrls: ['./employee-single.component.css']
})
export class EmployeeSingleComponent {
  employee!: Employee;
  isEdit!: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService) {
      const id = this.activatedRoute.snapshot.paramMap.get('id');
      this.isEdit = this.activatedRoute.snapshot.data['isEdit'];
    this.employeeService.readOne(Number(id)).subscribe((employee: Employee) => {
      console.log(employee);
      this.employee = employee;
    });
  }

  onCreateEventHandler(newEmployee: Employee) {
    this.employeeService.create(newEmployee).subscribe(() => {
      console.log("New employee created successfully!");
      this.router.navigate(['employees']);
    });
  }

  onUpdateEventHandler(updatedEmployee: Employee) {
    this.employeeService.update(updatedEmployee).subscribe(() => {
      console.log("Employee updated successfully!");
      this.router.navigate(['employees']);
    });
  }
}
