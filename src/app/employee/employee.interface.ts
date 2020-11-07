export interface Employee {
    id: number;
    name: string;
    department: string;
    joining_date: string;
}

export interface EmployeeByDepartment {
    dept: string;
    employeesCount: number;
}

