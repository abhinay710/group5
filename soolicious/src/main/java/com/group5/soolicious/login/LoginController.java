package com.group5.soolicious.login;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.group5.soolicious.customers.CustomerService;
import com.group5.soolicious.employees.EmployeeService;

@RestController
@RequestMapping("login")
public class LoginController {
    @Autowired
    private CustomerService customerService;
    @Autowired
    private EmployeeService employeeService;

    @PostMapping("/")
    public Login login(@RequestBody Login login) throws Exception {
        if (login.getDesignation().equals("Employee")) {
            return employeeService.login(login);
        } else if (login.getDesignation().equals("Customer")) {
            return customerService.login(login);
        }

        return null;
    }
}
