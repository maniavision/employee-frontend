import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Employee } from '../../entities/employee';

@Component({
  selector: 'app-employee-card',
  templateUrl: './employee-card.component.html',
  styleUrls: ['./employee-card.component.css']
})
export class EmployeeCardComponent {

  @Input() employee!: Employee;
  @Output() delete: EventEmitter<Employee> = new EventEmitter<Employee>();

  onDeleteHandler() {
    this.delete.emit(this.employee);
  }
}
