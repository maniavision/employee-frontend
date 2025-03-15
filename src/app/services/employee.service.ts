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
  // create(payload: Employee): Observable<Employee> {
  //   return this.http.post<Employee>(``);
  // }
}
