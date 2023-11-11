package com.group5.soolicious.employees;

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
@Table(name = "Employee")
public class EmployeeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private int id;

    @Column(name = "firstName")
    private String firstName;

    @Column(name = "lastName")
    private String lastName;

    @Column(name = "Designation")
    private String designation;

    @Column(name = "emailID")
    private String emailID;

    @Column(name = "password")
    private String password;

    @Column(name = "createdOn")
    private Date createdOn;

    @Column(name = "activeYN")
    private Status activeYN;
}
