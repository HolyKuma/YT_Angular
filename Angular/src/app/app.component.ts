import { Component, OnInit } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { Employee } from "./employee";
import { EmployeeService } from "./employee.service";
import { HttpErrorResponse } from "@angular/common/http";
import { NgForm } from "@angular/forms";
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent implements OnInit {
  public employees: Employee[] = [];
  public editEmployee: Employee| null = null;
  public deleteEmployee: Employee | null = null;
employee: any;

  constructor(private employeeService: EmployeeService) {}
  ngOnInit() {
    this.getEmployees();
  }



  public getEmployees(): void {
    this.employeeService.getEmployees().subscribe({
      next: (response: Employee[]) => {
        this.employees = response;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }


  public searchEmployees(key: string): void {
    const results: Employee[] = [];
    for (const employee of this.employees) {
      if (employee.name.toLowerCase().indexOf(key.toLowerCase()) !==-1){
        results.push(employee);
      }
    }
    this.employees = results;
  }




  public onDeleteEmployee(employeeId: number): void{
    this.employeeService.deleteEmployee(employeeId).subscribe(
      (response: void) => {
        console.log(response);
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },
    );
  }


  public onUpdateEmployee(employee: Employee): void{
    this.employeeService.updateEmployee(employee).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },
    );
  }

  public onAddEmployee(addForm: NgForm): void{
    document.getElementById('add-employee-form')?.click();
    this.employeeService.addEmployee(addForm.value).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },
    );
  }

  public onOpenModal(employee: Employee | null, mode: string): void {
    const container = document.getElementById('main-container');
    if (container) {
        const button = document.createElement('button');
        button.type = 'button';
        button.style.display = 'none';
        button.setAttribute('data-toggle', 'modal');
        
        if (mode === 'add') {
            button.setAttribute('data-target', '#custom-modal');
        } else if (mode === 'edit') {
          this.editEmployee = employee;
            button.setAttribute('data-target', '#editModal');
        } else if (mode === 'delete') {
          this.deleteEmployee = employee;
            button.setAttribute('data-target', '#deleteModal');
        }
        
        container.appendChild(button);
        button.click();
    } else {
        console.error('Main container not found');
    }
}


}
