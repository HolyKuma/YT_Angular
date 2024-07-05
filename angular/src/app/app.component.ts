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
    this.employeeService.getEmployees().subscribe(
      (response: Employee[]) => {
        this.employees = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
