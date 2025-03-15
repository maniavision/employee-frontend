import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../entities/employee';
import { map, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private URL: string = '`http://localhost:8080`';
  private employees: Employee[] = [];

  constructor(private http: HttpClient) { }

  read(): Observable<Employee[]> {
    if(this.employees.length) {
      return of(this.employees);
    }

    return this.http.get<Employee[]>(`${this.URL}`)
    .pipe(
      tap((employees: Employee[]) => {
        this.employees = employees;
      })
    );
  }

  readOne(id: number): Observable<Employee> {
    const initEmployee: Employee = {
      id: 0,
      firstName: '',
      lastName: '',
      dateOfBirth: new Date(),
      hiredDate: new Date(),
      terminationDate: new Date()
    };

    return this.read().pipe(
      map((employees: Employee[]) => {
        const reqEmployee = employees.find(employee => employee.id === id);
        if(reqEmployee) {
          return reqEmployee;
        }
        return initEmployee;
      })
    );
  }

  create(payload: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.URL}`, payload)
    .pipe(
      tap((newEmployee: Employee) => {
        this.employees = [...this.employees, newEmployee];
      })
    );
  }

  update(payload: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.URL}/${payload.id}`, payload)
    .pipe(
      tap((updatedEmployee: Employee) => {
        this.employees.map((employee: Employee) => {
          if(employee.id === updatedEmployee.id) {
            return updatedEmployee;
          } else {
            return employee;
          }
        });
      })
    );
  }

  delete(payload: Employee): Observable<Employee> {
    return this.http.delete<Employee>(`${this.URL}/${payload.id}`)
    .pipe(
      tap(() => {
        this.employees = this.employees.filter((employee: Employee) => employee.id == payload.id);
      })
    );
  }
}
