package com.group5.soolicious.customers;

import java.util.Date;

import com.group5.soolicious.utils.converter.Status;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Customer {
    private Integer ID;

    private String firstName;

    private String lastName;

    private String aptNo;

    private String city;

    private String streetName;

    private String state;

    private String emailID;

    private String zipCode;

    private String phoneNum;

    private String password;

    private Date createdOn;

    private Status activeYN;
}
