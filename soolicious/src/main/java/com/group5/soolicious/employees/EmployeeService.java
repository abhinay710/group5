package com.group5.soolicious.employees;

import java.util.List;

import com.group5.soolicious.login.Login;

import lombok.extern.java.Log;

public interface EmployeeService {
    List<Employee> getEmployees();

    Employee saveEmployee(Employee employee) throws Exception;

    Employee getById(Integer id) throws Exception;

    Login login(Login login) throws Exception;
}
