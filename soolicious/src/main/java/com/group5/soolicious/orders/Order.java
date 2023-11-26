package com.group5.soolicious.orders;

import java.util.Date;
import java.util.List;

import com.group5.soolicious.customers.Customer;
import com.group5.soolicious.customers.CustomerEntity;
import com.group5.soolicious.employees.Employee;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Order {
    private int id;

    private Customer customer;

    private Employee employee;

    private Date orderDate;

    private Double orderTotal;

    private String debitOrcredit;

    private String cardNumber;

    private String cvv;

    private Date expiryDate;

    private String pickupMethod;

    private String timeToPickupOrDeliver;

    private String specialInstructions;

    private String lastUpdated;
    private List<OrderItem> orderItems;
}
