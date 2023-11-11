package com.group5.soolicious.desserts;

import com.group5.soolicious.employees.EmployeeEntity;
import com.group5.soolicious.utils.converter.Status;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Dessert {
    private Integer id;

    private String name;

    private Status glutenFreeYN;

    private Status sugarFreeYN;

    private Integer calories;

    private Double price;

    private String timeToPrepare;

    private EmployeeEntity employee;
}
