import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../entities/employee';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private URL: string = '';//'`http://localhost:8080/api/employees`';
  private employees: Employee[] = [];

  constructor(private http: HttpClient) { }

  read(): Observable<Employee[]> {
    if(this.employees.length) {
      return of(this.employees);
    }

    return this.http.get<Employee[]>(`http://localhost:8080/api/employees`)
    .pipe(
      tap((employees: Employee[]) => {
        this.employees = employees;
      }),
      catchError(this.handlerError)
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
      }),
      catchError(this.handlerError)
    );
  }

  create(payload: Employee): Observable<Employee> {
    return this.http.post<Employee>(`http://localhost:8080/api/employees`, payload)
    .pipe(
      tap((newEmployee: Employee) => {
        this.employees = [...this.employees, newEmployee];
      }),
      catchError(this.handlerError)
    );
  }

  update(payload: Employee): Observable<Employee> {
    return this.http.put<Employee>(`http://localhost:8080/api/employees/${payload.id}`, payload)
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
    console.log(payload);
    return this.http.delete<Employee>(`http://localhost:8080/api/employees/${payload.id}`)
    .pipe(
      tap(() => {
        this.employees = this.employees.filter((employee: Employee) => employee.id == payload.id);
      }),
      catchError(this.handlerError)
    );
  }

  handlerError(err: HttpErrorResponse) {
    if(err.error instanceof ErrorEvent) {
      console.warn('Client', err.message);
    } else {
      console.warn('Server', err.status);
    }
    return throwError(() => new Error(err.message));
  }
}
