import { NgModule } from "@angular/core";
import { BrowserModule, bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { EmployeeService } from "./employee.service";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

// ...
@NgModule({
  declarations: [
    // Remove AppComponent from declarations array
  ],
  imports: [
    BrowserModule,
    AppComponent, // Add AppComponent to imports array
    CommonModule,
    FormsModule
  ],
  providers: [EmployeeService],
  // Remove AppComponent from bootstrap array
})
export class AppModule {}

// Bootstrap the application using the bootstrapApplication function
bootstrapApplication(AppModule);
