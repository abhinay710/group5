package com.group5.soolicious.employees;

import java.util.Date;

import com.group5.soolicious.utils.converter.Status;

import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class Employee {
    private Integer id;

    private String firstName;

    private String lastName;

    private String designation;

    private String emailID;

    private String password;

    private Date createdOn;

    private Status activeYN;
}
