package com.group5.soolicious.Inventory;

import java.util.Date;

import com.group5.soolicious.employees.Employee;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Inventory {
    private Integer id;
    private Ingredient ingredient;
    private Date datePurchased;
    private Double quantity;
    private Date expiryDate;
    private Double price;
    private Employee employee;
}
