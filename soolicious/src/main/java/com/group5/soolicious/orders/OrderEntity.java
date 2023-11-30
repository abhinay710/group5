package com.group5.soolicious.orders;

import java.util.Date;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

import com.group5.soolicious.customers.CustomerEntity;
import com.group5.soolicious.employees.EmployeeEntity;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "Orders")
@Getter
@Setter
public class OrderEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "customerID")
    private CustomerEntity customer;

    @ManyToOne
    @JoinColumn(name = "employeeID")
    private EmployeeEntity employee;

    @Column(name = "orderDate")
    private Date orderDate;

    @Column(name = "orderTotal")
    private Double orderTotal;

    @Column(name = "debitOrcredit")
    private String debitOrCredit;

    @Column(name = "cardNumber")
    private String cardNumber;

    @Column(name = "cvv")
    private String cvv;

    @Column(name = "expiryDate")
    private Date expiryDate;

    @Column(name = "pickupMethod")
    private String pickupMethod;

    @Column(name = "timeToPickupOrDeliver")
    private String timeToPickupOrDeliver;

    @Column(name = "specialInstructions")
    private String specialInstructions;

    @Column(name = "lastUpdated")
    private String lastUpdated;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private List<OrderItemEntity> orderItems;
}
