import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from '../../entities/employee';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent {

  @Input() employee!: Employee;
  @Input() isEdit!: boolean;
  @Output() create: EventEmitter<Employee> = new EventEmitter<Employee>();
  @Output() update: EventEmitter<Employee> = new EventEmitter<Employee>();

  onSubmit(form: NgForm) {
    console.log(form.value); // Process form data here
    this.create.emit(form.value);
  }
}
