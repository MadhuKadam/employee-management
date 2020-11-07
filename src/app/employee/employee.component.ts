import { Component, OnInit } from '@angular/core';
import { Employees } from './employee-data';
import { Employee, EmployeeByDepartment } from './employee.interface';

import * as moment from 'moment';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  employeesByDepartment: EmployeeByDepartment[] = [];
  employeeList: Employee[] = Employees;
  experience: number;
  department: string;
  searchText: string;

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Used to sort data by name
   * @returns void
   */
  sortByName(): void {
    this.employeeList = this.employeeList.sort((a, b) => {
      if (a.name > b.name) {
        return 1;
      } else if (a.name < b.name) {
        return -1;
      } else {
        return 0;
      }
    });
  }

  /**
   * Used to get date in date format
   * @param  {string} date=''
   * @returns Date
   */
  getDate(date = ''): Date {
    return moment(date, 'DD/MM/YYYY').toDate();
  }

  /**
   * Used to sort data by joining date
   * @returns void
   */
  sortDate(): void {
    this.employeeList = this.employeeList.sort((a, b) =>
      (moment(b.joining_date, 'DD/MM/YYYY') as any) - (moment(a.joining_date, 'DD/MM/YYYY') as any));
  }

  /**
   * Used to find the difference between 2 dates in years
   * @param  {string} date
   * @returns number
   */
  private getDateDiffernce(date): number {
    return Math.abs(moment(date, 'DD/MM/YYYY').diff(moment(new Date(), 'DD/MM/YYYY'), 'years'));
  }

  /**
   * Used to find employees whose experience is greater than the exp which we pass in the exp param
   * @param  {number} exp
   * @returns void
   */
  findEmployeesByExp(exp): void {
    if (exp > 0) {
      this.employeeList = this.employeeList.filter(emp => this.getDateDiffernce(emp.joining_date) > exp);
    }
  }

  /**
   * Used to get array of distinct departments
   * @returns string
   */
  private getDistinctDepartment(): string[] {
    const department = [];
    this.employeeList.forEach(employee => {
      if (!department.includes(employee.department.toLowerCase())) {
        department.push(employee.department.toLowerCase());
      }
    });
    return department;
  }

  /**
   * Used to get distinct departments and count of candidates in each
   * @returns void
   */
  getEmployeeCoutByDepartment(): void {
    const departments = this.getDistinctDepartment();
    departments.forEach(department => {
      this.employeesByDepartment.push({
        dept: department,
        employeesCount: this.employeeList.filter(emp => emp.department.toLowerCase() === department).length
      });
    });
  }

  /**
   * Used to remove employees by department which we pass in department param
   * @param  {string} department
   * @returns void
   */
  removeEmployeesByDepartment(department: string): void {
    this.employeeList = this.employeeList.filter(employee => employee.department.toLowerCase() !== department.toLowerCase());
  }

}
