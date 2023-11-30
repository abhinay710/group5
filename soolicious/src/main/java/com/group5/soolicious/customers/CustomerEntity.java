package com.group5.soolicious.customers;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import com.group5.soolicious.utils.converter.Status;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "Customer")
public class CustomerEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Integer id;

    @Column(name = "firstName")
    private String firstName;

    @Column(name = "lastName")
    private String lastName;

    @Column(name = "aptNo")
    private String aptNo;

    @Column(name = "streetName")
    private String streetName;

    @Column(name = "city")
    private String city;

    @Column(name = "state")
    private String state;

    @Column(name = "zipCode")
    private String zipCode;

    @Column(name = "phoneNum")
    private String phoneNum;

    @Column(name = "emailID")
    private String emailID;

    @Column(name = "password")
    private String password;

    @Column(name = "createdOn")
    private Date createdOn;

    @Column(name = "activeYN")
    private Status activeYN;
}
