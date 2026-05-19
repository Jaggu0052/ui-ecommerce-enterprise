"use client";

import { ModuleAnalytics, ModulePage, moneyColumn, statusColumn } from "@/components/dashboard/module-page";
import { employeeService } from "@/services/employee.service";
import type { Employee } from "@/types";

export default function EmployeesPage() {
  return (
    <ModulePage<Employee>
      title="Employees"
      description="Employee profiles, departments, designations, attendance, and salary visibility."
      queryKey={["employees"]}
      queryFn={() => employeeService.list()}
      columns={[
        { key: "name", header: "Employee", sortable: true },
        { key: "department", header: "Department", sortable: true },
        { key: "designation", header: "Designation" },
        { key: "attendanceRate", header: "Attendance %" },
        moneyColumn("salary", "Salary"),
        statusColumn("status")
      ]}
    >
      <ModuleAnalytics title="Employee Status" />
    </ModulePage>
  );
}
