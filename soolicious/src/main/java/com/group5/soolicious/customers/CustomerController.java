package com.group5.soolicious.customers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("customer")
public class CustomerController {
    @Autowired
    private CustomerService customerService;


    @GetMapping("/")
    public List<Customer> getCustomers() {
        return customerService.getCustomers();
    }

    @GetMapping("/{id}")
    public Customer getById(@PathVariable Integer id) throws Exception {
        return customerService.getById(id);
    }

    @PostMapping(value = "/save")
    public Customer save(@RequestBody Customer customer) {
        return customerService.saveCustomer(customer);
    }
}