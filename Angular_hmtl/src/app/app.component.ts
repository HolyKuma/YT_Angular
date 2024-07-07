import { Component, OnInit } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { Employee } from "./employee";
import { EmployeeService } from "./employee.service";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent implements OnInit {
  public employees: Employee[] = [];

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

  public onOpenModal(employee: Employee, mode: string): void {
    const container = document.getElementById('main-container');
    if (container) { // Ensure the container exists
        const button = document.createElement('button');
        button.type = 'button';
        button.style.display = 'none';
        button.setAttribute('data-toggle', 'modal'); // Correct 'model' to 'modal'
        
        if (mode === 'add') {
            button.setAttribute('data-target', '#custom-modal');
        } else if (mode === 'edit') {
            button.setAttribute('data-target', '#editModal'); 
        } else if (mode === 'delete') {
            button.setAttribute('data-target', '#deleteModal'); 
        }
        
        container.appendChild(button);
        button.click();
    } else {
        console.error('Main container not found');
    }
}

}
