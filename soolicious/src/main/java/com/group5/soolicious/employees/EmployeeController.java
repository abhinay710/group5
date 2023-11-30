package com.group5.soolicious.employees;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("employee")
public class EmployeeController {
    @Autowired
    private EmployeeService employeeService;


    @GetMapping("/")
    public List<Employee> getEmployees() {
        return employeeService.getEmployees();
    }

    @GetMapping("/{id}")
    public Employee getById(@PathVariable Integer id) throws Exception {
        return employeeService.getById(id);
    }

    @PostMapping(value = "/save")
    public Employee save(@RequestBody Employee employee) throws Exception {
        return employeeService.saveEmployee(employee);
    }
}
