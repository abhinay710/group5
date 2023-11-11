package com.group5.soolicious.Inventory;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import com.group5.soolicious.employees.EmployeeEntity;

import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
@Entity
@Table(name = "Inventory")
public class InventoryEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private int id;

    @ManyToOne
    @JoinColumn(name = "ingredientID")
    private IngredientEntity ingredient;

    @Column(name = "datePurchased")
    private Date datePurchased;

    @Column(name = "quantity")
    private Double quantity;

    @Column(name = "expiryDate")
    private Date expiryDate;

    @Column(name = "price")
    private Double price;

    @ManyToOne
    @JoinColumn(name = "employeeID")
    private EmployeeEntity employee;
}
