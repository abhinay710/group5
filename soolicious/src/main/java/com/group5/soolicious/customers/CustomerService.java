package com.group5.soolicious.customers;

import java.util.List;

import com.group5.soolicious.login.Login;

public interface CustomerService {
    List<Customer> getCustomers();

    Customer saveCustomer(Customer customer) throws Exception;

    Customer getById(Integer id) throws Exception;

    Login login(Login login) throws Exception;

}
